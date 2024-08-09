---
type: article
status: complete
title: >
  .NET Configuration Architecture: Getting Started
date: 2024-08-09
---

# .NET Configuration Architecture: Getting Started

> Juggling AppSettings, Environment Variables, and ...

.NET apps nowadays come out of the box with a robust set of configuration sources. A newly scaffolded ASP .NET app reads configuration from JSON files (`appsettings.json`), environment variables, and command-line arguments. Despite this and partially because of it, maintaining a clean configuration architecture becomes a challenge. Let's walk through one particularly common architectural puzzle and try to find a solution for it.

![](thumb.png)

## Database and AppSettings

Let's say we are developing an ASP .NET application. We've just scaffolded it via `dotnet new web --name Confitecture`. Now we want to connect it to a database, so we need to put our connection string somewhere. Obviously, we can't put it straight in code, as we'll have different databases in development and production. A brief look at the folder structure hints that `appsettings.json` and `appsettings.Development.json` can easily handle the use case. Indeed, if we'll add in `appsettings.json`

```jsonc
{
    "ConnectionStrings": {
        "Db" : "ProductionDbConnectionString"
    },
    // 
}
```

and in `appsettings.Development.json`:

```jsonc
{
    "ConnectionStrings": {
        "Db" : "DevelopmentDbConnectionString"
    },
    // 
}
```

and then use that connection string:

```csharp
var dbConnectionString = app.Configuration.GetConnectionString("Db");
app.Logger.LogInformation("Db Connection string: {dbConnectionString}", dbConnectionString);
```

We'll be able to get the different connection strings depending on the environment we run in:

```sh
dotnet run --environment=Development # logs `Db Connection string: DevelopmentDbConnectionString`
```

```sh
dotnet run --environment=Production # logs `Db Connection string: ProductionDbConnectionString`
```

However, there are a few problems with this approach:

1. It's not secure to store connection strings in the code, since any developer will have easy access to the production database password.
2. It's entirely possible that there will be a ton of environments. In fact, in my practice, I've seen repositories having `appsettings.Local.json`, `appsettings.Development.json`, `appsettings.Local.json`, `appsettings.QA1.json`, `appsettings.QA2.json`, `appsettings.Staging.json`, `appsettings.json` files in every single project. Of course, that resulted in a lot of duplications and general maintenance mess.
3. Since `appsetting.json` serves as both production and default configuration source, forgetting to override something may result in connecting and potentially modifying something on production during debugging.
4. Blurs the list of configuration values that need to be specified when configuring a new environment. Sometimes resulting in false-positive configuration as in point #3.

So, how about we find something better?

## Environment Variables for Connectivity

Well, we have two great configuration sources left: Environment Variable and Command Line arguments. In a sense, they both provide very similar experiences: they are externalized and are natively supported by virtually every CI system. Probably the main argument for environment variables is that they provide easier maintenance when their number grows. Let's prototype how the Environment Variable will be used in our app.

To "keep it real" let's now actually use our connection string to connect to a database.
First, let's add EF Core with Postgres:

```sh
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

And update our `Program.cs` to connect to the database:

```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DbContext>(
    o => o.UseNpgsql(builder.Configuration.GetConnectionString("Db"))
);

var app = builder.Build();

app.MapGet("/", async (DbContext context) => {
    await context.Database.OpenConnectionAsync();
    return "Connected!";
});

app.Run();
```

Perhaps, the first thing a nice repository must do is to provide a way to deploy it locally. In our case, it would imply providing a simple way to deploy the PostgreSQL database with our App connected to it. Nowadays, docker compose is the most popular and simple way to achieve that. First, we'll need a `Dockerfile`:

```Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
EXPOSE 8080
WORKDIR /app

COPY . .
RUN dotnet publish "Confitecture.csproj" -c Release -o /app/publish

WORKDIR /app/publish
ENTRYPOINT dotnet Confitecture.dll
```

And then the `compose.yml`:

```yml
name: confitecture

services:
  app:
    image: confitecture
    ports:
      - "53593:8080"
    build: .
    profiles: [ "full" ]
    environment:
      - CONNECTIONSTRINGS__DB=Host=db;Port=5432;Username=postgres;Password=postgres
      - ASPNETCORE_ENVIRONMENT=Development

  db:
    image: postgres
    environment:
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
```

With the setup if we'll deploy our service, wait for one second and call our endpoint:

```sh
docker compose up -d && sleep 1 && curl localhost:53593
```

We'll get the `Connected!` response! Notice the `- CONNECTIONSTRINGS__DB=Host=db;Port=5432;Username=postgres;Password=postgres`. That's how we propagated environment variables from docker to the .NET app. 

> 💪 The cool thing about it is that we don't leak any docker-specific detail (like the docker internal network domain name `db`).

## Onboard Developers with LaunchSettings

One thing we've lost when we moved from AppSettings to Environment Variables is the ability of a developer to run the app for debugging, by just using `dotnet run`. Let's get this back! The first thing we need to do is to provide developers with a simple way to deploy just the infrastructure services. This can be achieved by docker compose [service profiles](https://docs.docker.com/compose/profiles/). If we add profile `full` to the app service, like this:

```yaml
name: confitecture

services:
  app:
    # ...
    profiles: [ "full" ]
      
  db:
    # ...
```

The `app` service will be run only if the profile is specified in the docker compose command. And profile-less `db` will be run all the time. Let's check it by first killing all the services:

```sh
docker compose --profile full down
```

And then starting just the `db` service.

```sh
docker compose up -d
```

With the PostgreSQL now deployed on the `localhost`, all we need to do is to find a place where we can place the `localhost` connection so that it is used only when a developer runs the app locally e.g. for debugging. `launchSettings.json` serves exactly this purpose. So, if we update the content of the file to:

```json
{
  "$schema": "http://json.schemastore.org/launchsettings.json",
  "profiles": {
    "Local": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:53593",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development",
        "CONNECTIONSTRINGS__DB": "Host=localhost;Port=5432;Username=postgres;Password=postgres"
      },
    }
  }
}
```

A developer will be able to just send `dotnet run` command (which will use the only existing launch profile) to get up and running with our application. In most cases, you'll probably start development from the `launchSettings` instead of the docker files. When you'll get the `launchSettings` profile working it will also identify which environment variables you'll have to specify in the docker-compose file.

> ☝️ The main argument for using `environmentVariables` over `commandLineArgs` (which `launchSettings` also provides) is, in my taste, that environment variables have a few peculiarities. You may already notice the double underscore (`__`) in the variable name in the docker compose. So `launchSettings` provides the quickest way to catch possible configuration errors.

> 📚 I talk about the environment variable nuances in depth in the dedicated [article](https://medium.com/p/d6b4ea6cff9f).


## What's Next?

If `appsettings.json` bears so many problems and we have a valid alternative to it, is it even needed? It is! I'll describe why in the next article. For now, you can check out the example source code on the [github](https://github.com/astorDev/archi/tree/main/dotnet-config-sources/playground/Confitecture).
