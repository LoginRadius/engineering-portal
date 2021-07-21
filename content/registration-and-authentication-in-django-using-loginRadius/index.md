---
title: "Registration and Authentication in Django using LoginRadius"
date: "2021-7-21"
coverImage: "coverImage.png"
author: "Taminoturoko Briggs"
tags: "Django, auth"
description: "In this tutorial you will learn how to implement user registration and authentication in Django using loginRadius"
---

# Registration and Authentication in Django using LoginRadius
*In this tutorial you will learn how to implement user registration and authentication in Django using loginRadius*

## Prerequisite

To follow up on this tutorial, you should be familiar with Python and Django a python framework.

## Overview

We will start by giving a brief introduction to LoginRadius, what it is and some benefits of using LoginRadius, then will move over to see how we can implement user Registration and authentication in Django using LoginRadius

## Introduction

**What is LoginRadius**


> LoginRadius is SaaS based CIAM platform that manages consumer identity and privacy, allowing businesses to customize a secure digital experience their consumers will love.

The developer-friendly Identity Platform provides a comprehensive set of APIs to enable registration, authentication, identity verification, single sign-on and more.

**Benefits of using LoginRadius**

- It provides scalable infrastructure.
- It provides  security of data and accounts.
- Compliance with pricacy regulations.
- It provides advanced login options.

These are just some of the benefits of using LoingRadius.

## Getting started

To get started with LoginRadius, you have to first [Create an account](https://accounts.loginradius.com/auth.aspx?return_url=https://dashboard.loginradius.com/login&action=register) if you don't have one yet, then login to your [LoginRadius dashboard](https://accounts.loginradius.com/auth.aspx?return_url=https://dashboard.loginradius.com/login). 
You will see a page like this:


![Dashboard](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849810764_Screenshot+34.png)


When you create an account, LoginRadius sets up a free app for you. This is the app we are going to integrate with Django. Here my app name is "tammibriggs".
Click on your app and you will see a page like this:


![LoginRadius app](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849852750_Screenshot+36.png)


There is one more thing LoginRadius authomatically creates for your, an [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx). This is a ready-to-use web page where features like Email and Password login, User registration, Forgot password, and Remember me, have already been implemented for you. We will utilize this web page for registration and authentication requirements in our Django application. [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx) reflects the configuration changes that you make in LoginRadius Dashboard. There is also room for customization, you can read more about that here: [Auth Page (IDX) customization](https://www.loginradius.com/docs/developer/guide/customize-auth-page).

At this point we know what LoginRadius is, its benefits and how you can get started with LoginRadius. Now that we know all that, let’s see how we can integrate LoginRadius with a Django application.

## Integrating LoingRadius with Django application

This section covers:

- Installation of dependencies.
- Setting up a demo application that we will be integrating LoginRadius into.
- It also covers LoginRadius integration with the Python and Flask demo application code.


> You must have python installed, and the minimum supported version is 2.7.

**Getting API Credentials**
Before using any of the APIs that LoginRadius provides, you need to get your **App Name**, **API Key**, and **API Secret**.
On your LoginRadius app, navigate to

[Configuration > API Credentials](https://dashboard.loginradius.com/configuration)


![API credentials](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849573473_Screenshot+38.png)


You will find your API key under the **API Key and Secret** subsection.


![API key and secret](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849474291_Screenshot+44_LI.jpg)


**Whitelist your Domain**
For security reasons, LoginRadius processes the API calls that are received from the whitelisted domains. Local domains (http://localhost and http://127.0.0.1) are whitelisted by default. This means we don't have to worry about whitelisting our domain if we are running our application on Django's development server. But on a production environment, you definitely have to whitelist our domain.
To whitelist your domain, in your LoginRadius Dashboard, navigate to

[Configuration > Whitelist Your Domain](https://dashboard.loginradius.com/configuration)

and add your domain name

![Whitelist your domain](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849403941_Screenshot+41.png)


**Installation of Dependencies**
We need to install the LoginRadius Python SDK. It provides functionalities that allow Python programs to communicate with LoginRadius APIs.
Open Vscode, Pycharm or any other editor you may be using.
In the terminal, type:


    $ pip install LoginRadius-v2 requests cryptography pbkdf2

these are the dependencies we will need to integrate LoginRadius into our Django application.

**Setting up Django**

1. Install Django.
2. Create a new project.
3. Create an app inside the project.
4. Migrate your project.
5. Create a urls.py file in your app.

You can accomplish all this with the following commands in your terminal:


    $ python -m pip install django
    
    $ django-admin startproject radiusAuth
    
    $ cd radiusAuth
    
    $ python manage.py startapp radiusApp
    
    $ python manage.py migrate
    
    $ cd radiusApp
    
    $ type nul > urls.py
    

Here, I named my project **radiusAuth** and my app **radiusApp** but you can use any name you want.
You now have a **radiusAuth** project and **radiusApp** app setup.

**Configure Project**
You need to tell Django about the app you created and the location of the app's *urls.py* file. 
First, let Django know the location of our app.
In your **radiusAuth** project navigate to *radiusAuth/settings.py*, modify the `INSTALLED_APPS`:
*radiusAuth/settings.py*

    INSTALLED_APPS = [
        "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.contenttypes",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
        "radiusApp",
    ]

Once you have added it, go over to the *urls.py* file in the same directory and modify the `urlpatterns` and including to app url location.

*radiusAuth/urls.py*

    from django.contrib import admin
    from django.urls import path, include
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', include('radiusApp.urls'))
    ]


## User Registration and Authentication

Remember we said, there is a webpage LoginRadius automatically created for us, an [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx), which already has registration and authentication implemented. We are going to utilize this web page to meet our registration and authentication needs.
How do we do that?.

You can access your registration and login page with the following URLs.

Registration Page URL:

    https://{APP Name}.hub.loginradius.com/auth.aspx?action=register&return_url={Return URL}

Login Page URL:

    https://{APP_NAME}.hub.loginradius.com/auth.aspx?action=login&return_url={RETURN_URL}


- The APP_NAME parameter is your LoginRadius app name, which we mentioned in the [Get API Credentials](#) section.
- The RETURN_URL parameter refers to the URL where the user should be redirected to upon successful authentication.

So what we will do now is to create links or buttons that users can click to access these URL.
First, let's create a views that will be responsible for displaying our registration and login page.
Edit the *views.py* file of the **radiusApp** application and add the following code:

*radiusApp/views.py*

    from django.shortcuts import render
    
    def register_n_login(request):
        return render(request, 'index.html')

all this views does is to render a html page as a response.
Now we need to add the URL pattern for this views.

In the *urls.py* file of your **radiusApp** application, add the following code:
*radiusApp/urls.py*

    from django.urls import path
    from . import views
    
    urlpatterns = [
        path('', views.register_n_login, name="access"),
    ]

The `register_n_login` views can now be accessed by a URL. It's time to create a template for our views. But before we do that, let me introduce some basic styling we will use in our application.

Create a **static** directory and a *style.css* file in your app directory.
Open your terminal and type the following command:
*radiusAuth/radiusApp*

    $ mkdir static
    $ cd static
    $ type nul > style.css

Open the *style.css* file and the following CSS styles:

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

Now lets create the template for our `register_n_login` views
Create a **templates** directory and a *index.html* file in your app directory.
Open your terminal and type the following command:

*radiusAuth/radiusApp*

    $ mkdir templates
    $ cd templates
    $ type nul > index.html

Open the *index.html* file and the following HTML

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

We used an `onclick` event on both the register and login button, which when clicked changes the windows location to the [Auth Page (IDX)](https://www.loginradius.com/docs/developer/concepts/idx) register and login page respectively.


> NOTE: Don’t forget to replace the {APP_NAME} placeholder with your LoginRadius app name.
> 

Also, in the register and login link, we replaced the {RETURN_URL} parameter with http://127.0.0.1:8000/profile/, which is the users profile page we are going to create shortly.

Run the development server and open http://127.0.0.1:8000/, you will see a page like this:

![Register and Login page](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849064162_Screenshot+48.png)


Now when you click the register or login button your will see a page like this:

![Auth page (IDX)](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626849029873_Screenshot+46.png)

> When LoginRadius successfully authenticates a user, it attaches an access token in the query string as a token parameter to the REDIRECT_URL.

we are going to retrieve the user's data from the access token.

## Retrieve User Data using Access Token

In this section, we are going to retrieve the authenticated user data using access token. But first we need to initialize LoingRadius SDK with your API_KEY and API_SECRET.

**Intializing LoginRadius SDK**
Create a new *config.py* file in your **radiusApp** directory.

Open your terminal and type this command:
*radiusAuth/radiusApp*

    $ type nul > config.py

Open the *config.py* file and add the following lines of code:

    from LoginRadius import LoginRadius as LR
    
    LR.API_KEY = "API_KEY"
    LR.API_SECRET = "API_SECRET"
    loginradius = LR()

Replace API_KEY and API_SECRET with your respective LoginRadius API credentials.

Now lets create the view that will be responsible for retrieving user data
Open the *views.py* file in your **radiusApp** directory and add the following lines of code:

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

In this code snippet, we imported the initialized LoginRadius class from the *config.py* file and also imported `redirect` and `HttpResponse` from there respective modules.
We also introduced a new function called `profile`. In this function we did the following:

- We first checked if there is a token parameter attached to the request. If true,
- We created a `try` and `except` block. In the `try` block we used the `authentication.get_profile_by_access_token` method to retrieve the user data from the access token and assigned it to a variable called `user_data` while in the `except` block we returned a HttpResponse of the error that occurred if the `try` block fails.
- If the `try` block successfully retrieved the user's data, we rendered a *profile.html* page, and also attached the `user_data` variable to the response.
- Else, if there is no token parameter attached to the request, we redirect the user back to the registration and login page.

Now let's add the URL pattern and also create a template for our views.

Modify the *urls.py* file or in the **radiusApp** directory.

    urlpatterns = [
       #...
        path('profile/', views.profile, name="profile")
    ]

Head over to the *templates* directory in the **radiusApp** directory and create a *profile.html* file.

In the termainal type:
*radiusApp/templates*

    $ type nul > profile.html

Open your *profile.html* file and add the following HTML code:

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

Here we displayed the Provider, Email and NoOfLogins from the `user_data`. These are just some of the data present in the `user_data`.
Now if you run your development server then register and login a user  you should see a page like this:

![Profile page](https://paper-attachments.dropbox.com/s_06CCF8584138C77AD580AFE76E986CC1E8C4C360158F4A6548D0F9EAC304864E_1626848979749_Screenshot+51.png)


To see the entire data present in the `user_data`, you can do something like this in your *profile.html* file:

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


## Conclusion

In this tutorial we have looked at how we can use LoginRadius for registration and authentication in Django. We started by giving a brief introduction to LoginRadius, what it is, its benefits, and how we can get started with it, then we rounded up by building a demo application with Django were implemented registration and authentication using LoginRadius.


## Github repo
https://github.com/Tammibriggs/radiusAuth


