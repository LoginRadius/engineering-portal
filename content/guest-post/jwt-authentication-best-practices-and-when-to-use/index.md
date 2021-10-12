---
title: JWT Authentication: Best practices and When To Use
date: "2021-10-14"
coverImage: "cover-image.png"
author: "Kolawole Mangabo"
tags: ["JWT", "Authentication","Best Practices"]
description: "This article helps you understand how to use JWT and learn the best practices"
---

One of the most used authentication standards in web applications is the JSON Web Token standard. It is mostly used for authentication, authorization, and information exchange.

JSON Web tokens are made of three parts separated by dots `.` -- and look like this typically: `xxxxx.yyyyy.zzzzz`. These correspond to the Header, the Payload, and the Signature. You can learn more about [JWT tokens here](https://www.loginradius.com/blog/async/jwt/).

And before using them and continuing to read this article, you might want to check the advantages compared to the session authentication method. You can learn more about [JWTs vs. Sessions here](https://www.loginradius.com/blog/async/guest-post/jwt-vs-sessions/).

## When to Use JWT Authentication?

### Authentication

Authentication is done when a client successfully proves its identity via a login endpoint. If it's successful, the server will create JSON Web Token and send it in response to the client.

The client will use this JWT on every request for a protected resource. 

### Authorization

A server built on JWT for authorization will create a JWT when a client logs in. This JWT is signed, so any other party can’t alter it.

Each time the client has access to protected resources, the server will verify that the JWT’s signature matches its payload and header to determine that the JWT is valid.

Then if the JWT is successfully verified, it can grant or deny access to the resource. 

### Data Exchanges

JWT is also a great way to secure information transmission between parties -- two servers, for example -- and because you can verify the validity of the token (signature, structure, or the standards claimed in the JWT). 

## When Not to Use JWT Authentication?

### Revocable tokens

JWT doesn’t require any lookup of the database, so revoking them before the expiration is quite difficult. 

Revocation is very important in many cases.

For example, when logging out users or banning users, or changing permissions or passwords instantly, if the token hasn't been revoked, it might be possible for the user to continue to make requests even if this user no longer has the required authorization to do so.

### Sensible Information

JWT is usually signed to protect against data manipulation or alteration. With this, the data can be easily read or decoded.

So, you can’t include sensitive information such as the user’s record or any identifier because the data is not encrypted.

### Cookie Size Factor

The size of a JWT is greater than the size of a session token. And this can quickly increase linearly as you add more data to the JWT. And because you need to send the JWT at each request, you're increasing the payload size. This can become heavily complex if there is a low-speed internet connection.

## JWT: Best Practices

### 1) JWT as Access Token

JWT can be used as an access token to prevent unwanted access to a protected resource. They're often used as Bearer tokens, which the API will decode and validate before sending a response.

```
Authorization: Bearer <token>
```

### 2) Refresh Tokens Logic with JWT

How do you get a new access token if this one is expired? The natural first idea is to log in again. But from a User Experience point, this can be quite painful.

JWT can be used as [refresh tokens](https://www.loginradius.com/blog/async/guest-post/what-are-refresh-tokens-and-when-to-use-them/); these tokens are used to retrieve a new access token.

For example, when a client requests a protected resource and receives an error, which can mean that the access token has expired, the client can be issued a new access token by sending a request with a refresh token in the headers or the body.
If the refresh token is valid, a new access token will be created and sent as a response.

Note that the refresh token is obtained at authentication and has a bigger lifetime.

### 3) Which Signing Algorithm to Use?

Interestingly enough, JWT can be [signed using many different algorithms](https://www.loginradius.com/blog/async/jwt-signing-algorithms/). But let’s quickly talk about the `alg` value in the JWT header. When it’s decoded:

The `alg` value in JWT headers simply tells you how the JWT was signed. For example, with an `alg` value of `RS512`. 

`RS512 => RS 512` where RS is the signature algorithm and `SHA-512` is the hashing algorithm.

`SHA-512` will produce a `512-bits` hash while `SHA-256` will produce a `256-bit` hash. And each of these algorithms gives you 50% of their output size of security level. This means that, for example, `SHA-512` will provide you with `256-bits` security.

In any case, make sure to use a minimum of `128-bit` security.


### 4) Expiration, Issued Time, and Clock Skew

JWTs are hard to revoke when they are created. Most of the time, you’ll have to wait until expiry. That’s why you should use a short expiration time. 

Additionally, you can implement your own revocation system.

JWT comes with a time-based claim `iat`-- issued at. It can be used to reject tokens that are too old to be used by the resource server.
And clock skew specifies the allowed time difference (in seconds) between the server and the client clocks when verifying `exp` and `nbf` time-based claims. The default recommended default value is 5.

### 5) JWT Signature

The last part of a JWT is the signature, which is simply a MAC (or Message Authentication Code). This signature is created by the server using a secret key. This secret key is an important part of the JWT signature.

There are two things to respect to decrease the probability of a secret key leaking or a successful brute force attack:

- Keep the secret key **secret**
- The minimum key length must be equal to the size of bits of the hash function used along with the HMAC algorithm.

    > "A key of the same size as the hash output (for instance, 256 bits for "HS256") or larger MUST be used with this algorithm." - [JSON Web Algorithms (RFC 7518), 3.2 HMAC with SHA-2 Functions](https://tools.ietf.org/html/rfc7518#section-3.2)


### 6) Where to Store the Tokens?

The easiest ways to store a token on the client side are `localStorage` and `sessionStorage`. However, both are vulnerable to XSS attacks, and `sessionStorage` is cleaned if the browser is closed.

A better, secure way is to store JWT in cookies. Cookies are not accessible via JavaScript, they can’t be read and written, and interestingly, they are automatically sent to the server.

### 7) Always Use HTTPS

One of the main benefits of `HTTPS` is that it comes with security and trust. `HTTP` path and query parameters are encrypted when using `HTTPS`.

Then, there is no risk of someone intercepting the request, particularly the token in transit. These types of attacks are commonly called **MitM** (man in the middle) attacks that can be successful on compromised or insecure networks.
 
## Conclusion

This article discussed JWT and some best practices to fully use its potential.

JWT is simply an authentication standard with its pros and cons. Thus, knowing some best practices can really help you use JWT better.


