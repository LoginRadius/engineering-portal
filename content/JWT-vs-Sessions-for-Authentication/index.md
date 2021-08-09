---
title: "JWT vs Sessions for Authentication"
date: "2021-07-19"
coverImage: "ArticleHead.jpeg"
author: "Uma Victor"
tags: ["Auth","JWT","Sessions"]
description: "A tutorial pointing out the differences between JWT vs Sessions and which one to use for authentication."
---

# JWT vs Sessions for Authentication

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1626661833485_Drawing-1.sketchpad.jpeg)

> In web applications, we try to decide when to use either JSON web tokens or sessions(cookies) for authentication. When we browse on the internet we use the HTTP, which is a stateless protocol, so the only way to remember the states of our application is using either sessions or tokens


## Goals

In this tutorial, we will deep dive into the differences in using sessions and JSON web tokens for authentication, how serverside session store works, the advantages of sessions over JWT, and other things that concern the structure of JWT.

## Should we use JWT or sessions?

Deciding to choose between JWT or session is not as simple as choosing one over the other. There are factors that we need to look at to determine which one you should use in your applications and to figure this out we will need to compare both approaches that are using JWT to log people in and using sessions for logging people in.


## Comparing both JWT and Sessions

Let's start with why you might prefer sessions over JWT and how server-side sessions with a session store work

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1628279671087_How+sessions+work.png)

## How server-side sessions with a session store work

If you have a website, and your site has a login form, so you enter your email and enter your password, your browser is going to make a request to the server, and your server is going to compare the password hashes and if those hashes match then you are creating a session with a specific session id and then the server returns a cookie with the session id and the cookie is HTTP only so it can not be read by any javascript that is not yours and it is also secured so that the cookie is never transferred over an insecure connection, that is something that is not encrypted, otherwise someone can intercept the communication like a man in the middle attack.

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1628279971421_sessionswork2.png)


If you make a follow-up request, your browser will automatically send this cookie along, then take a look at the session ID and fish it out.

**How Client-Side Sessions with JWT works**

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1628281019519_Clientside.png)


Instead of creating a session in your session store, you check whether the password hashes match and if they do match, you can just create a JSON signature token and the token is signed with secret and if someone tries to modify the payload, you will know and the signature validation will fail.
You can return the web signature token which can be put in a cookie which is way better. Because if you don't do that there is a possibility that a third-party javascript can access it.

## Problem with JWT and statelessness

Let’s imagine a scenario where a bank customer's info has been breached and the customer calls the bank to lock their account. This will be an issue if the bank uses JWT for authentication because JWT is stateless, although you can find a workaround to do this, by introducing state, it just defeats the purpose of having a JWT token in the first place, standing a chance of logging everyone out including the customer.
With Sessions, logging out that one particular customer won’t be a problem at all as the customer's state is stored.

## Visibility of data and Control

When using server-side sessions, you do not know who is currently logged into your application as this can be useful to inflict the history of what a person is currently doing. It’s a better idea to use sessions in industries like health care, banking, insurance, or companies that deal with money. It's also good to note that JWT is signed and anyone can read it or get an idea of how data or ID is structured, or how many rows data has, which is not the case for sessions as the data is not visible to users.

## Revoking roles and privileges in JWT and session-based systems

A lot of breaches that happen in companies is a result of an internal breach from an employee or insider that is stealing data or doing weird things. It is really important to be able to revoke privileges immediately. Imagine a scenario where one guy is locked in and he has admin rights and let's say the token is valid for like 10 minutes or so. If for whatever reason you don't want that person to have admin privileges anymore, you can easily revoke the person's access if you use sessions, but might find it difficult if you use JSON web tokens.


## Advantages of Using JWT 

In this section, we will discuss the advantages of using JWT over sessions and places where sessions do not cut it.

## JWT and Scalability

One of the “issues” with sessions is scalability, the argument being sessions being stored in memory and server being duplicated to handle the application load, therefore, limiting the scalability of the application. JWT on the other hand has higher scalability due to its statelessness. If you use a load balancer, you can easily pass along your users to several servers without needing to worry as there is no state or session data stored anywhere, making it easy for gigantic scales like google and Facebook kind of scale.

## Maintainability of JWT

One of the downsides of the sessions is their maintainability, as the sessions need to be maintained. Somewhere on someone's server, a record will need to be created every time a user is authenticated. This is done in memory and the more users that get authenticated, the greater the overhead on your server increases. There is no need for maintainability in JWT as no state is stored making a better choice in this scenario.

## Multiple Platforms and Domain

When using sessions in our applications, there will come a time when we will need to scale or expand our data for it to be used on multiple devices. Then we will need to worry about things like cross-origin resource sharing or even forbidden requests.
But with JWT, we don't have to bother about cors as we can provide data to all sorts of devices and applications. Setting up a quick header configuration gets rid of any CORS problem we would have encountered

    Access-Control-Allow-Origin: *

As long as a valid user has a valid token, data and resources are made available from any domain

## Platform Independent

We can easily allow selective permissions for third-party applications with the help of JWT. Let’s say we build an application that we will like to share permissions with other applications, for instance sharing a video you watched on Facebook to friends on Instagram. We can also get creative building APIs that hand our special tokens to other applications so that user data can be accessed.

## Bandwidth Consumption

The bandwidth consumption will be a little bit higher for the JWT based approach because the tokens tend to get bigger and you have the signature you have to send along for each follow up request, where as if you have the session cookie, it's really small because its just the session ID.

## Attacking JWTs vs session-based authentication

Auth tokens are usually sent over the network and as such are vulnerable to attack. These kinds of attacks are:

- Man in the Middle attack
- OAuth token theft
- XSS
- CSRF
- Database/filesystem access
- Session fixation

Although it may seem that these types of attacks are not likely to happen, it is important to take security seriously and implement appropriate measures. The vulnerability of the system is based on the cumulative probabilities of all the types of attacks. Let's see some ways we can mitigate the above attacks

1. **Man in the middle attack.**
    You can easily protect yourself from this type of attack by using secure HTTP and secure cookies throughout the app. However, this doesn't prevent attacks that use a proxy.
2. **OAuth token theft**
    The solution to this is to have appropriate measures in place to detect stolen refresh tokens and to use only short-lived access tokens.
3. **XSS attack**
    One way to prevent this attack is to make sure that all of the dependencies are secure. This method is time-consuming and costly.
4. **CSRF**
    Prevention of CSRF attacks typically requires the use of an anti-CSRF token or SameSite cookies. However, there are other methods that can be used to solve this in a way that is seamless with the whole authentication process.
5. **Database and filesystem access**
    To control damage caused by unauthorized access to your database or filesystem, you could do the following:
    - Store only the hashed version of the tokens that are in your database to prevent unauthorized access to it.
    - If the private key is compromised, the attacker can access both the current and future sessions of the JWTs. To prevent this, all current JWTs must be changed before they are invalidated.
6. **Session fixation**
    Each time a user logs in, generate a new set of tokens for that account. This method will invalidate the old ones if needed.
    
## Cookies vs. local storage

Some people that use JSON web tokens return the token and store it in local storage, this can be very dangerous as third party javascript, browser extensions, and malicious CDN scripts can have access to the token and this can be a big problem, but if you put it in a cookie, no javascript access, or even you has access to it.

Another thing to note is that when using cookies, you need to mitigate cross-site request forgery (CSRF). Preventing it most of the time will have to do with installing a library and writing a few lines of code.

## Conclusion

We have come to the end of this tutorial. Yay!!. In the tutorial, we learned the differences in using sessions and JSON web tokens for authentication, how serverside session store works, the advantages of sessions over JWT, and other things that concern the structure of JWT.

