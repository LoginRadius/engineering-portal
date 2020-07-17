---
title: "Using JWT with OAuth2: When and Why"
date: "2019-03-11"
coverImage: "photo-1454165804606-c3d57bc86b40.jpeg"
author: Ti Zhang
tags: ["JWT","OAuth", "JSON Web Token"]
---

## What is JWT? What is OAuth2?

JWT(Json Web Token) is a token format. It is digitally-signed, self-contained, and compact. It provides a convenient mechanism for transferring data. JWT is not inherently secure, but the use of JWT can ensure the authenticity of the message so long as the signature is verified and the integrity of the payload can be guaranteed. JWT is often used for stateless authentication in simple use cases involving non-complex systems. For more information on JWT, please see [https://lr-engineering.now.sh/blog/jwt/](https://lr-engineering.now.sh/blog/jwt/)

OAuth2 is an authorization protocol that builds upon the original OAuth protocol created in 2006, arising out of a need for authorization flows serving different kinds of applications from web and mobile apps to IoT. OAuth2 specifies the flows and standards under which authorization token exchanges should occur. OAuth2 does not encompass authentication, only authorization. For more information on OAuth2, please see [https://tools.ietf.org/html/rfc6749](https://tools.ietf.org/html/rfc6749)

## Using JWT with OAuth2 

JWT and OAuth2 are entirely different and serve different purposes, but they are compatible and can be used together. The OAuth2 protocol does not specify the format of the tokens, therefore JWTs can be incorporated into the usage of OAuth2.

For example, the access\_token returned from the OAuth2 Authorization Server could be a JWT carrying additional information in the payload. This could potentially increase performance by reducing round trips for the required information between the Resource Server and the Authorization Server. This is a good use case for incorporating JWT into OAuth2 implementations when transparent tokens are acceptable - there are scenarios requiring token opacity where this is not optimal.

Another common way to use JWT in conjunction with OAuth2 is to issue two tokens: a reference token as access\_token, and a JWT containing identity information in addition to that access token. In use cases where this implementation seems necessary, it is probably worth looking into OpenID Connect - an extension built upon OAuth2 and provides additional standardizations, including having an access\_token and an id\_token.

A common misconception is that using JWT with OAuth2 increases the security of an application, this is not true. As mentioned earlier, JWT is not an inherently secure mechanism, and the security of OAuth2 is upheld through the definitions of the actors involved in the authorization process and the specific steps to be taken for this process in different use cases. Security concerns regarding OAuth2 are best addressed by choosing the appropriate OAuth2 grant flow for the application based on use case, not the token format.

The advantages of using JWT in addition to OAuth2 is in increased performance and decreased process complexity when it comes to certain flows; however, this may increase development complexity. When deciding whether to use JWT on top of OAuth2, it is best to begin by considering whether the performance gain is meaningful to your application, and whether that is worth the additional work required for development.
