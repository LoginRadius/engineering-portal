---
title: "Building Your First Laravel App with Authentication"
date: "2021-10-09"
Cover-Image: "cover-images.jpg"
author: Priyansh Singh
tags: ["PHP", "Laravel"]
description: "Learn how to build a Laravel CRUD application that includes authentication."
---

# Meet Laravel

![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/logo.png "Laravel Logo") ![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/image4.jpg "Laravel Logo") ![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/Laravel-5.png "Laravel Logo") 

[**Laravel**](https://laravel.com/) is a web application framework of [**PHP**](https://www.php.net/), with expressive, elegant syntax. Laravel is a free and open-source PHP web framework. It is especially suited for the development of web applications which follows the ([MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)) architectural pattern. It was developed by [Taylor Otwell](https://www.linkedin.com/in/taylorotwell/), laravel is trademark of Taylor Otwell.
Laravel saves your time and effort as it did not requires to code a lot of it's functionality from scratch, it makes good use of already written and well tested components and  also it ships with a lot of features out of the box. These amazing features include:

- **```Queuing```** Queues in Laravel are used to make a smooth sailing application cycle by stacking heavy tasks to be handled as jobs and dispatching these jobs when it is asked to or when it does not disrupt the user's experience.
- **```Authorization```** In addition to providing built-in authentication services, Laravel also provides a simple way to authorize user actions against a given resource.
- **```DB Migrations```** is the process of migrating data from one or more source databases to one or more target databases by using a database migration service.
- **```Eloquent ORM```** included with Laravel provides a beautiful, simple ActiveRecord implementation for working with your database.
- **```Scheduler```** offers a fresh approach to managing scheduled tasks on your server.

It is open source and [source code](https://github.com/laravel/laravel) can be found on [github](https://github.com). The latest Laravel version is version 8, which was released on September 8, 2020, with many new features like model factory classes, migration squashing, laravel jetstream, tailwind CSS for pagination views and other usability improvements.

- Repository: [Laravel Repository](https://github.com/laravel/laravel)
- Stable release: 8.16.1 / 2020-11-25
- Written in: [**PHP**](https://www.php.net)

PHP stands for **Hypertext Preprocessor** and mostly processed as server-side scripting language, it is a powerful tool for making interactive and dynamic Web pages. PHP is a general-purpose scripting language. It is especially suited to web development. It is fast, flex and pragmatic. It was originally developed in 1994 by [Rasmus Lerdorf](https://en.wikipedia.org/wiki/Rasmus_Lerdorf).
*(Source: [Wikipedia](https://en.wikipedia.org/wiki/PHP))*

# Explore Directory Structure

Laravel applications are based on Model-View-Controller([MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)) architectural design pattern.

![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/MVC-laravel.png "MVC")     ![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/MVC-2.jpg "MVC")     ![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/MVC-3.jpg "MVC")
    
![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/laravel.jpg "MVC")     ![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/MVC.jpg "MVC")     ![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/laravel-new.jpg "MVC")

*(Image Source: [Google](https://www.google.co.in/imghp?hl=en&authuser=0&ogbl))*

In laravel, we have a amazing pre-built component for example **Authentication** which is quite easy to use without any code conflictions, using just a single command. This component is having all required things for authenticating controllers, routing and others.

# Install Authentication

![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/Lavael-3.jpg "Authorisation")

Installation of plugin in laravel is too easy. For authentication we just need to run below artisan command;

```
php artisan make:auth
```
This command will install all laravel components with all controllers and views of a user management system required for Authentication. This plugin will create a middleware with name **Authenticate** which will perform verification of all requests from your laravel application.

# Configurations of Auth

Their is a config file at path  `[Laravel_Application_Root]/config/ ` named as i.e. `auth.php` it need to be modified according to our need, as it is default configuration of Authentication component and contains default settings. In this file, we can easily create authentication processes like guards, expiry time and others.

# Auth Routings

Code of routing is given [here](https://github.com/laravel/framework/blob/5.8/src/Illuminate/Routing/Router.php), we can configure it according to our needs and the actions required.

Routing always play most important role in setting up the direction of our website request. Auth::routes() is just a helper class that helps you generate all the routes required for user authentication. In case of auth routing, we just need to add the name of middleware i.e. auth in routing group for making public pages of your application to gated section. Example of route setup :

```

Route::group(['middleware' => 'auth'], function () {  
   Route::get('/Home', 'HomeController@index')->name('Home');  
}); 

```

In this example we have added **`Home` path** under authentication system. Anonymouse users cannot access this home page without logging in to the application, only registered users can access the `Home` page.

Here are some routes:

<h4>The routes for authentication: </h4>

```
$this->get('login', 'Auth\LoginController@showLoginForm')->name('login');
$this->post('login', 'Auth\LoginController@login');
$this->post('logout', 'Auth\LoginController@logout')->name('logout');

```

<h4>Below are the routes for new registration: </h4>

```

$this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
$this->post('register', 'Auth\RegisterController@register');

```

<h4>Defined below are the routes for password resetting of already registered users: </h4>

```

$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
$this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm');
$this->post('password/reset', 'Auth\ResetPasswordController@reset');

```

# Authenticated Users

If some action or request requires to do customizations and changes in the custom controllers with existing logged in user, it can easily be implemented with the Auth Facade method.

```
    use Illuminate\Support\Facades\Auth;  
    if (Auth::check()) {  
        // Logic for logged in user 
        $user = Auth::user();  
        // Logout 
        auth::logout();  
    }
``` 
    
The app directory is the most important part for the application. It contains:


-   **```Http```** - *It contains all controllers, middleware, requests and routes file.*
-   **```Events```** - *It contains all event classes.*
-   **```Exceptions```** - *It contains application's all exception handler and custom exception classes.*
-   **```Listeners```** - *It contains all the handler classes for various events.*
-   **```Console```** - *It contains all the Artisan commands*
-   **```Policies```** - *It contains the authorization policies of application. Policies are used to tell if a user can perform a given action against defined rules.*
-   **```Providers```** - *It contains all service providers.*
-   **```Jobs```** - *It contains all the queued job of application.*

The other important directories:


-    ***```public```** It contains publicly available assets.*
-    ***```boostrap```** It contains framework autoloading files and generated cache files.*
-    ***```database```** It contains database migrations and seeds.*
-    ***```tests```** It contains all tests.*
-    ***```storage```** It contains all Blade templates, file caches and logs.*
-    ***```config```** It contains app's configuration files.*
-    ***```vendor```** It contains all app dependencies.*
-    ***```resources```** It contains views and localization files.*


# Setting the Controllers

Open up the terminal into the directory and just run the following single line commands to create a `ListController`.

```
php artisan make:controller ListController
```

Now open up `app/Http/Controllers/ListController.php` and configure it:

```
namespace App\Http\Controllers;
class ListController extends Controller
{
    public function show()
    {
       $characters = [
         'Tony Stark' => 'Robert Downey Junior',
         'Black Widow' => 'Scarlett Johansson',
         'Captain America' => 'Chris Evans',
         'Thor' => 'Chris Hemsworth',
         'Spiderman' => 'Tom Holland'
         .
         .
         .
         .
         .
         .
         .
         ....(other characters)
       ];

       return view('welcome')->withCharacters($characters);
    }
}
```

On hitting the request of `/` route, it invokes the show method of `theListController` and directs the returned value in the `welcome` view.


# Setting the Models
**Laravel** Models are stored in the root directory, by default. The `Usermodel` is already shipped with the Laravel framework. However, if it needs more models to create, simply run the below commands:

```
php artisan make:model <modelName>
```

# Settings related to Routes

Configure `app/Http/routes.php` as below:

```

Route::get('/', 'ListController@show');

```

# Authentication Process

*Authentication Controller contains the code to authenticate existing users, it stores the data of newly formed users into the Database*.

# Path Customization

When a user is successfully authenticated, they will be redirected to the `/home` URL. We can redirect the users post-authentication using the `HOME` constant defined in the `RouteServiceProvider`:

```
public const HOME = '/home';
```

![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/Laravel-logged-out.png "Authorisation")  ![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/Laravel-auth-1.png "Laravel")

# Email and/or Username Customization

**Email Authentication** is defined as default for authentication in **Laravel** Framework.  **Email Authentication** can be optimised to username and/or email authentication by optimising `LoginController` method according to project need:

```
public function username()
{
    return 'username';
}
```

![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/Laravel-auth-4.png "Laravel")

# User's Data Storage Customization

Their is a class named as `RegisterController` class. This class is mainly responsible for validation and creation of new users i.e, adding data of new user through form filling for the application. We can modify the form field that are required to fill for registration while authentication, i.e, we are taking about to customize how new users data will be stored into the database. The validator methods of the `RegisterController` contains the validation rules for new users of the application. It can be modified in any way according to our need. Similarly the `create` method of the `RegisterController` is responsible for creating new `App\User` records the database using the **Eloquent ORM**. This method can be modified as per requirement and need.

# Retrieving The Authenticated User Data

`Auth facade` method can be use to access the authenticated users:

```
use Illuminate\Support\Facades\Auth;
// Get the current authenticated user...
$user = Auth::user();
// Get the current authenticated user's ID...
$id = Auth::id();
```

![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/Laravel-auth-3.png "Laravel")

# Checking The Authentication of Current User

If it is required to determine wheather the user has already logged in or has to be logged in to perform certain action, we can `check` method on the `Auth facade` class, which will return true if the user is authenticated:

```
use Illuminate\Support\Facades\Auth;
if (Auth::check()) {
    // The user is logged in...
}
```


# Authentication of Different Routes

Laravel already ships with an `auth middleware`, which is defined at `Illuminate\Auth\Middleware\Authenticate` by default. **Route middleware** is used to allow only the authenticated users to let him perform authenticated action. We just need to attach the middleware to a route definition for authenticating the routes:

```
Route::get('profile', function () {
    // Only authenticated users may enter...
})->middleware('auth');
```

when the `auth middleware` detects that an unauthorized user is requesting the route, it will redirect that user to the `login` page route, the task of re-direction can be modified to redirect to `app/Http/Middleware/Authenticate.php` file if needed:

Below code justifies the above statement:

```
/**
 *
 * @param  \Illuminate\Http\Request  $request
 * @return string
 */
protected function redirectTo($request)
{
    return route('login');
}
```
![ image is not availiable ](https://github.com/ps-19/engineering-portal/blob/master/content/Building%20Your%20First%20Laravel%20App%20with%20Authentication/Laravel-auth-2.png "Laravel")
# Logging Out

Logging out process is simple in Laravel. For logging out of application for any user, the `logout` method can be used defined on the `Auth facade` class. This will clear the authentication related information of user in the current session:

```
Auth::logout();
```

# Migrations

For Migration:
- **The user migration files comes by default with a Laravel installation.**
- **Migrations are simply version-control for the database, allowing us to easily modify and share the application's database details.**
- **In Laravel, migrations are placed in the `database/migrations` directory.**
- **Each migration file name contains a timestamp which allows Laravel to determine the order of the migrations.**
- **Check the `database/migrations` directory and check migration files `(timestamp)_create_users_table.php` and `(timestamp)_create_password_resets_table.php` and may be others too.**
- **Now, run below command from your terminal:**

```
php artisan migrate
```

The `users` and `password_resets` table will be created on running th above command. The value will be assigned to this `DB_DATABASE` constant automatically according to the project info.


***Useful Links and references: [Youtube](https://www.google.co.in/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FEU7PRmCpx-0%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DEU7PRmCpx-0&tbnid=SkQu8z3w3maGIM&vet=12ahUKEwj7gaff2rzzAhUHbysKHehMC6EQMyglegUIARCXAg..i&docid=dXivVnx-skQVFM&w=1280&h=720&q=Laravel&hl=en&authuser=0&ved=2ahUKEwj7gaff2rzzAhUHbysKHehMC6EQMyglegUIARCXAg), [Laravel Docs](https://laravel.com/docs/8.x/releases), [PHP](https://www.php.net/), [Wikipedia](https://en.wikipedia.org/wiki/Laravel) . All image [source](https://www.google.co.in/search?q=Laravel&hl=en&authuser=0&tbm=isch&source=hp&biw=1366&bih=643&ei=K71mYavlDajY5OUP-OS04Ac&ved=0ahUKEwjrpvPfnsfzAhUoLLkGHXgyDXwQ4dUDCAY&uact=5&oq=Laravel&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6CAgAEIAEELEDOgsIABCABBCxAxCDAToECAAQA1DyBVjXEmDRFGgAcAB4AIABxAGIAYEJkgEDMC43mAEAoAEBqgELZ3dzLXdpei1pbWc&sclient=img).***
