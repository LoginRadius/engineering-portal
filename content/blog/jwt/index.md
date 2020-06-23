---
title: "JSON Web Token"
date: "2018-07-11"
coverImage: "jwt.png"
author: "Mayank Agarwal"
tags: ["JWT", "JSON Web Token"]
---

_A JSON Web Token (JWT) is a JSON object that is defined in_ [_RFC 7519_](https://tools.ietf.org/html/rfc7519) _as a safe way_ of _transmitting information between two parties. Information in the JWT is digitally-signed, so that it can be verified and trusted._

**JWT Properties**

- Less verbose -  JWT is compact in size and can be passed in the URL, POST parameter, or HTTP header.
- Self-contained - JWT carries all of information needed for exchanging information and authentication.
- Versatile - JWT works in .NET, Python, Node.js, Java, PHP, Ruby, Go, JavaScript, and Haskell.

**JWT Use Cases**

- Information Exchange - JWT can be used between two parties to exchange information. JWT is digitally-signed and can be used in a secure public/private key pair. Information is verified using the public key on the other end.
- Authentication - JWT can contain user information in the payload and can be used in the session to authenticate the user. Once authenticated, users can access protected resources in an application using the JWT included in the request. So, every request will be authenticated by verifying the JWT.

JWT contains three parts: Header, Payload, and Signature which are separated by a dot.

`Header.Payload.Signature`

**Header**

The JWT Header consists of 2 parts:

- The token type (typ): JWT 
- Algorithm used to sign the token (alg)

```json 
{  
 "typ" : "JWT",  
 "alg" : "HS256"  
}
```

Header Algorithm Types:

- Symmetric Algorithms - This algorithm type uses a single secret key to both sign and verify the JWT token. For example: HMAC algorithms.
- Asymmetric Algorithms - This algorithm type uses a private key to sign the token and a public key to verify the signature. For example: RSA and ECDSA algorithms.

**alg Value**

**Digital Signature or MAC Algorithm**

| Algo  | Description                       |
| ----- |:---------------------------------:|
| HS256 | HMAC using SHA-256 hash algorithm |
| HS384 | HMAC using SHA-384 hash algorithm | 
| HS512 | HMAC using SHA-512 hash algorithm | 
| RS256 | RSASSA using SHA-256 hash algorithm | 
| RS384 | RSASSA using SHA-384 hash algorithm | 
| RS512 | RSASSA using SHA-512 hash algorithm | 
| ES256 | ECDSA using P-256 curve and SHA-256 hash algorithm | 
| ES384 | ECDSA using P-384 curve and SHA-384 hash algorithm | 
ES512 | ECDSA using P-521 curve and SHA-512 hash algorithm

The Base64Url-encoded Header**,** which is first part of our JWT, looks like the following:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

**Payload**

The Payload, also known as the JWT claim, contains all of the information we want to transmit.

Different types of claims can be used to build the Payload:

- **Registered Claim** -  These claims are optional but recommended as they contain some metadata about the token:


| Code  | Name   |Description                       |
| ----- | ------ |:--------------------------------:|
| iss   | issuer |Identifies the principal that issued the JWT.                       |
| sub  | subject   |Identifies the principal that is the subject of the JWT.                       |
| aud  | audience   |Identifies the recipients that the JWT is intended for.                       |
| exp  | Expiration time   | Identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.                       |
| nbf  | Not before   |Identifies the time before which the JWT MUST NOT be accepted for processing.                       |
| iat  | Issue at   |Identifies the time at which the JWT was issued.  |
| jti  | JWT id   |Unique identifier for the JWT, can be used to prevent the JWT from being replayed.                       |

- **Public Claim** - These claims are defined by you, such as user name, and other important information.
- **Private Claim** - A producer and consumer may agree to use claim names that are private. These are subject to collision, so use them with caution.

Example Payload:

```json
{  
 "sub": "1234567890",  
 "name": "Frank Emic",  
 "jti": "4b5fcea6-2a5e-4a9d-97f2-3d8631ea2c5a",  
 "iat": 1521191902,  
 "exp": 1521195630  
}
```

This example contains a combination of registered and public claims. “sub”,”jti”,”iat”, and “exp” are registered claims and “name” is a public claim.

The Base64Url-encoded Payload, which is the second part of our JWT, looks like the following:

```json
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZyYW5rIEVtaWMiL  
CJqdGkiOiI0YjVmY2VhNi0yYTVlLTRhOWQtOTdmMi0zZDg2MzFlYTJjNWEiLCJpYXQiOjE1MjExOTE5MDIsImV4cCI6MTUyMTE5NTYzMH0
```

**Signature**

The final part of our JWT is the Signature. To create the Signature, we need 3 components:

- Header
- Payload
- Algorithm used to sign the Header and Payload

var encodedString = base64UrlEncode(header) + "." + base64UrlEncode(payload);  
HMACSHA256(encodedString, 'secret');

The secret is the Signature held by the server in order to verify tokens and sign new ones.

The above Base64Url-encoded Header and Payload are combined with a dot, and then digitally-signed using the secret. This generates the Signature as the third part of the our JWT:

wGDoDSxfKj3Ns379NVxocwM9TOiwxhxWl

**Putting It All Together**

```json
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZyYW5rIEVtaWMiL  
CJqdGkiOiI0YjVmY2VhNi0yYTVlLTRhOWQtOTdmMi0zZDg2MzFlYTJjNWEiLCJpYXQiOjE1MjExOTE5MDIsImV4cCI6MTUyMTE5NTYzMH0.wGDoDSxfKj3Ns379NVxocwM9TOiwxhxWl
```

This is our final JWT, containing the Header, Payload, and Signature joined together with dots. It can be passed as a URL parameter, a POST parameter, or in the  HTTP header to authenticate or exchange information.

You can play around with JWT using our [JWT SSO Tool.](https://jwt.ssotools.com/)

Note: JWT does not hide information; it just encodes information using the digitally-signed signature and verifies that the information has not been altered over the network. So, do not add any sensitive information in the JWT claim.

**Conclusion**

JWT comprises three encoded parts: Header, Payload, and Signature. It can be passed as a URL or POST parameter, or in an HTTP header. Due to JWT's lightweight, self-containing, and versatile strucutre, it remains a popular tool for information exchange and authentication.
