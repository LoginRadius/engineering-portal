# Meet Laravel

[**Laravel**](https://laravel.com/) is a web application framework with expressive, elegant syntax. Laravel is a free, open-source PHP web framework and intended for the development of web applications following the model–view–controller([MVC](github.com)) architectural pattern. It was created by [Taylor Otwell](https://www.linkedin.com/in/taylorotwell/). 
Laravel saves your time and effort as it did not requires to rewrite a lot of it's functionality from scratch, it makes good use of already written and well tested components and  also it ships with a lot of features out of the box. These amazing features include:

- **Authorization**
- **Database Migrations** is the process of migrating data from one or more source databases to one or more target databases by using a database migration service.
- **Eloquent ORM** included with Laravel provides a beautiful, simple ActiveRecord implementation for working with your database.
- **Queuing**
- **Scheduler** offers a fresh approach to managing scheduled tasks on your server.

It is open source and [source](https://github.com/laravel/laravel) can be found on github. The latest Laravel version is version 8, which was released on September 8, 2020, with new features like Laravel Jetstream, model factory classes, migration squashing, Tailwind CSS for pagination views and other usability improvements.

- Repository: [Laravel Repository](https://github.com/laravel/laravel)
- Stable release: 8.16.1 / 2020-11-25
- Written in: [**PHP**](https://www.php.net)

PHP is a general-purpose scripting language geared towards web development. It was originally created by Danish-Canadian programmer [Rasmus Lerdorf](https://en.wikipedia.org/wiki/Rasmus_Lerdorf) in 1994.
*(Source: [Laravel Docs](https://laravel.com/docs/8.x))*

//image1
//image2
*(Image Source: Google)*

In laravel, we have a amazing component i.e. Authentication which is quite easy to use without any code conflictions with a single command. This component is having all required things for authenticating controllers, routing etc.

# Install Authentication

We can easily install this plugin in Laravel with a single artisan command. This command will install complete Authentication component with all controllers and views of a user management system in laravel.

```
php artisan make:auth
```

This plugin will create a middleware with name Authenticate for verifying all request to to your laravel application.

# Auth Configurations

Now, we need to modify default configuration of this Authentication component. For this activity, we have config file at path  `[Laravel_Application_Root]/config/ ` with name i.e. `auth.php` . In this file, you can easily create authentication process like guards, expiry time and others.

# Auth Routings

Routing always play a most important role in setting up of direction of you website request. In case of auth routing, we just need to add only middleware name i.e. auth in routing group for making public pages of your application to gated section. Here is a example of a route setup :
```
    Route::group(['middleware' => 'auth'], function () {  
       Route::get('/dashboard', 'DashboardController@index')->name('dashboard');  
    });  
```

In this example we have added dashboard path under authentication system. Anonymouse users cannot access this dashboard page without login to the application.

# Authenticated Users

If we need to do customizations in our custom controllers with existing logged in user, we can easily implement it with the help of Auth Facade

```
    use Illuminate\Support\Facades\Auth;  
    if (Auth::check()) {  
        // Logic [ if user is logged in ]  
        $user = Auth::user();  
        // Logout User  
        auth::logout();  
    }
``` 
    
The app directory is the most important part for the application. It contains:


-   **Exceptions** - *Contains application exception handler and custom exception classes.*
-   **Listeners** - *Contains all the handler classes for various events.*
-   **Console** - *Contains all the Artisan commands*
-   **Http** - *Contains all controllers, middleware, requests and routes file.*
-   **Providers** - *Contains all service providers.*
-   **Events** - *Contains all event classes.*
-   **Jobs** - *Contains all the queued job of application.*
-   **Policies** - *Contains the authorization policies of application. Policies are used to tell if a user can perform a given action against rule.*

The other important directories:

-    *boostrap contains framework autoloading files and generated cache files.*
-    *config contains app's configuration files.*
-    *tests contains all tests.*
-    *public contains publicly available assets.*
-    *vendor contains all app dependencies.*
-    *resources contains views and localization files.*
-    *database contains database migrations and seeds.*
-    *storage contains all Blade templates, file caches and logs.*


# Setting the Controllers

Open up your terminal and run the commands to create a `ListController.`
```
php artisan make:controller ListController
```
Open up `app/Http/Controllers/ListController.php` and configure it:


```
namespace App\Http\Controllers;
class ListController extends Controller
{
    public function show()
    {
       $characters = [
         'Tony Stark' => 'Robert Downey Junior'
         'Black Widow' => 'Scarlett Johansson'
         .
         .
         .
         .
         .
         'Thor' => 'Chris Hemsworth'
       ];

       return view('welcome')->withCharacters($characters);
    }
}
```

On hitting the request of `/` route, it invokes the show method of `theListController` and renders the returned value in the `welcome` view.

# Setting the Models

**Laravel** Models are stored by default in the root directory. The `Usermodel` is already shipped with the Laravel framework. However, if it is needed more models to create, simply run the commands:

```
php artisan make:model <modelName>
```

# Settings related to Routes

Open up `app/Http/routes.php` and configure it:
```
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', 'ListController@show');
```

# Authentication

*Now we have routes setup for the included authentication controllers. We may access app in a browser since the authentication controllers already contains the code to authenticate existing users and store the newly formed users in the database.*

# Path Customization

When a user is successfully authenticated, they will be redirected to the `/home` URL. We can redirect the post-authentication using the `HOME` constant defined in the `RouteServiceProvider`:

```
public const HOME = '/home';
```
# Username Customization

**Email Authentication** is defined as default for authentication in **Laravel**. **Email Authentication** can be optimised to username authentication through `LoginController`:
```
public function username()
{
    return 'username';
}
```

# Storage Customization

To modify the form fields that are required to fill for registration while authentication, or to customize how new users data will be stored into the database, we may modify the `RegisterController` class. This class is mainly responsible for validation and creation of new users for the application. The validator methods of the `RegisterController` contains the validation rules for new users of the application. It can be modified in any way. The create method of the `RegisterController` is responsible for creating new `App\User` records the database using the **Eloquent ORM**. This method can be modified as per requirement and need.

# Retrieving The Authenticated User

You may access the authenticated user via `Auth facade`:
```
use Illuminate\Support\Facades\Auth;
// Get the currently authenticated user...
$user = Auth::user();
// Get the currently authenticated user's ID...
$id = Auth::id();
```
# Determination Of Authentication of Current User

To determine if the user is already logged in or has to be logged in to peroform certain action, It can be checked using check method on the `Auth facade`, which will return true if the user is authenticated:

```
use Illuminate\Support\Facades\Auth;
if (Auth::check()) {
    // The user is logged in...
}
```

# Authenticating Routes
Route middleware is be used to allow only the authenticated users to let him perform authenticated action. Laravel ships with an `auth middleware`, which is defined at `Illuminate\Auth\Middleware\Authenticate`. We just need to attach the middleware to a route definition:

```
Route::get('profile', function () {
    // Only authenticated users may enter...
})->middleware('auth');
```

when the auth middleware detects an unauthorized user, it will redirect the user to the login named route, which can be modified to redirect to `app/Http/Middleware/Authenticate.php` file:
```
/**
 * Get the path the user should be redirected to.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return string
 */
protected function redirectTo($request)
{
    return route('login');
}
```

# Logging Out

For logging out of application for any user, the logout method can be used on the `Auth facade`. This will clear the authentication information in the user's session:
```
Auth::logout();
```
