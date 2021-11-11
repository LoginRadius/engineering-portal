---
title: "What are JWT, JWS, JWE, JWK, and JWA?"
date: "2021-11-12"
coverImage: "coverImage.png"
author: "Yashesvinee V"
tags: ["JSON", "Encryption"]
description: "Learn about the JOSE framework and its specifications, including JSON Web Token (JWT), JSON Web Signature (JWS), JSON Web Encryption (JWE), JSON Web Key (JWK), and JSON Web Algorithms (JWA). For easier reference, bookmark this article."
---

JSON (JavaScript Object Notation) is a text-based, language-independent format that is easily understandable by humans and machines. 

JOSE (Javascript Object Signing and Encryption) is a framework that is used to facilitate secure transfer of claims between any two parties. Its specifications provide a general approach to encryption of any content, not necessarily in JSON. However, it is built on JSON for easy use in web applications. Let's explore some of these specifications.

## JWT — JSON Web Token
[JWT](https://www.loginradius.com/blog/async/guest-post/jwt-authentication-best-practices-and-when-to-use/) is a standard mechanism used for authentication. It is compact and URL-safe to represent the claims to be transferred between two parties. Claims are a set of key/value pairs that provide a target system with information about a client to apply an appropriate level of access control to its resources. Claim names could be Registered (IANA), Public, or Private. Some registered claim names are:
- "iss": Issuer claim — identifies the issuer of the claim
- "sub": Subject claim — identifying the subject of a claim
- "jti": JWT ID — Uniquely identify a claim

### Structure
JWT is mainly composed of three parts: header, payload, and signature that are Base64 URL-encoded.

- The header is used to identify the algorithm used to generate a signature.
- The payload consists of the claims and signature (secret key) used to validate the token.
- The structure of sending the information could be Serialized or Deserialized. In the Serialized form, JWT is represented as a string containing the header, payload, and signature separated by dots.

```
[header].[payload].[signature]
```

Here's a simple JWT example.

JSON Web Token:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o`

```
header:                                             
{
  "alg" : "HS256",                      Header
                            --------------------------------->  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  "typ" : "JWT"
}

Payload:
{
  "id" : 123456789,                     Payload
                            --------------------------------->  eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0
  "name" : "Joseph"
}
                                                Signature
OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o  ---------------->  OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o

```

This shows the decoded JSON Web Token. In the deserialized form, JWT contains only the header and the payload as plain JSON objects.

JWT is implemented using JWS or JWE. Learn more about JWT [here](https://jwt.io/)

## JWS — JSON Web Signature
JWS is used to represent content secured with digital signatures or Hash-based Message Authentication Codes (HMACs) with the help of JSON data structures. It cryptographically secures a JWS Header and JWS Payload with a JWS Signature. The encoded strings of these three are concatenated using dots similar to JWT. The identifiers and algorithms used are specified in the JSON Web Algorithms specification.

The JWS Header MUST contain an alg parameter, as it uses the algorithm to encode the JWS Header and the JWS Payload to produce the JWS Signature. Some of the commonly used algorithms to sign the JWS Header and Payload are:
- HMAC using SHA-256 or SHA-512 hash algorithms (HS256, HS512)
- RSA using SHA-256 or SHA-512 hash algorithms (RS256, RS512)

JWS example:

```
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9 ----------------> JWS Header

eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ --------------> JWS Payload
```

It has an Encoded JWS Header followed by an Encoded JWS Payload separated by a '.'. This is the JWS Signing input which, on signing with the HMAC SHA-256 algorithm and base64url encoding, gives the Encoded JWS Signature value:

```
dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

On concatenation:

```
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

Learn more about JWS [here](https://openid.net/specs/draft-jones-json-web-signature-04.html)

## JWE — JSON Web Encryption
JSON Web Encryption enables encrypting a token so that only the intended recipient can read it. It standardizes the way to represent the encoded data in a JSON data structure. Representation of the encrypted payload may by JWE compact serialization or JWE JSON serialization.

### Structure
The JWE compact serialization form has five main components: 

1. JOSE header
2. JWE Encrypted Key
3. JWE initialization vector
4. JWE Ciphertext
5. JWE Authentication Tag

All these components are base64url-encoded and are concatenated using dots ' . ' .

- The JOSE Header being the first element of the token, is the same as the headers of the previously mentioned JWT and JWS. 
  
  JWE has additional elements to the Header — `enc` and `zip`. `enc` defines the *content encryption algorithm* while the `alg` element defines the encryption algorithm for the *Content Encryption Key (CEK)*. `zip` provides a compression algorithm if token compression is needed.
- During the encryption process, the issuer generates a random key, which is 256-bits in size, that is used to encrypt the message. This is placed in the JWE Encrypted key section.
- Some encryption algorithms require an initialization vector, which is a randomly generated number that is used along with a secret key to encrypt data. This prevents repeated encryption of the same data using the same secret key. The recipient requires this initialization vector to decrypt the message, and hence, is placed in the JWE token.
- The fourth section of the token is the JWE ciphertext that is computed by encrypting the plaintext JSON payload. It uses the algorithm mentioned in the header's `enc` element.
- The JWE Authentication tag is the last part of the JWE Token that is generated along with the ciphertext. It ensures the integrity of the ciphertext.

```
 "header":
{
    "alg" : "RSA-OAEP",                --------------------> For content encryption key
    
    "enc" : "A256GCM"                  --------------------> For content encryption algorithm
},

 "encrypted_key" : "qtF60gW8O8cXKiYyDsBPX8OL0GQfhOxwGWUmYtHOds7FJWTNoSFnv5E6A_Bgn_2W"


"iv" : "HRhA5nn8HLsvYf8F-BzQew",       --------------------> initialization vector

"ciphertext" : "ai5j5Kk43skqPLwR0Cu1ZIyWOTUpLFKCN5cuZzxHdp0eXQjYLGpj8jYvU8yTu9rwZQeN9EY0_81hQHXEzMQgfCsRm0HXjcEwXInywYcVLUls8Yik",

"tag" : "thh69dp0Pz73kycQ"             --------------------> Authentication tag
}
```

Learn more about JWE [here](https://tools.ietf.org/id/draft-jones-json-web-encryption-02.html)

## JWK — JSON Web Key

JWK is a JSON structure that represents a set of public keys as a JSON object using the Elliptic Curve or RSA algorithms. Public key representations can help verify the signature with the corresponding private key.

### Structure
JWK consists of a JWK Container Object and an array of JWK Key Objects.
- The JWK Container Object is a JSON Object that contains a specific member that is an array. This member is a required element in the Container Object.
- The JWK Key Objects are stored within the array of the JWK Container object. They have a set of members that is common to all key types. As mentioned before, JWK Key objects can use Elliptic Curve or RSA algorithms. In order to do so, the `alg` field must hold `EC` or `RSA`, respectively. Here is an example of a JWK using RSA:

```
{
"alg":"RSA",

"mod": "0vx7agoebGcQSuuPiLJXZptN9nndrQmbXEps2aiAFbWhM78LhWx4cbbfAAtVT86zwu1RK7aPFFxuhDR1L6tSoc_BJECPebWKRXjBZCiFV4n3oknjhMs
tn64tZ_2W-5JsGY4Hc5n9yBXArwl93lqt7_RN5w6Cf0h4QyQ5v-65YGjQR0_FDW2QvzqY368QQMicAtaSqzs8KJZgnYb9c7d0zgdAZHzu6qMQvRL5hajrn1n91CbOpbI
SD08qNLyrdkt-bFTWhAI4vMQFh6WeZu0fM4lFd2NcRwr3XPksINHaQ-G_xBniIqbw0Ls1jF44-csFCur-kEgU8awapJzKnqDKgw",

"exp":"AQAB",

"kid":"2011-04-29"
}
```
It provides a Key ID for matching.

## JWA — JSON Web Algorithms
The JWA specification focuses mainly on enumerating the algorithms necessary for JWS, JWK AND JWE. It also describes the operations that are specific to these algorithms and key types.

**Algorithms for JWS:** These algorithms are used to sign the contents of the JWS Header and the JWS Payload

<figure>
  <img src="JWS_algo.png" alt="JWS algorithms" align="center">
  <figcaption align="center">Source: <a href="https://tools.ietf.org/id/draft-ietf-jose-json-web-algorithms-10.html">ietf-jose-json-web-algorithms</a> </figcaption>
</figure>

**Algorithms for JWE** These algorithms encrypt the Content Encryption Key (CEK) and produce the JWE Encrypted Key

<figure>
  <img src="JWE_algo.png" alt="JWE algorithms" align="center">
  <figcaption align="center">Source: <a href="https://tools.ietf.org/id/draft-ietf-jose-json-web-algorithms-10.html">ietf-jose-json-web-algorithms</a> </figcaption>
</figure>

**Algorithms for JWK:** JWA specifies a set of algorithm families to be used for the public keys represented by JWK

<figure>
  <img src="JWK_algo.png" align="center">
  <figcaption align="center">Source: <a href="https://tools.ietf.org/id/draft-ietf-jose-json-web-algorithms-10.html">ietf-jose-json-web-algorithms</a> </figcaption>
</figure>


Learn more about JWA [here](https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-web-algorithms-40).

## Conclusion
The IETF JSON Object Signing and Encryption (JOSE) working group was chartered to develop a secure object format based on JSON and to simplify the addition of object-based security features to Internet applications. 

The basic requirements for these object formats are confidentiality and integrity mechanisms encoded in JSON. JWT, JWS, JWE, JWK, and JWA are the JOSE working group items intended to describe these object formats.

The JOSE specifications have many use cases and are sought out for integrity protection, encryption, security tokens, OAuth, web cryptography, etc. Check out [this site](https://datatracker.ietf.org/doc/rfc7165/) to know more about JOSE use cases.

Want to learn how to use JWT for authentication in your apps? Check out this informational [JWT authentication guide](https://www.loginradius.com/blog/async/guest-post/jwt-authentication-best-practices-and-when-to-use/).

**References:**
- [https://tools.ietf.org/](https://tools.ietf.org/)
- [https://openid.net/](https://openid.net/)

