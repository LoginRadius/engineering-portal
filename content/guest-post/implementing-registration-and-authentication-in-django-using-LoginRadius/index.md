---
type: async
title: "How to Implement Registration and Authentication in Django?"
date: "2021-07-30"
coverImage: "coverImage.png"
author: "Taminoturoko Briggs"
tags: [Django, Authentication, User Registration]
description: "In this tutorial, you will learn how to implement user registration and authentication in Django using LoginRadius."
---

## Prerequisite
You should be familiar with Python and Django, a Python framework.

## Overview
First, we briefly introduce LoginRadius, what it is, and some benefits of using it; then, will move over to see how to implement user registration and authentication in Django using LoginRadius.

## Introduction

**What is LoginRadius?**

LoginRadius is a SaaS-based CIAM platform. It offers simplified, robust features to manage customer identity, privacy, and access -- allowing developers and businesses to provide a seamless and secure digital experience for their customers.

The developer-friendly CIAM provides a comprehensive set of APIs for registration, authentication, identity verification, single sign-on (SSO), and more.

**Why should we use LoginRadius?**
- Dynamically scales to accommodate user growth.
- Offers built-in security features to enhance user account security and manage user data securely.
- Built-in features that help achieve compliance with privacy regulations.
- Advanced login options like Social SSO and Passwordless Login to enhance user experience.

LoginRadius offers many more benefits than above. You can [learn more here](https://www.loginradius.com/resources/#data-sheet).

## Getting started
To get started with LoginRadius, you have to first [create a free developer account](https://accounts.loginradius.com/auth.aspx?return_url=https://dashboard.loginradius.com/login&action=register).

If you already have an account, log into your [LoginRadius dashboard](https://accounts.loginradius.com/auth.aspx?return_url=https://dashboard.loginradius.com/login) 
You will see a page like this:

![Dashboard](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849810764_Screenshot+34.png)

When you create an account, LoginRadius sets up a free app for you. This is the app you are going to integrate with Django. Here my app name is "tammibriggs".

Click on your app, and you will see a page like this:

![LoginRadius app](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849852750_Screenshot+36.png)

There is one more thing LoginRadius automatically creates for you: an [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx). This is a ready-to-use web page where features -- like Email and Password login, User registration, Forgot password, and Remember me -- have already been implemented. We will utilize this web page for registration and authentication requirements in our Django application. [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx) reflects the configuration changes that you can make in LoginRadius Dashboard. There is also room for customization, you can read more about that here: [Auth Page (IDX) customization](https://www.loginradius.com/docs/developer/guide/customize-auth-page).

At this point, you know what LoginRadius is, its benefits, and how to get started with LoginRadius. Let’s see how to integrate LoginRadius with a Django application.

## Integrating LoginRadius with a Django Application
This section covers:

- Installing dependencies.
- Setting up a demo application, in which you will integrate LoginRadius.
- Also, integrating LoginRadius with a Django demo application.


> You must have python installed, and the minimum supported version is 2.7.

**Getting API Credentials**

Before using any of the APIs that LoginRadius provides, you need to get your **App Name**, **API Key**, and **API Secret**.
On your LoginRadius app, navigate to [Configuration > API Credentials](https://dashboard.loginradius.com/configuration)

![API credentials](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849573473_Screenshot+38.png)

You will find your API key under the **API Key and Secret** subsection.

![API key and secret](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849474291_Screenshot+44_LI.jpg)


**Whitelist your Domain**

For security reasons, LoginRadius processes the API calls that are received from the whitelisted domains. 
Local domains (`http://localhost` and `http://127.0.0.1`) are whitelisted by default. This means you don't have to worry about whitelisting your domain if you are running your application on Django's development server. But in a production environment, you definitely have to whitelist our domain.
To whitelist your domain, in your LoginRadius Dashboard, navigate to [Configuration > Whitelist Your Domain](https://dashboard.loginradius.com/configuration) and add your domain name.

![Whitelist your domain](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849403941_Screenshot+41.png)


**Installation of Dependencies**

You need to install the LoginRadius Python SDK. It provides functionalities that allow Python programs to communicate with LoginRadius APIs.
Open VS Code, PyCharm, or any other editor you use in general.
In the terminal, type:

```plaintext
$ pip install LoginRadius-v2 requests cryptography pbkdf2
```

These are the dependencies you need to integrate LoginRadius into your Django application.

**Setting up Django**
1. Install Django.
2. Create a new project.
3. Create an app inside the project.
4. Migrate your project.
5. Create a `urls.py` file in your app.

You can accomplish all this with the following commands in your terminal:

```plaintext
$ python -m pip install django

$ django-admin startproject radiusAuth

$ cd radiusAuth

$ python manage.py startapp radiusApp

$ python manage.py migrate

$ cd radiusApp

$ type nul > urls.py
```

Here, the project name is **radiusAuth** and the app **radiusApp** but you can use any name you want.
You now have a **radiusAuth** project and **radiusApp** app setup.

**Configure Project**

You need to tell Django about the app you created and the location of the app's `urls.py` file. 
First, let Django know the location of your app.
In your **radiusAuth** project navigate to *radiusAuth/settings.py*, modify the `INSTALLED_APPS`:

`radiusAuth/settings.py`

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "radiusApp",
]
```

Once you have added it, go over to the `urls.py` file in the same directory, modify the `urlpatterns` and include the apps url location.

`radiusAuth/urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('radiusApp.urls'))
]
```

## User Registration and Authentication

Remember, we said that there is a webpage LoginRadius automatically created for you: an [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx), which already has registration and authentication implemented. You will utilize this web page to meet your registration and authentication needs.
How would you do that?

You can access your registration and login page with the following URLs.

Registration Page URL:
```plaintext
https://{APP_NAME}.hub.loginradius.com/auth.aspx?action=register&return_url={RETURN_URL}
```

Login Page URL:

```plaintext
https://{APP_NAME}.hub.loginradius.com/auth.aspx?action=login&return_url={RETURN_URL}
```

- The APP_NAME parameter is your LoginRadius app name, which we mentioned in the [Get API Credentials](#) section.
- The RETURN_URL parameter refers to the URL where the user should be redirected to upon successful authentication.

So, what you will do now is to create links or buttons that users can click to access these URLs.
First, create a view that will be responsible for displaying your registration and login page.
Edit the `views.py` file of the **radiusApp** application and add the following code:

`radiusApp/views.py`

```python
from django.shortcuts import render

def register_n_login(request):
    return render(request, 'index.html')
```

All this view does is render an HTML page as a response. Now, you need to add the URL pattern for this view.

In the `urls.py` file of your **radiusApp** application, add the following code:

`radiusApp/urls.py`

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.register_n_login, name="access"),
]
```

The `register_n_login` view can now be accessed by a URL. It's time to create a template for your view. But before you do that, let me introduce some basic styling you will use in your application.

Create a **static** directory and a `style.css` file in your app directory.
Open your terminal and type the following command:

`radiusAuth/radiusApp`

```plaintext
$ mkdir static
$ cd static
$ type nul > style.css
```

Open the `style.css` file and the following CSS styles:
```css
*{
    margin: 0;
    border: 0;
}

body{
    background-color: hsl(210, 15%, 95%);
}

.wrapper{
    width: 90%;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center; 
    flex-direction: column;
    justify-content: center;
}

.choice{
    text-align: center;
    line-height: 30px;
}

.choice span{
    color: hsl(207, 37%, 76%);
}

.choice span:nth-child(1){
    font-size: 1.3rem;
    color: hsl(210, 7%, 55%);
}


.access{
    width: 100%;
    max-width: 400px; 
    height:150px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    background-color: white;
    margin-bottom: 20px;
    font-size: 1.2rem;
}

.access button{
    width: 90%;
    padding: 0.7rem 0.4rem;
    background-color: hsl(207, 73%, 30%);
    color: white;
}

.profile{
    width:100%; 
    max-width: 400px; 
    min-height: 300px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.profile__head{
    width: inherit;
    flex: 0.3;
    background-color: hsl(207, 73%, 30%);
    display:flex;
    align-items:center;
    justify-content: center;
}

.profile__head h4{
    font-size: 36px;
    font-weight: 400px;
    color: white;
}

.profile__details{
    width: 90%;
    margin: 0 auto;
    line-height: 35px;
    flex: 0.5;
}

.profile__details span{
    font-size: 1.2rem;
}

.label{
    color: hsl(210, 7%, 55%);
}
```

Now, create the template for your `register_n_login` view.

Create a **templates** directory and a `index.html` file in your app directory.

Open your terminal and type the following command:

`radiusAuth/radiusApp`

```plaintext
$ mkdir templates
$ cd templates
$ type nul > index.html
```

Open the `index.html` file and add the following HTML

`templates/index.html`

```html
{% load static %}
 
 <!DOCTYPE html>
 <html>
     <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Registration and Login page</title>
         <link rel="stylesheet" href="{% static 'style.css' %}">
     </head>
 
     <body>
         <div class="wrapper">
 
             <div class="access">
                 <span>Open an account with us</span>
                 <button onclick="window.location.href='https://{APP_NAME}.hub.loginradius.com/auth.aspx?action=register&return_url=http://127.0.0.1:8000/';">
                     Register
                 </button>
             </div>
             <div class="choice">
                 <span>OR</span><br>
                 <span>If you already have account</span>
             </div>
             <div class="access">
                 <span>Log into your account</span>
                 <button onclick="window.location.href='https://{APP_NAME}.hub.loginradius.com/auth.aspx?action=login&return_url=http://127.0.0.1:8000/profile/';">
                     Login
                 </button>
             </div>
 
         </div>
     </body>
 </html>
```

We used an `onclick` event on both the register and login buttons, which when clicked changes the window's location to the [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx) register and login page respectively.

**NOTE:** Don’t forget to replace the {APP_NAME} placeholder with your LoginRadius app name.

Also, in the register and login link, we replaced the {RETURN_URL} parameter with `http://127.0.0.1:8000/profile/`, which is the user profile page you are going to create shortly.

Run the development server and open `http://127.0.0.1:8000/`, you will see a page like this:

![Register and Login page](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849064162_Screenshot+48.png)

Now, when you click the register or login button, you will see a page like this:

![Auth page (IDX)](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849029873_Screenshot+46.png)

> When LoginRadius successfully authenticates a user, it attaches an access token in the query string as a token parameter to the REDIRECT_URL.

## Retrieve User Data using Access Token
In this section, you are going to retrieve the authenticated user data using access token. But first you need to initialize LoingRadius SDK with your API_KEY and API_SECRET.

**Intializing LoginRadius SDK**

Create a new `config.py` file in your **radiusApp** directory.

Open your terminal and type this command:

`radiusAuth/radiusApp`

```plaintext
$ type nul > config.py
```

Open the `config.py` file and add the following lines of code:

`radiusApp/config.py`

```python
from LoginRadius import LoginRadius as LR

LR.API_KEY = "API_KEY"
LR.API_SECRET = "API_SECRET"
loginradius = LR()
```

Replace API_KEY and API_SECRET with your respective LoginRadius API credentials.

Now, create the view that will be responsible for retrieving user data.

Open the `views.py` file in your **radiusApp** directory and add the following lines of code:

`radiusApp/views.py`

```python
from django.shortcuts import render, redirect
from django.http.response import HttpResponse
from .config import loginradius

def register_n_login(request):
#...

def profile(request):

    if request.GET.get('token'):    
        try:
            user_data = loginradius.authentication.get_profile_by_access_token(request.GET.get('token'))
        except Exception as inst:
            return HttpResponse(inst)
    else:
        return redirect('access')

    return render(request, 'profile.html', {'user_data':user_data})
```

In this code snippet, we imported the initialized LoginRadius class from the `config.py` file and also imported `redirect` and `HttpResponse` from there respective modules.

We also introduced a new function called `profile`. In this function we did the following:

- We first checked if there is a token parameter attached to the request. If true,
- We created a `try` and `except` block. In the `try` block we used the `authentication.get_profile_by_access_token` method to retrieve the user data from the access token and assigned it to a variable called `user_data` while in the `except` block we returned a HttpResponse of the error that occurred if the `try` block fails.
- If the `try` block successfully retrieved the user's data, we rendered a `profile.html` page, and also attached the `user_data` variable to the response.
- Else, if there is no token parameter attached to the request, we redirect the user back to the registration and login page.

Now, add the URL pattern and also create a template for your views.

Modify the `urls.py` file in the **radiusApp** directory.

`radiusApp/urls.py`

```python
urlpatterns = [
    #...
     path('profile/', views.profile, name="profile")
 ]
```

Head over to the **templates** directory in the **radiusApp** directory and create a `profile.html` file.

In the termainal type:

`radiusApp/templates`

```plaintext
$ type nul > profile.html
```

Open your `profile.html` file and add the following HTML code:

`templates/profile.html`

```html
{% load static %}
 
 <!DOCTYPE html>
 <html>
     <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <link rel="stylesheet" href="{% static 'style.css'%}">
         <title>Profile</title>
     </head>
 
     <body>
 
         <div class="wrapper">
             <div class="profile">
                 <div class="profile__head">
                     <h4>profile details</h4>
                 </div>
 
                 <div class="profile__details">
                     <span>
                     <span class="label">Provider: </span> {{user_data.Provider}}<br>
                     {% for i in user_data.Email %}
                         <span class="label">Email: </span>{{i.Value}}<br>
                     {% endfor %}
 
                     <span class="label">Number of login:</span> {{user_data.NoOfLogins}}
                     </span>
                 </div>
             </div>            
         </div>
 
     </body>
 </html>
```

Here we displayed the Provider, Email and NoOfLogins from the `user_data`. These are just some of the data present in the `user_data`.

Now, if you run your development server, and then register and login a user, you should see a page like this:

![Profile page](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626848979749_Screenshot+51.png)


To see the entire data present in the `user_data`, you can do something like this in your `profile.html`, file:

```html
{% load static %}

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="{% static 'style.css'%}">
        <title>Profile</title>
    </head>

    <body>

        {{user_data}}

    </body>
</html>
```

## Conclusion
In this tutorial, we discussed how to use LoginRadius for registration and authentication in Django. We started by introducing LoginRadius, what it is, its benefits, and how to get started with it. Then, we illustrated building a demo application with Django and implemented registration and authentication using LoginRadius.

**GitHub repo:** https://github.com/Tammibriggs/radiusAuth

