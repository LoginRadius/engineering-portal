---
title: "What to Do if Someone Steals Your JSON Web Token?"
date: "2021-06-10"
coverImage: "json-web-token-stolen-cover.jpg"
tags: ["data security","authentication"]
author: "Vishal Sharma"
description: "JWT tokens provide secure access to an authenticated user, and attackers are always looking for ways to steal these tokens and quickly gain access by impersonating a consumer. Here we’ve clubbed efficient ways for enterprises to ensure maximum security and steps that can help in a situation where a client’s JSON web token is stolen."
metatitle: "What Should You Do if Someone Steals Your JSON Web Token?"
metadescription: "JSON web tokens, if stolen by attackers, could lead to a massive loss for a business and consumers. Read the security best practices to minimize the loss."
---

JSON web tokens are widely used as access tokens in commercial applications for granting access to consumers for a short period of time. 

These tokens include a token signature for integrity and are solely based on JSON format to authenticate users to provide access to certain services and resources within a network.  \


Since these tokens provide secure access to an authenticated user, attackers are always looking for ways to steal these tokens and quickly gain access by impersonating a consumer. 

So what can be done at the enterprise level to ensure maximum security, and what are the steps that can help in a situation where a client’s [JSON web token](https://www.loginradius.com/blog/engineering/jwt/) is stolen? 

Remember, once a JWT (JSON Web Token) is stolen, it can be the worst thing for an individual and the enterprise as there’s a huge chance of data breach and exploitation.

In this post, we will discuss the security implications of utilizing JSON web tokens, how they work, and how to minimize the loss if a token is stolen. 


## JWT- How Is It Used for Authentication?

JWT is made from 3 components-the _Header_, the _Payload_, and the _Signature_. 

The _Payload _generally contains the user information and regarding the transaction for which access is required. 

The _Header _contains the technical metadata details of the JWT placed in a separate JavaScript object and is sent with the Payload. 

Now, the last part of JWT is the _Signature_. It’s a MAC (Message Authentication Code), which can only be produced by an individual that possesses both the Payload and Header along with a secret key. 

Once the user submits the credentials to the authentication server, the server validates the credentials and then creates a JWT with the user’s details along with the expiration timestamp.

Now, the authentication server considers a security key and then utilizes it to sign the Header and the Payload and then sends it back to the user’s web browser.

The browser then takes the signed JWT and begins sending the same with every HTTP request to the application server. 

In a nutshell, the signed JWT is now acting as a temporary login credential for a user, which replaces the permanent credential. 

**Read more**: [Invalidating JSON Web Tokens](https://www.loginradius.com/blog/engineering/invalidating-jwt/)


## What to Do if JWT Token is Stolen? 

There could be nothing worse than getting a JWT token stolen, as it’s like providing a license to bypass all the layers of security to an attacker for exploiting sensitive information. 

Here are some crucial steps that enterprises should consider when their client’s token gets stolen: 


### 1. Ask Clients to Change their Passwords Immediately

One of the most important steps is to ask your clients to change their passwords immediately if there’s an instance where the JWT token is stolen.  

Changing the password of an account will prevent attackers from exploiting the account and would eventually help in avoiding a data breach. 

### 2. Revoke Tokens 

If you suspect any token being used by an unauthorized professional, it is best to revoke a token. This immediately pulls the attacker out of your network and helps in minimizing the risk. 

Once the token is revoked, ask the client to reset their password and ensure they choose a strong password and must utilize [multi-factor authentication](https://www.loginradius.com/multi-factor-authentication/) in place as offered by LoginRadius CIAM.

[![EB-GD-to-mod-cust-id](EB-GD-to-mod-cust-id.png)](https://www.loginradius.com/resource/guide-to-modern-customer-identity/)

### 3.   Look for a Security Breach Within your Network

Since an attacker can exploit a user account to gain access to your organization’s sensitive information, it is crucial to inspect your environment for any attempts to access resources or bypass security layers. 

If you find anything suspicious, put your best foot forward to analyze the loss and work immediately to rectify the situation and minimize further damage. 


### 4. Work on the Root Cause

Your business must identify the root cause of a token getting stolen from a client’s end. It’s your responsibility to check whether the breach was due to inadequate utilization of security measures, poor device security, or due to human error. 

Once you’re aware of the actual cause, make sure you tighten your security and add multiple layers of security and authentication like MFA (Multi-Factor Authentication) and RBA (Risk-Based Authentication) as offered by LoginRadius. 


## Conclusion 

With businesses facing new security vulnerabilities every day, stolen JWT tokens could be the worst thing for any enterprise delivering online services. 

It’s crucial for businesses to ensure maximum security at the consumer level and take necessary precautions to [avoid a security breach](https://www.loginradius.com/blog/identity/2019/10/cybersecurity-best-practices-for-enterprises/). 

The aforementioned aspects could help mitigate the risk and ensure minimum loss if a security threat related to a client’s JWT token is detected. 



[![book-a-demo-loginradius](../../assets/book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)
