---
title: JWT authentication:Best practices and when to use it
date: "2021-10-07"
coverImage: "cover-image.png"
author: "Kolawole Mangabo"
tags: ["jwt", "security","javascript"]
description: "Learn about JWT usage and Best Practices"
---

One of the most used authentication standards in web applications is the JSON Web Token standard. It is mostly used for authentication,  authorization, and information exchange.

JSON Web tokens are made of three parts separated by dots `.` and they look like this typically: `xxxxx.yyyyy.zzzzz`. Then we have the Header, the Payload, and the Signature. You can learn more about JWT tokens by referring to this article on our blog.

And before using them and continuing to read this article, you might want to check what are the advantages compared to the Session authentication method. Feel free to check this article here.

## When to use JWT authentication?

### Authentication

The authentication is done when the client successfully proves its identity via a login endpoint. If it's successful, the server will create JSON Web Token and sent it in the response to the client. 
This JWT will be used by the client on every request for a protected resource. 

### Authorization

A server built on JWT for authorization will create JWT when a client login. This JWT is signed so it can’t be altered by any other party. 
Each time the client will have access to protected resources, the server will verify that the JWT’s signature matches its payload and header to determine that the JWT is valid.
Then if the JWT is successfully verified, it can grant or deny access to the resource. 

### Data exchanges

JWT is also a great way to secure information transmission between parties, two servers for example. And because you can verify the validity of the token (signature, structure, or the standards claimed in the JWT). 

## When to not use JWT authentication?

### Revocable tokens

JWT doesn’t require any lookup to the database, then revoking them before the expiration time is quite difficult. Revocation is very important in many cases. 
For example, when logging out users or banning users, or changing permissions or passwords instantly, it can happen that the user can continue to make some requests even if he has no authorization to do it.

### Sensible information

JWT is usually signed to protect against data manipulation or alteration. With this, the data can be easily read or decoded. 
Then you can’t include sensitive information such as the user’s record or any identifier, because the data are not encrypted.

### Cookie Size factor

The size of a JWT is greater than the size of a session token. And this can quickly increase linearly as you add more data to the JWT. And because you need to send the JWT at each request, you are increasing the payload size. 
This can be heavily complex if there is a low-speed internet connection.

## Best JWT Practices

### 1 - JWT as Access Tokens

JWT can be used as an access token to prevent unwanted access to a protected resource. They are often used as Bearer tokens, which the API will decode and validate before sending a response.

```
Authorization: Bearer <token>
```


### 2 - Refresh tokens logic with JWT

How do you get a new access token if this one is expired? The natural first idea is to log in again. But from a User Experience point, this can be quite painful.

JWT can be used as refresh tokens, these tokens are used to retrieve a new access token. 
For example, when a client makes a request to a protected resource and he receives an error, which can mean that the access token used has expired, the client can issue a new access token. 

It can be made by sending a request with a refresh token in the headers or the body. If the refresh token is valid, then a new access token will be created and send as a response. 
Note that the refresh token is obtained at authentication, and has a bigger lifetime.


### 3 - Which signing algorithm to use?

Interestingly enough, JWT can be signed using many different algorithms. But let’s quickly talk about the `alg` value in the JWT header, when it’s decoded. 
The `alg` value in JWT headers simply tells you how the JWT was signed. For example, with an `alg` value of `RS512`. 

`RS512 => RS 512` where RS is the signature algorithm and 256 the hashing algorithm, in this case, `SHA-512`.

`SHA-512` will produce a `512-bits` hash while `SHA-256` will produce a `256-bit` hash. 
And each of these algorithms gives you 50% of their output size of security level. This means that for example, `SHA-512` will provide you with `256-bits` security. 
In any case, make sure to use a minimum of `128-bit` security. 


### 4 - Expiration, issued time, and clock skew

JWT is hard to revoke when they are created. Most of the time, you’ll have to wait until the expiry time. That’s why you should use a short expiration time. 
Additionally, you can implement your own revocation system. 
JWT comes with a time-based claim `iat`- issues at. It can be used to reject tokens that are too old to be used by the resource server.
And clock skew specifies the allowed time difference (in seconds) between the server and the client clocks when verifying `exp` and `nbf` time-based claims. The default recommended default value is 5. 

### 5 - JWT Signature

The last part of a JWT is the signature, which is simply a MAC (or Message Authentication Code). This signature is created by the server using a secret key. This secret key is an important part of the JWT signature. 
There are two things to respect to decrease the probability of a secret key leaking or a successful brute force attack:

- Keep the secret key **secret**
- The minimum key length must be equal to the size of bits of the hash function used along with the HMAC algorithm.

    > "A key of the same size as the hash output (for instance, 256 bits for "HS256") or larger MUST be used with this algorithm." - [JSON Web Algorithms (RFC 7518), 3.2 HMAC with SHA-2 Functions](https://tools.ietf.org/html/rfc7518#section-3.2)


### 6 - Where to store the tokens?

The easiest ways to store a token on the client side are `localStorage` and `sessionStorage`. However, both are vulnerable to XSS attacks and `sessionStorage` is cleaned if the browser is closed. 
A better secure way is to store JWT in cookies. Cookies are not accessible via JavaScript, they can’t be read and written, and interestingly they are automatically sent to the server.

### 7 - Always use HTTPS

One of the main benefits of `HTTPS` is that it comes with security and trust.
`HTTP` path and query parameters are encrypted when using `HTTPS`. 
Then, there is no risk of someone intercepting the request, particularly the token in transit. These types of attacks are commonly **MitM** (man in the middle) attacks that can be successful on compromised or insecure networks.
 

## Conclusion

In this article, we discussed JWT and some best practices to fully use its potential.
JWT is simply an authentication standard with its pros and cons. Thus knowing some best practices can really help in better usage of JWT.


