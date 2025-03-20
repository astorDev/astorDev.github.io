---
title: Makefile. A Comprehensive Guide with Examples for .NET and Beyond
date: 2025-03-20
---

# Makefile: A Comprehensive Guide with Examples for .NET and Beyond

> Learn `make` util with a practical example of a C# project.

![](thumb.png)

Not that far ago, I learned about the `make` utility and the `Makefile`. Although that util is very old by computer science standards (1977), it is still extremely helpful today in 2025! In this article, I want to share with you my findings about this utility and give you an example of how to use it with a modern project.

The util was originally designed to help with compiling and building C projects, but the way it was built allows it to be useful for roughly any programming language there is. In this article, we will play around with a .NET project and Docker, but I believe you will still be able to grasp an overall idea regardless of the programming language you are using.

## Preparing the Project and Writing Our First Command (Recipe)

Let's start by creating a new minimalistic ASP .NET Core Project. Let's call it `Playground`:

```sh
dotnet new web --name Playground
```

We will make just two small modifications to make our experiment look a little bit nicer. First of all, let's make our logs occupy just one line per log:

```csharp
builder.Logging.AddSimpleConsole(c => c.SingleLine = true);
```

Secondly, let's return an object (JSON) instead of just text from the default endpoint:

```csharp
app.MapGet("/", () => new {
    message = "Hello World!"
});
```

Here's how our `Program.cs` should look after the changes:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddSimpleConsole(c => c.SingleLine = true);

var app = builder.Build();

app.MapGet("/", () => new {
    message = "Hello World!"
});

app.Run();
```

Now, let's add our hero of the day - `Makefile`. For now, it will have just a single command to run our project:

```makefile
run:
	dotnet run
```

And here's what `make run`:

![](run-demo.gif)

For now, it may not seem like much, since we could've just executed `dotnet run` in our shell directly. We will do something much more fun in the next section, but now let's take time to reflect on why abstracting our command under `make` util may be already beneficial.

It all comes down to changes. Let's say folder structure changes, a command line argument is needed, or even the whole project is rewritten in another programming language. We can just update the script under the `run` command and call our familiar `make run` to get our project up and going.

## Exploring the Power of Makefile: Adding `curl` Command

In the first section, I've provided the code for `Program.cs`, so we can be sure we have the exact same code in place. However, we will unlikely have different ports exposed, since the `dotnet new web` command picks a random port for a newly created project. In my case, it was `5154`

How about we let `Makefile` get us back synced, by making the same `curl` command, using our own port? Here's how mine looks:

```makefile
curl:
	curl http://localhost:5154
```

Now, if you've used your own port we should be able to run exactly the same commands for our experiments: `make run` and `make curl`. Here's what the result might look like:

![](run-curl-demo.gif)

We were able to test our application responsiveness by running the commands in two shells side-by-side. But how about we start the project, wait a little bit until it is ready, make a request, and then bring it back to the foreground?

This is where `make` comes in handy again. We can use a single file with multiple commands, basically calling each other like real programming language functions.

Let's draft an example recipe (as a single line inside a makefile command is called):

> It's generally considered a better practice to call another make command via `$(MAKE)`. But since in our case the benefits of `$(MAKE)` are not applicable we will keep it simple.

```makefile
rurl-naive:
	make run & sleep 4 && make curl && fg
```

Here's what we will get after running it with `make rurl-naive`:

![](rurl-naive-demo.gif)

As you may see, we get an error: `/bin/sh: line 0: fg: no job control`. This happens due to the fact that `make` runs a non-interactive shell, for each line of the command. A non-interactive shell basically means a shell without job control, which, in turn, means that we can not bring a job to the foreground.

We will fix our command, but now we have a hanging `dotnet run` process. This is especially problematic because while the port is occupied we will not be able to start another `dotnet run` process. Gladly, we can use `Makefile` to fix that problem, too. Let's write a command killing a process by the occupied port.

> Don't forget that `5154` is my generated port and you may likely have some other port

```makefile
kill:
	kill `lsof -t -i:5154`
```

And here's what happens if we run `make kill`:

![](kill-demo.gif)

One more `make` command in our chest. Let's fix the buggy one in the next section!

## Fixing our `rurl` Command: Making it Work with Job Control

As you may remember, our initial implementation of `rurl` failed because `make` util creates a non-interactive shell. We can overcome this by running another shell inside the `make` shell and making it interactive!

If it sounds rough for you like it did for me, don't worry! We'll just need to wrap our command with `bash -c -i` (with `-i` making our subshell interactive). Here's the updated command:

```makefile
rurl:
	bash -c -i 'make run & sleep 2 && make curl && fg'
```

And here's what we will get from running it:

![](rurl-demo.gif)

We were able to successfully test our API, returning it back to the main thread. However, right now it looks pretty ugly, since `curl` prints the result unformatted and doesn't add a line break, so everything looks kind of messy. Let's fix it in the next section.

## Using Httpyac to Make It Beautiful

There's a much prettier alternative to curl - the tool is called `httpyac`. I've written a [dedicated article](https://medium.com/@vosarat1995/best-postman-alternative-5890e3e9ddc7) about it, but what the way we use it in this article should be intuitively clean without any additional preparation. Yet to follow the steps in the tutorial you would need to [install the httpyac CLI](https://httpyac.github.io/guide/installation_cli) (don't worry it's very simple).

We'll start by creating a `.http` file:

```http
GET http://localhost:5154/
```

Now, let's add a command that will run all (yes, here it means one) requests from the file:

> Take a moment to appreciate how much less typing we would need afterward (just `make yac`)

```makefile
yac:
	httpyac send .http --all
```

Here's how running the script might look like:

![](run-yac-demo.gif)

And now let's combine the script we had before with httpyac instead of curl:

```makefile
play:
	bash -c -i 'make run & sleep 2 && make yac && fg'.
```

Now, we will be able to get a beautifully looking result of debugging our application with a simple `make play` command:

![](play-demo.gif)

This command finalizes the article, let's just do a quick recap and call it a day!

## Recap

In this article, we've created a `Makefile` for running an ASP .NET Core application and executing a test request against it, all in one shell. Here's how the file looks assembled:

```makefile
run:
	dotnet run

curl:
	curl http://localhost:5154

rurl-naive:
	make run & sleep 4 && make curl && fg
	
rurl:
	bash -c -i 'make run & sleep 2 && make curl && fg'

yac:
	httpyac send .http --all

play:
	bash -c -i 'make run & sleep 2 && make yac && fg'

kill:
	kill `lsof -t -i:5154`
```

The article and the playground are parts of the [nice-shell repository](https://github.com/astorDev/nice-shell), trying to help your shell experience be nicer. Don't hesitate to give the repository a star! ⭐

Claps for this article are also appreciated! 😊
