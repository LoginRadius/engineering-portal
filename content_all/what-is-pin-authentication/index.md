---
title: "What is PIN Authentication"
date: "2021-02-27"
coverImage: "pin-authentication.jpg"
tags: ["security"]
featured: false 
author: "Abhishek Singh"
description: "Logging in through PIN is in popular culture nowadays. This feature allows the consumer to set a PIN in addition to the password during registration or login. Later, during the subsequent logins, the application requests the same PIN to authenticate."
metatitle: "What is PIN Authentication"
metadescription: "What is PIN authentication and why should businesses use this two-level authentication model. Learn how to implement PIN authentication on your website/application."
type: "start-with-identity"
---

# What is PIN Authentication

Pin Authentication is yet another popular method of authenticating consumer identity more efficiently. 

Logging in through PIN is in popular culture nowadays. This feature allows the consumer to set a PIN in addition to the password during registration or login. Later, during the subsequent logins for authentication, the application requests the same PIN to authenticate. 

This means PIN authentication is not a stand-alone authentication feature, i.e., it will always require the first level authentication feature in place to work with it.

[PIN based authentication](https://www.loginradius.com/resource/loginradius-and-pin-auth) generally works on a two-level authentication model. Let’s try to understand it with the help of an example:

Let’s say there is an application that supports PIN based authentication. Whenever a new user accesses the application, they’re prompted to enter the email/username and password combination, which can be considered a level 1 of this authentication model. 

Now there comes PIN, where the user gets an option to first set up one, either at registration or login. Whenever the same user reaccesses the application, they are prompted to enter a PIN instead of the email/username and password combination, which is considered level 2 of this authentication model.

Some other aspects which prove PIN authentication a robust and a secured model:

1. It is not permanent. The PIN will only be asked until the corresponding token is valid.
2. It is device-specific and will ask to set up a new one whenever it detects a new device.
3. It can also be used as a Re-Authentication model.

![What is PIN Authentication](pin-authentication.jpg)

## Why Should Businesses Use PIN Authentication

PIN Authentication flow reduces the efforts as well as time in the [complete authentication process](https://www.loginradius.com/blog/start-with-identity/2020/04/loginradius-pin-based-authentication/). As it is a two-level authentication model, the session is considered more secure as compared to a simple traditional login method because the PIN’s session depends on two different tokens to be a valid one. 
How Useful is PIN Authentication for Businesses

As we’ve already discussed the multiple advantages of using a PIN in an authentication process, apart from its usability alongside the authentication processes, PIN can also be used as an additional feature where the use cases of Re-Authentication arise. 

You can simply leverage this feature within your application to authenticate at different levels of granting access to the application.

[![pin-login](pin-login.png)](https://www.loginradius.com/resource/loginradius-and-pin-auth)

## How to Implement PIN Authentication

To implement this feature, you will be required to have an instance of LoginRadius Admin Console, which can be used further to enable and enforce PIN authentication.

Now once you have your own instance of LoginRadius Admin Console, you can refer to this [document](https://www.loginradius.com/docs/api/v2/customer-identity-api/pin-authentication/overview/) for gaining detailed information on the implementation of the PIN Authentication feature.

For PIN Re-Authentication, you can have a reference through this [document](https://www.loginradius.com/docs/api/v2/customer-identity-api/re-authentication/pin/overview/).

## Conclusion 

In this blog, we’ve conveyed all the relevant information about what exactly a PIN authentication means along with it’s workflow and how you can use the same to implement along with web applications, so that it can fulfill your business requirements. I hope this will help you understand the feature accordingly as per your use cases.

Cheers!


[![book-a-demo-loginradius](../assets/book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)