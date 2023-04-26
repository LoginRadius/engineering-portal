---
title: "Website Authentication Protocols"
date: "2015-12-01"
coverImage: "server-proc-150x150.png"
author: Karl Wittig
tags: ["Authentication","Oauth"]
---

Authentication systems are the backbone of many websites. It allows users to log in to your site and preserving data between visits. It is crucial in offering a robust user experience, which rewards your users for providing their details. Authentications often provide access to personal private data which if made public, it could harm your user. To prevent these, authentication protocols were created to secure the requests while allowing users to still safely login to your system from any environment.

**Basic SSL Auth**

Basic auth is the simplest form of web authentication. It utilizes standard HTTP headers in place of more complicated solutions that rely on cookies, session identifiers, and login pages. There is very little security built into the basic auth system. Credentials are transmitted with only Base64 encoding and are not encrypted or hashed. Due to the ingrained insecurities in the system, these requests are most often made via HTTPS.

The authorization information should be compiled into the following format and included in the header:

Format:

```http
<!--Authorization: Basic -->
```

  
Full details on the Basic Authentication protocol can be found here: [http://www.w3.org/Protocols/HTTP/1.0/spec.html#AA](http://www.w3.org/Protocols/HTTP/1.0/spec.html#AA)

**Digest Auth**

Digest Auth works similar to basic SSL authentication with the exception that the password is encrypted using a one-way hash. It utilizes MD5 cryptographic hashing with a nonce(a server-generated value that prevents replay attacks).

The typical flow of a Digest Auth request is :

1. A user navigates to a page that requires user authentication.
2. The server responds with a 401 message that signifies that a user is not currently authorized to access the content. In the response, it also includes the nonce which will be used during the authorization to prevent replay attacks,
3. The site then displays an authentication interface to gather the required details( username and password )
4. The provided details are re-sent to the server with an authentication header included in the request that has a response code.
5. The server would then verify the provided credentials and accept the authentication or return a 401 message if the credentials are incorrect, which would cause the user to be again prompted with the authentication interface.

You can find full details on the Digest Auth protocol can be found here: [https://www.ietf.org/rfc/rfc2617.txt](https://www.ietf.org/rfc/rfc2617.txt)

**OAuth 1.0**

The OAuth 1.0 protocol relies on having a shared secret between the server and the site. This shared secret is used to generate a signature that is included in the request. The generated signature is used to verify the validity of the authentication request on the server-side. The process for authorizing the user is generally handled in three steps (3-legged OAuth):

1. Site obtains Request Token.
2. User authorizes the Request Token.
3. Site exchanges Request token for Access Token.

The process of completing a 3-legged OAuth request will generally be handled as follows:

1. The site will send a signed request for the Request token. This request should contain the following parameters:
    1. oauth\_consumer\_key
    2. oauth\_timestamp
    3. oauth\_nonce
    4. oauth\_signature
    5. oauth\_signature\_method
    6. oauth\_version
    7. oauth\_callback

This request will be validated on the server.  If validated, it will return the request token in the following format:

1. oauth\_token
2. oauth\_token\_secret
3. and any other additional parameters returned by your server.
4. The next step after retrieving the request token is to prompt your user to input their login credentials. These are then formatted into a signature with the oauth\_token request token. Then they are sent with a request back to the server for validation. Upon successful validation from this request, the server will return the following:

1. oauth\_token
2. oauth\_verifier

These will be used in the next step to retrieve an access token.

1. The final step is exchanging the retrieved details from step 2 for an access token, which will be used to access the server's resources. To exchange your request token for an access token, you can make a request to the server with the following signed request

1. oauth\_token -returned from step 2
2. oauth\_consumer\_key
3. oauth\_nonce
4. oauth\_signature
5. oauth\_signature\_method
6. oauth\_version
7. oauth\_verifier -returned from step 2

This will return you an access token to be used in conjunction with your secret in order to make requests for information from the server.

You can find full details on the OAuth 1.0 protocol here: [https://tools.ietf.org/html/rfc5849](https://tools.ietf.org/html/rfc5849)

**OAuth 2.0**

This is similar to the OAuth 1.0 protocol, it relies on a client id and secret in order to format request, but simplifies much of the complicated signing process that is inherent in the OAuth 1.0 system. The process for authorizing a user using the 3-legged OAuth 2.0 protocol is as follows:

1. User is directed to the service for authorization with the following details included in the authorization URL:
    1. client\_id
    2. redirect\_uri
    3. response\_type
    4. scope
2. The user would then authenticate with the service and grant the application access to their details. On successful authentication, the user is redirected back to the redirect\_uri with the following parameters:
    1. code
    2. state
3. The code returned in step 2 is then used by the application to make a request for an access token. Included in this request should be:
    1. client\_id
    2. client\_secret
    3. code
    4. redirect\_uri
    5. grant\_type - This should be set to “authorization\_code”

The server will verify these details and then return an access token with an expiration time if they are valid. These get generally returned in the following format:

1. access\_token
2. expires\_in
3. refresh\_token

You can find full details on the OAuth 2.0 protocol here: [http://oauth.net/2/](http://oauth.net/2/)

Authentication protocols allow you to secure your data with varying levels of security. Depending on the data being accessed and your desired level of security, implementing one of the above protocols allows you to be confident that your data is safe and can only being accessed by users that are permitted to your system.
