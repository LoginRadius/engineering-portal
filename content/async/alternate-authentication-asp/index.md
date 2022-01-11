---
title: "Types of Authentication in Asp.Net"
date: "2015-10-01"
coverImage: "alternate-authentication-asp-dot-net1-150x150.png"
author: "Team LoginRadius"
tags: ["Engineering","Authentication","Asp.Net","Multipass","JWT", "JSON Web Token"]
description: "Learn types of Authentication in Asp.Net and how it plays an important role in any system."
---

**Introduction**

Authentication and authorization both are most important things for any system and application. This blog starts with authentication and authorization concepts and after that explains the three default important ways and three custom authentication ways for doing authentication and authorization i.e. windows, forms ,passport, multipass, JWT  and SAML authentication. Plus, in this blog I will explain some fundamental concepts about the different authentication system.

**Authentication and Authorization**

Authentication is the process for checking the identity of a user based on the user’s credentials. Generally, user’s credentials are  in the form of user ID and password, and we check their credentials from database or equivalent alternative, if it exists then user is a valid candidate for next process - authorization.

Authorization also known as “Permission Control” will come after authentication. Authorization is the process of deciding what kind of resource a user can access based on their identity and checking whether the authenticated user has sufficient rights to access the requested resources. Typically a resource can be an ASP.NET web page, media files (MP4, GIF, JPEG etc), compressed file (ZIP, RAR) etc.

**ASP.NET default authentication Providers**

**1\. Form Authentication**

Normally, form authentication is based on cookies, the authentication and permission settings are stored in cookies. However, we can also use form authentication without cookies, and in cookie-less form authentication we can use query string for passing user details. Remember, the key concept is always ONLY allow the user with correct credential also enough permission to view certain resources, so we need to capture their information and compare with what we have stored in the database. And no matter what kind of form authentication we use, after we receive the data on server end, we will compare them with the data stored in any storage method/provider. For example, we can store username and password in the web.config file, a JSON file, or a database table.

Forms authentication flow:

1. When a user requests a page for the application, ASP.NET checks session cookie. If the cookie exists and valid, ASP.NET assumes the user is authenticated and processes the request.
2. If session cookies does not exists or not valid then it redirect to login form.
3. User will enter username and password and if they are valid then he will get authenticated and authorized.

 **2\. Passport Authentication**

Passport authentication is a centralized authentication service provided by Microsoft. The .NET Passport single sign-in service. When we use passport authentication then user authentication in your application is managed by Microsoft's passport service. Passport authentication uses encrypted cookies to manage the authentication.

**How Password authentication works** Users do not need to retype their sign-in name and password when moving from site to site. Those .NET Passport–enabled sites will issue a set of encrypted cookies in the .NET Passport central servers' domain to facilitate silent and seamless sign-in across sites. In some cases, sites owners will first redirect their end-users to .NET Passport sign-in and to authenticate upon first viewing of their site. If the users are logged in already, they'll get authenticated by ASP.NET, and if they are not logged in they will get redirected to passport servers (i.e hotmail, Live etc.)  to login first. If user successfully authenticates himself, it will return a token to your website.

**3\. Windows Authentication**

We use windows authentication when we are creating a web application for a limited number of users who already have Windows account and this type of authentication is quite useful in an intranet environment. This authentication method uses local users windows account 'credentials' for to validate the user. Dot Net web application generally hosted on IIS(Internet Information Server) so the requests go directly to IIS to provide the authentication process in a Windows-based authentication model.

The entire responsibility of authentication is done by IIS. It first takes the user’s credentials from the domain login. If this process fails, IIS displays an alert dialog box so the user can enter or re-enter his login information.

Windows authentication have some advantages and disadvantages:

**Windows authentication Advantage**

1. Developers need to write less line of code for managing user's authentication.
2. Users can use their existing windows accounts for login.

**Windows authentication dis-Advantage**

1. You can't control windows authentication process.
2. Windows authentication only works on Microsoft OS you can't use it on others OS.

 **4\. Custom authentication Provider**

1. **Multipass**

Multipass authentication is a single sign on authentication. Suppose you have multiple sites and you want to create a single account for a user on both sites then you can use Single Sign-On. Single Sign-On is authentication system it allow user to share his authentication details with your there site. This allows a seamless experience for your users without forcing them to create a separate account on your second site. A multipass is simply a hash of keys and values, provided as an AES encrypted JSON hash.

2. **JWT (JSON Web token)**

JWTs represent a set of claims as a JSON object that is encoded in a JWS and/or JWE structure. This JSON object is called “JWT Claims Set”. The JSON object consists of zero or more name/value pairs (or members), where the names are strings and the values are arbitrary JSON values. These members are the claims represented by the JWT.

Your JWTs can contain any information you want; the user's name, birthdate, email, etc. You do this with claims based authorization. You then just tell your provider to make a JWT with these claims from the claims principle.

3. **SAML (Security Assertion Markup Language)**

SAML - Security Assertion Markup Language SAML. SAML is developed by the Security Services Technical Committee of "Organization for the Advancement of Structured Information Standards" (OASIS). SAML is an XML-based framework for exchanging user authentication. The purpose of SAML is to enable Single Sign-On for web applications across various domains.

SAML have three components: assertions, protocol, and binding. Assertions are authentication, attribute, and authorization. Authentication assertion validates the user's identity. Attribute assertion contains specific information about the user. And authorization assertion identifies user role and permissions.

SAML works with multiple protocols including Hypertext Transfer Protocol (HTTP), Simple Mail Transfer Protocol (SMTP), File Transfer Protocol (FTP) and also supports SOAP

**Summary**

Different authentication methods are available, and website’s owner always gets confused about which authentication method they should use, here I have explained some of the popular authentication and authorization methods, hope it made it a little bit clear for you. And I will provide some in-depth details about each type of authentication in my next blog, **happy coding**.
