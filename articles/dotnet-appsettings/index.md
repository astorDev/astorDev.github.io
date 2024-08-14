---
type: article
status: complete
title: >
  .NET Configuration Architecture: AppSettings
date: 2024-08-14
---

# .NET Configuration Architecture: AppSettings

> Do we even need them?

In the [previous article](https://medium.com/p/87526b9fbc68) we've started discussing different configuration sources present out of the box in .NET applications. We've found a few pitfalls of storing configuration values like database connection strings in the `appsettings.*.json` files and figured out a better alternative: environment variables. As we discovered the nice world of using environment variables for configuration a question arose: Where is the place for `apppsettings` then? Let's try to answer this now!

> We'll also summarize both article's discoveries in the [TLDR;](#tldr) in the end 😉

> ☝️ This article discusses the architectural use case of appsettings, not how they work. If you want to figure out **how** to use them, leave a comment and I'll try to address it as soon as possible.

![](thumb.png)

## A Clue from Microsoft

If we scaffold a new ASP .NET app via `dotnet new web`, here's what we will find in the `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

As you may, see most of the configuration is dedicated to the application logging. And here's the thing: we can easily imagine logging scope differing between the development environment and production, but it's much harder to imagine that we'll have logging behaviour differing for each environment. That's an example of an app **Behavior** configuration.

**Connectivity** is another scenario for configuration, which we discussed with connection strings in the previous articles. Connection strings will most likely be different for local debug, development, and QA environments. That couldn't be said about logging, though. We will most likely be fine with a single configuration from `apppsettings.Development.json` for Dev and QA, so it's a pretty good idea to embed it into the project.

## Any More Examples?

In the previous article, I shared that in one company I worked for we had a project structure resembling this

```
- ...
- 📁 Domain
- 📁 WebApi
    - ...
    - 📄 appsettings.Local.json
    - 📄 appsettings.Development.json
    - 📄 appsettings.QA1.json
    - 📄 appsettings.QA2.json
    - 📄 appsettings.Staging.json
    - 📄 appsettings.json
```

in every project. As a consequence of the design decision, we had to make a custom method `IHostEnvironment.IsDevelopmentLike` checking for `Local`, `Development`, and `QA`s. This is one of the scenarios that can be easily avoided with architectural patterns introduced in the series of articles. Having a unified **behaviour** configuration will change that workaround to the good old `IsDevelopment` or even better just specify the behaviour in `appsettings.Development`.

Anyway, the interesting question is: in which cases the `IsDevelopmentLike` was used? (And where we can use just `appsettings.Development` instead). The most visible example I could recall was **Exception Handling**.

We applied special caution to avoid displaying technical errors to a user in Production. However, in Dev or QA environments showing the full exception details significantly reduced speed we needed to figure out what went wrong. So setting up the **behaviour** for a group of environments would be much nicer than duplicating it across a bunch of `appsettings`.

## TLDR;

During our journey in different configuration sources, we've discovered two primary configuration purposes: Connectivity and Behaviour.

### Connectivity

Connectivity configuration is your db connection strings, external and internal services urls, and everything else helping you connect to other applications. There could be a ton of various connectivity configurations for a single service. Environment variables are a good place for those configuration values. For the local debugging put your `localhost:1111` in environment variables in `launchSettings`, and for local deployment using docker put the internal `service-a` in service environment variables using `docker-compose.yml`. In production, there are numerous CI systems supplying environment variables to your app, so I'll leave the choice up to you 😉

### Behaviour

Behaviour configuration refers to a configuration of things like logging and exception handling. Most of the time, app behaviour could be split into just two scenarios: Development and Production. The `appsettings.Development.json` file is a perfect source for the first case, and `appsettings.json` is perfect for the second. 

--- 

That's almost everything you need to know about architecting configuration sources in .NET. Don't forget to check the [first article](https://medium.com/p/87526b9fbc68) and also the in-depth discussion of [Environment Variables](https://medium.com/me/stats/post/d6b4ea6cff9f). 

And, as always ... Claps are appreciated! 👏
