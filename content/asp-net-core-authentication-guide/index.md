

---

title: ASP.NET Core Authentication Guide

date: "2021-10-25"

coverImage: "coverImage.png"

author: "Nishi Agrawal."

tags: ["ASP.NET", "Authentication", "Authorization"]

description: "This article gives an overview and tutorial of ASP.NET Core authentication and authorization."

---

## Authentication v/s Authorization

**Authentication**  is the process of verifying the identity of an entity. For example

-   Webserver asks the user to enter login/password every time to verify the user who created the account is the one accessing it now.

** Authorization**  is the process of allowing the required amount of services/resources to each entity. For example

On any website site (e.g., facebook.com), users can create an account, write a post, and update their profile. And friends can read all posts published by us as well. Here the Facebook server first authenticates the user with the user login credentials (login/password). Then it authorizes us to read all posts by others and write/modify the post only created by the user. Hence, Authorization is used by the server to limit which post each user can change.

**Step By Step Authentication Guide**

Download the <a href="https://dotnet.microsoft.com/download">.NET Core SDK</a> and install it. Check if everything works fine using the command - 
```
dotnet info
```

Create a new directory with the project structure using the following command -
```
mkdir dotnet-todo-list
cd dotnet-todo-list
dotnet new mvc
```
Whenever a user wants to manage their to-do list, they will issue requests to our API. These requests will be handled by a new controller that we are going to create. To persist the todo list items, we will need three new classes: `TodoListContext,` which will act as the persistence layer; `TodoTask,` which will be the model that represents the items in our application; and `TodoListController,` which will handle the HTTP requests issued by users.

Let's start by creating a `Models` directory in the root path of our application, and then let's create a file called `TodoTask.cs` on it. Create the Todo Task model -
```
namespace dotnet_todo_list.Models
{
  public class TodoTask
  {
    public long Id { get; set; }
    public string Description { get; set; }
  }
}
```

To persist the to-do tasks, we will use an in-memory database.
```
dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

Create a new class TodoListContext in the same models' directory using -
```
using Microsoft.EntityFrameworkCore;

namespace dotnet_todo_list.Models
{
  public class TodoListContext : DbContext
  {
    public TodoListContext(DbContextOptions<TodoListContext> options)
        : base(options)
    {
    }
    public DbSet<TodoTask> TodoList { get; set; }
  }
}
```
This class will handle the features for the persistence of our to-do tasks.

Create a TodoListController class in the `TodoListController.cs` file in the `Controllers` directory, and add the following source code:
```
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using dotnet_todo_list.Models;
using System.Linq;

namespace dotnet_todo_list.Controllers
{
  [Route("api/[controller]")]
  public class TodoListController : Controller
  {
    private readonly TodoListContext _context;

    public TodoListController(TodoListContext context)
    {
      _context = context;

      if (_context.TodoList.Count() == 0)
      {
        _context.TodoList.Add(new TodoTask { Description = "Item1" });
        _context.SaveChanges();
      }
    }     

    [HttpGet]
    public IEnumerable<TodoTask> GetAll()
    {
      return _context.TodoList.ToList();
    }

    [HttpGet("{id}", Name = "GetTodoTask")]
    public IActionResult GetById(long id)
    {
      var item = _context.TodoList.FirstOrDefault(t => t.Id == id);
      if (item == null)
      {
        return NotFound();
      }
      return new ObjectResult(item);
    }

    [HttpPost]
    public IActionResult Create([FromBody] TodoTask item)
    {
      if (item == null)
      {
        return BadRequest();
      }

      _context.TodoList.Add(item);
      _context.SaveChanges();

      return CreatedAtRoute("GetTodoTask", new { id = item.Id }, item);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(long id)
    {
      var item = _context.TodoList.First(t => t.Id == id);
      if (item == null)
      {
        return NotFound();
      }

      _context.TodoList.Remove(item);
      _context.SaveChanges();
      return new NoContentResult();
    }
  }
}
```
Now we need to configure TodoListContext to use an in-memory database package. Open the Startup.cs file and change the ConfigureServices method -
```
//...
using dotnet_todo_list.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnet_todo_list
{
  public class Startup
  {
    //...

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<TodoListContext>(opt => opt.UseInMemoryDatabase());
      services.AddMvc();
    }
  }
}
```
We can now use the API to save new to-do tasks, get the to-do list, and delete existing tasks using their id values. Below is an example.

```bash
curl http://localhost:5000/api/todolist

curl -H "Content-Type: application/json" -X POST -d '{
    "description": "make coffee"
}'  http://localhost:5000/api/todolist

curl -X DELETE http://localhost:5000/api/todolist/1
```

## Adding Authentication

Let us secure our ASP.NET Core application using JWTs (JSON Web Tokens).
Install the given packages:

```bash
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package JWT
```

To integrate these packages, add these settings in the appsettings.json file.
```
{
  "Logging": "... log configuration",
  "JWTSettings": {
    "SecretKey": "dotnet-core-auth-is-interesting",
    "Issuer": "dotnet_task_list",
    "Audience": "TodoListAPI"
  }
}
```
Create a new class called `JWTSettings` in a new file in the root directory of our application:
```
namespace dotnet_todo_list {
  public class JWTSettings
  {
    public string SecretKey { get; set; }
    public string Issuer { get; set; }
    public string Audience { get; set; }
  }
}
```
The class has the same properties added to the `appsettings.json` file. Add the following code at the beginning of the `ConfigureServices` method of the `Startup` class:
```
services.Configure<JWTSettings>(Configuration.GetSection("JWTSettings"));
```

### User Registration

Create a file called `AccountController.cs`  in the  `Controller`  directory, and will contain the following code:
Create a new class in a new file called  `AccountController.cs`  in the  `Controller`  directory, and add the code below:

```
using System.Collections.Generic;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using dotnet_todo_list.Models;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections;
using JWT;
using JWT.Serializers;
using JWT.Algorithms;
using Microsoft.Extensions.Options;
using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace dotnet_todo_list.Controllers
{
  [Route("api/[controller]")]
  public class AccountController : Controller
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly JWTSettings _options;

    public AccountController(
      UserManager<IdentityUser> userManager,
      SignInManager<IdentityUser> signInManager,
      IOptions<JWTSettings> optionsAccessor)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _options = optionsAccessor.Value;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] Credentials Credentials)
    {
      if (ModelState.IsValid)
      {
        var user = new IdentityUser { UserName = Credentials.Email, Email = Credentials.Email };
        var result = await _userManager.CreateAsync(user, Credentials.Password);
        if (result.Succeeded)
        {
          await _signInManager.SignInAsync(user, isPersistent: false);
          return new JsonResult(  new Dictionary<string, object>
          {
            { "access_token", GetAccessToken(Credentials.Email) },
            { "id_token", GetIdToken(user) }
          });
        }
        return Errors(result);

      }
      return Error("Unexpected error");
    }

    private string GetIdToken(IdentityUser user) {
      var payload = new Dictionary<string, object>
      {
        { "id", user.Id },
        { "sub", user.Email },
        { "email", user.Email },
        { "emailConfirmed", user.EmailConfirmed },
      };
      return GetToken(payload);
    }

    private string GetAccessToken(string Email) {
      var payload = new Dictionary<string, object>
      {
        { "sub", Email },
        { "email", Email }
      };
      return GetToken(payload);
    }

    private string GetToken(Dictionary<string, object> payload) {
      var secret = _options.SecretKey;

      payload.Add("aud", _options.Audience);
      payload.Add("iss", _options.Issuer);
      payload.Add("iat", ConvertToUnixTimestamp(DateTime.Now));
      payload.Add("nbf", ConvertToUnixTimestamp(DateTime.Now));
      payload.Add("exp", ConvertToUnixTimestamp(DateTime.Now.AddDays(7)));
      IJwtAlgorithm algo = new HMACSHA256Algorithm();
      IJsonSerializer serializer = new JsonNetSerializer();
      IBase64UrlEncoder Encoder = new JwtBase64UrlEncoder();
      IJwtEncoder encoder = new JwtEncoder(algo, serializer, Encoder);

      return encoder.Encode(payload, secret);
    }

    private JsonResult Errors(IdentityResult result)
    {
      var errors = result.Errors
          .Select(temp => temp.Description)
          .ToArray();
      return new JsonResult(errors) {StatusCode = 400};
    }

    private JsonResult Error(string msg)
    {
      return new JsonResult(msg) {StatusCode = 400};
    }

    private static double ConvertToUnixTimestamp(DateTime date)
    {
      DateTime start = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
      TimeSpan difference = date.ToUniversalTime() - start;
      return Math.Floor(difference.TotalSeconds);
    }
  }
}
```
Let's create a new file called `Credentials.cs` in the `Models` directory and add the following code to it:
```
using System.ComponentModel.DataAnnotations;

namespace dotnet_todo_list.Models
{
  public class Credentials {
    [Required]
    [EmailAddress]
    [Display(Name = "Email")]
    public string Email { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "Pass")]
    public string Pass { get; set; }
  }
}
```
Let's create a new file called `UserDbContext.cs`, in the `Models` directory, with the following code:
```
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnet_todo_list.Models
{
  public class UserDbContext : IdentityDbContext<IdentityUser>
  {
    public UserDbContext(DbContextOptions<UserDbContext> options)
            : base(options)
    {
      Database.EnsureCreated();
    }
  }
}
```
Now we change the startup class to configure our app to use identity framework:
```
// ... 
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace dotnet_todo_list
{
  public class Startup
  {
    // ... everything else

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddEntityFramework()
              .AddDbContext<UserDbContext>(opt => opt.UseInMemoryDatabase());

      services.AddIdentity<IdentityUser, IdentityRole>()
              .AddEntityFrameworkStores<UserDbContext>();
      // ... 
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory logger)
    {
      // ... 
      app.UseIdentity();
    }
    // ... 
  }
}
```
Test by issuing the following HTTP POST request:
```bash
curl -H "Content-Type: application/json" -X POST -d '{
    "email": "user@something.com",
    "password": "123456#User"
}'  http://localhost:5000/api/account
```
### Enabling Sign In

Add the following method to the `AccountController` class recently created:
```
[HttpPost("sign-in")]
public async Task<IActionResult> SignIn([FromBody] Credentials Credentials)
{
  if (ModelState.IsValid)
  {
    var result = await _signInManager.PasswordSignInAsync(Credentials.Email, Credentials.Password, false, false);
    if (result.Succeeded)
    {
      var user = await _userManager.FindByEmailAsync(Credentials.Email);
      return new JsonResult(  new Dictionary<string, object>
      {
        { "access_token", GetAccessToken(Credentials.Email) },
        { "id_token", GetIdToken(user) }
      });
    }
    return new JsonResult("Cannot sign in") { StatusCode = 401 };
  }
  return Error("Some error occurred, please try again!");
}
```
The curl HTTP POST request for sign-in can be made using the below command:
```bash
curl -H "Content-Type: application/json" -X POST -d '{
    "email": "user@something.com",
    "password": "123456#User"
}'  http://localhost:5000/api/account/sign-in
```

### Protecting ASP.NET Core API

To secure all endpoints exposed by the `TodoListController` class, we need to add the `Authorize` attribute to this class, as shown below:
```
// ...
using Microsoft.AspNetCore.Authorization;

namespace DotNetCoreAuth.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  public class TodoListController : Controller
  {
//...
  }
}
```
Now, we can configure the Identity framework in the `ConfigureServices` method of the `Startup` class as follows:
```
// ... 
using System.Net;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace DotNetCoreAuth
{
    public class Startup
    {
        // ...

        public void ConfigureServices(IServiceCollection services)
        {
            // ... 

            services.Configure<IdentityOptions>(options =>
            {
                options.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = context =>
                    {
                        context.Response.StatusCode = (int) HttpStatusCode.Unauthorized;
                        return Task.FromResult(0);
                    }
                };
            });

            services.AddMvc();
        }

        // ... 
    }
}
```

### Validating JWTs

To make our application validate the tokens, we will add just a few lines of code to the `Configure` method of the `Startup` class. Below is the complete source code of this method after adding the lines that validate JWTs:
```
// ... 
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;

namespace dotnet_todo_list
{
  public class Startup
  {
    // ...

    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory logger)
    {
      logger.AddConsole(Configuration.GetSection("Logs"));
      logger.AddDebug();

      app.UseExceptionHandler();
      app.UseIdentity();

      var sk = Configuration.GetSection("JWTSettings:SecretKey").Value;
      var iss = Configuration.GetSection("JWTSettings:Issuer").Value;
      var aud= Configuration.GetSection("JWTSettings:Audience").Value;
      var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(sk));
      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = signingKey,

        ValidateIssuer = true,
        ValidIssuer = iss,

        ValidateAudience = true,
        ValidAudience = aud
      };
      app.UseJwtBearerAuthentication(new JwtBearerOptions
      {
        TokenValidationParameters = tokenValidationParameters
      });

      app.UseCookieAuthentication(new CookieAuthenticationOptions
      {
        AutomaticAuthenticate = false,
        AutomaticChallenge = false
      });

      app.UseMvc();
    }
  }
}
```
To test the endpoint with curl:
```bash
ACCESS_TOKEN="$(curl -H "Content-Type: application/json" -X POST -d '{
    "email": "harry@loginradius.com",
    "password": "123#Harry"
}'  http://localhost:5000/api/account | jq -r '.access_token')"

echo $ACCESS_TOKEN

curl -H "Authorization: Bearer $ACCESS_TOKEN" http://localhost:5000/api/todolist
```