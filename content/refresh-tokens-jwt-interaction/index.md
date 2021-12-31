---
title: "Refresh Tokens: When to Use Them and How They Interact with JWTs"
date: "2021-08-24"
coverImage: "refresh-tokens-jwt-interaction-cover.jpg"
category: ["security"]
featured: false
author: "Saikiran Babladi"
description: "A token plays a crucial role in enhancing the overall security mechanism of an organization. This blog provides an overview of using refresh tokens and how it helps securely authenticate users without hampering their overall experience."
metatitle: "What are Refresh Tokens and How They Interact with JWTs?"
metadescription: "Refresh tokens provide a seamless and secure authentication experience to users already logged in. Here’s what you need to know about refresh tokens."
type: "start-with-identity"
---

The modern digital landscape demands robust security, which significantly relies on access tokens that securely authenticate users.

A token plays a crucial role in enhancing the overall security mechanism of an organization that helps to deliver flawless and secure authentication and authorization on their website or application.

For years, businesses have been using [token-based authentication](https://www.loginradius.com/blog/start-with-identity/pros-cons-token-authentication/) that allows users to access resources. These tokens have a minimal lifetime, ensuring that cybercriminals have minimum time to exploit a user’s identity.

With token security, users have to re-authenticate themselves for obvious security reasons by offering credentials to sign in if the access token is expired.

However, this can be tedious and hampers user experience. To overcome this, the concept of refresh tokens was introduced.

A refresh token ensures that a user can regain the access token without providing login credentials.

Let’s dig deeper about refresh tokens, their use, and how they interact with JWTs (JSON Web Token).

## What is a Token?

A token can be defined as a digitally encoded signature used to authenticate and authorize a user to access specific resources on a network.

A token is always generated in the form of an OTP (One-Time Password), which depicts that it could only be used once and is generated randomly for every transaction.

The token-based authentication allows users to verify their unique identity, and in return, they receive a special token that provides access to specific resources for a particular time frame.

Apart from this, users can easily access the website or network for which the token is issued and need not enter the credentials again and again until the token expires.

Tokens are widely used for regular online transactions for enhancing overall security and accuracy.

## What is a Refresh Token?

Since access tokens aren’t valid for an extended period because of security reasons, a refresh token helps re-authenticate a user without the need for login credentials.

The primary purpose of a refresh token is to get long-term access to an application on behalf of a particular user.

In a nutshell, a refresh token allows any website or application to regrant the access token without bothering the user. Here are its benefits:

- Balances security with usability
- Reinforces authentication
- Improves user experience

## What is a JWT (JSON Web Token)?

JWT (JSON Web Token) is used to provide a standard way for two parties to communicate securely. JWT is commonly used for managing authorization.

There is an open industry standard called RFC-7519, which defines how JWT should be structured and how to use it to exchange information (called “claims”) in the form of JSON objects. This information can be verified and trusted as it is digitally signed.

[JWT (JSON Web Token)](https://www.loginradius.com/blog/async/jwt/) is a popular method of SSO, which is widely used by B2C applications, and through this system, you can allow your consumers to log in to an application that supports JWT.

## When to Use a Refresh Token?

Before inching towards refresh tokens, one should understand that [OAuth 2.0](https://www.loginradius.com/blog/async/oauth2/) specifications define both access tokens and refresh tokens.

Enterprises can leverage a refresh token in scenarios where the API needs authentication through an access token but users aren’t always available to provide credentials again and again.

Hence, to enhance usability and improve user experience, refresh tokens can be used.

**Also read:** **[Working With Industry Authorization: A Beginner's Guide to OAuth 2.0](https://www.loginradius.com/blog/start-with-identity/OAuth2.0-guide/)**

## Best Practices to Secure Refresh Tokens

Since browser-based web applications cannot start using a refresh token, refresh tokens always require additional security.

Whenever a refresh token is being utilized, the security token service quickly issues another access token and a new refresh token. The user can now make API calls through a refresh token.

Whenever the overall security token service suspects that any refresh token is being used more than once, it automatically assumes something isn’t right. As a result, the refresh token gets immediately revoked and hence ensures adequate security.

[RBA (Risk-based Authentication) ](https://www.loginradius.com/blog/start-with-identity/risk-based-authentication/)can be the finest way to enhance the security of a refresh token since it helps to analyze a vulnerability and automatically adds another stringent security layer in the mechanism.

RBA works seamlessly with token-based authentication and can help improve overall security in high-risk scenarios where businesses need a stringent mechanism to prevent a security breach.

## Authentication Using JWT Token and Refresh Token

JWTs represent a set of claims as JSON objects encoded in a JWS and JWE structure. This JSON object is called “JWT Claims Set.” The JSON object consists of zero or more name/value pairs (or members), where the names are strings, and the values are arbitrary JSON values. These members are the claims represented by the JWT.

Your JWTs can contain any information you want; the user's name, birth date, email, etc. You do this with claims-based authorization. You then just tell your provider to make a JWT with these claims from the claims principle.

Authentication is implemented through JWT access tokens along with refresh tokens. The API returns a short-lived token (JWT), which expires in 15 minutes, and in HTTP cookies, the refresh token expires in 7 days.

JWT is currently used for accessing secure ways on API, whereas a refresh token generates another new JWT access token when it expires or even before.

## Conclusion

Refresh tokens can be the ideal way to enhance security and improve user experience since users need not enter login credentials again and again.

LoginRadius helps enterprises get maximum benefits in terms of security, scalability, and usability when implementing token-based authentication on web and mobile devices.

Businesses can leverage LoginRadius’ authentication and authorization services for a seamless experience that fosters business growth. [Schedule a call today](https://www.loginradius.com/contact-sales)!

[![book-a-demo-loginradius](book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)
