---
title: "How to Authenticate Users: JWT vs. Session"
date: "2021-08-17"
coverImage: "ArticleHead.jpeg"
author: "Uma Victor"
tags: ["Authentication","JWT","Sessions"]
description: "In this article, you'll learn the differences between JWT and Sessions, and which one to use for authentication."
---

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1626661833485_Drawing-1.sketchpad.jpeg)

In web applications, you try to decide when to use either JSON Web Tokens (JWTs) or sessions (cookies) for authentication. When you browse the web you use HTTP, which is a stateless protocol. So, the only way to remember the states of your application is using either sessions or tokens.

## Goals

This article deep dives into:

- Differences in using sessions and JSON Web Tokens for authentication
- How server-side session store works
- Advantages of sessions over JWT
- Advantages of using JWT and other things concerning the structure of JWT.

## JWT vs. Session: What to Use?

Deciding to choose between JWT or session is not just choosing one over the other. You need to look at some factors to determine which one to use in an application. In order to figure this out, you need to compare both approaches -- JWT and session -- to authenticate users.

## Comparison: JWT and Session

This article starts with how server-side sessions with a session store work, then looks at how client-side sessions with JWT work.

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1628279671087_How+sessions+work.png)

## How Server-side Sessions Work With a Session Store

Suppose, you have a website with a login form. You enter your email ID and password, and your browser sends a request to the server. Your server compares the password hashes, and if those hashes match, a session is created with a specific session ID. Then, the server returns a cookie with the session ID and the cookie is HTTP only, so it can not be read by any javascript that is not yours. It is also secured so that the cookie is never transferred over an insecure connection; that is, something that is not encrypted. Otherwise, someone can intercept the communication, like a man in the middle attack.

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1628279971421_sessionswork2.png)

If you make a follow-up request, your browser automatically sends this cookie along. Take a look at the session ID and fish it out.

## How Client-side Sessions Work with JWT

![](https://paper-attachments.dropbox.com/s_483BCD9E50710AD4C34073FFCB4BDCD46B2FB758D7EDCF747C5F8981B4094012_1628281019519_Clientside.png)

Instead of creating a session in your session store, you check whether the password hashes match. And if they do match, you can just create a JSON signature token and the token is signed with the secret. If someone tries to modify the payload, you will know and the signature validation will fail.

You can return the web signature token that can be put in a cookie, which is way better. Because, if you don't do that, there is a possibility that a third-party javascript can access it.

## Problems with JWT and Statelessness

Imagine a scenario in which a bank customer's info has been breached and the customer calls the bank to lock the account. This will be an issue if the bank uses JWT for authentication as JWT is stateless. Although you can find a workaround to do this by introducing state, it just defeats the purpose of having a JWT token in the first place, standing a chance of logging everyone out including the customer.

With Sessions, logging out that one particular customer won’t be a problem at all as the customer's state is stored.

### Data Visibility and Control

When using server-side sessions, you don't know who is currently logged into your application as this can be useful to inflict the history of what a person is currently doing. It’s a better idea to use sessions in industries like health care, banking, insurance, or companies that deal with money. It's also good to note that JWT is signed and anyone can read it or get an idea of how data or ID is structured, or how many rows data has, which is not the case for sessions as the data is not visible to users.

### Bandwidth Consumption

Session cookies take up very little bandwidth, whereas the bandwidth consumption will be higher in the JWT-based approach because the tokens tend to get bigger and you have the signature you have to send along for each follow up request; whereas if you have the session cookie, it's really small because its just the session ID that is being sent over.

### Revoking Roles and Privileges in JWT and Session-based Systems

A lot of breaches that happen in companies is a result of an internal breach from an employee or insider that is stealing data or doing weird things. It is really important to be able to revoke privileges immediately. Imagine a scenario where one person is locked in and has admin rights. Say, the token is valid for ten minutes or so. If for whatever reason you don't want that person to have admin privileges anymore, you can easily revoke the person's access if you use sessions, but might find it difficult if you use JSON web tokens.

## JWT: Advantages 

This section discusses the advantages of using JWT over sessions and scenarios where sessions do not cut it.

### Scalability

One of the “issues” with sessions is scalability. The argument is that sessions are stored in memory and servers are duplicated to handle the application load, therefore, limiting the scalability of the application. JWT, on the other hand, has higher scalability due to its statelessness. If you use a load balancer, you can easily pass along your users to several servers without worrying, as there is no state or session data stored anywhere, making it easy for gigantic scale workloads like that of Google and Facebook.

### Maintainability

A downside of the sessions is their maintainability, as the sessions need to be maintained. Somewhere on someone's server, a record will need to be created every time a user is authenticated. This is done in memory. The more the users are authenticated, the greater the overhead on your server. There is no need for maintainability in JWT as no state is stored, making it a better choice in this scenario.

### Multiple Platforms and Domain

When using sessions in an applications, there will come a time when you need to scale or expand the data for it to be used on multiple devices. Then, you'll need to worry about things like cross-origin resource sharing or even forbidden requests.

But with JWT, you don't have to bother about CORS as you can provide data to all sorts of devices and applications. Setting up a quick header configuration gets rid of any CORS problem you would have encountered.

    Access-Control-Allow-Origin: *

As long as a valid user has a valid token, data and resources are made available from any domain.

### Platform Independent

You can easily allow selective permissions for third-party applications with the help of JWT. Say, you build an application that you like to share permissions with other applications; for instance, sharing a video you watched on Facebook to friends on Instagram. You can also get creative building APIs that hand the special tokens to other applications so that user data can be accessed.

## Attacking JWTs vs. Session-based Authentication

Auth tokens are usually sent over the network and as such are vulnerable to attack. These kinds of attacks are:

- Man in the Middle attack
- OAuth token theft
- XSS
- CSRF
- Database/filesystem access
- Session fixation

Although it may seem that these types of attacks are not likely to happen, it's important to take security seriously and implement appropriate measures. The vulnerability of the system is based on the cumulative probabilities of all the types of attacks. In some ways, you can mitigate the above attacks:

1. **Man in the middle attack:** You can easily protect yourself from this type of attack by using secure HTTP and secure cookies throughout the app. However, this doesn't prevent attacks that use a proxy.
2. **OAuth token theft:** The solution to this is to have appropriate measures in place to detect stolen refresh tokens and use only short-lived access tokens.
3. **XSS attack:** One way to prevent this attack is to make sure that all of the dependencies are secure. This method is time-consuming and costly.
4. **Cross-site request forgery (CSRF):** Prevention of CSRF attacks typically requires the use of an anti-CSRF token or SameSite cookies. However, there are other methods that you can user to solve this in a way that is seamless with the whole authentication process.
5. **Database and filesystem access:** To control damage caused by unauthorized access to your database or filesystem, you could do the following:

    - Store only the hashed version of the tokens that are in your database to prevent unauthorized access.
    - If the private key is compromised, the attacker can access both the current and future sessions of the JWTs. To prevent this, all current JWTs must be changed before they are invalidated.

6. **Session fixation:** Each time a user logs in, generate a new set of tokens for that account. This method will invalidate the old ones if needed.
    
### Cookies vs. Local Storage

Some people who use JSON web tokens return the token and store it in local storage. This can be very dangerous as third party javascript, browser extensions, and malicious CDN scripts can have access to the token. But if you put it in a cookie, no javascript access, or even you has access to it.

Another thing to note is that when using cookies, you need to mitigate CSRF. Preventing it most of the time will have to do with installing a library and writing a few lines of code.

## Conclusion

In the article, you've learned the differences in using sessions and JSON web tokens for authentication, how serverside session store works, the advantages of sessions over JWT, and other things concerning the structure of JWT.

