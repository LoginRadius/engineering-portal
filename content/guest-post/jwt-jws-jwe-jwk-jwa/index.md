---
title: JWT, JWS, JWE, JWK, and JWA
date: "2021-10-31"
coverImage: "coverImage.png"
author: "Yashesvinee V"
tags: ["JSON", "Encryption"]
description: "What are JWT, JWS, JWE, JWK, and JWA?"
---

JSON (JavaScript Object Notation) is a text-based, language-independent format that is easily understandable by humans and machines. JOSE or Javascript Object Signing and Encryption is a framework that is used to facilitate secure transfer of claims between any two parties. It's specifications provide a general approach to encryption of any content, not necessarily in JSON. However, it is built on JSON for easy use in web applications. Let's explore some of these specifications.

## JWT - JSON WEB TOKEN
JWT is a standard mechanism used for authentication. It is compact and URL-safe to represent the claims to be transferred between two parties. Claims are a set of key/value pairs that provide a target system with information about a client to apply appropriate level of access control to its resources . Claim names could be Registered (IANA), Public or Private. Some registered claim names are:
- "iss": Issuer claim- identifies the issuer of the claim
- "sub": Subject claim- identifying subject of a claim
- "jti": JWT ID - Uniquely identify a claim

### Structure:
JWT is mainly composed of three parts: the header, payload and signature that are Base64 URL-encoded. The header is used to identify the algorithm used to generate a signature, and the payload consists of the claims and signature(secret key) used to validate the token. The structure of sending the information could be Serialized or Deserialized. In the Serialized form, JWT is represented as a string containing the header, payload and signature separated by dots.
```
[header].[payload].[signature]
```
Here's a simple JWT example .

JSON Web Token:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o

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
This shows the decoded JSON web Token. In the deserialized form  JWT contains only the header and the payload as plain JSON objects. JWT is implemented using JWS or JWE.

Learn more about JWT [here](https://jwt.io/)

## JWS - JSON WEB SIGNATURE 
JWS is used to represent content secured with digital signatures or Hash-based Message Authentication Codes (HMACs) with the help of JSON data structures. It cryptographically secures a JWS Header and JWS Payload with a JWS Signature. The encoded strings of these three are concatenated using dots similar to JWT The identifiers and algorithms used are specified in the JSON Web Algorithms specification.

The JWS Header MUST contain an alg parameter, as it uses the algorithm to encode the JWS Header and the JWS Payload to produce the JWS Signature. Some of the commonly used algorithms to sign the JWS Header and Payload are:
- HMAC using SHA-256 or SHA-512 hash algorithms (HS256, HS512)
- RSA using SHA-256 or SHA-512 hash algorithms (RS256, RS512)

JWS example:

eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9 ----------------> JWS Header

eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ --------------> JWS Payload

We have an Encoded JWS Header followed by an Encoded JWS Payload separated by a '.'. This is the JWS Signing input which on signing with the HMAC SHA-256 algorithm and base64url encoding gives the Encoded JWS Signature value:

dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk

On concatenation:
eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk

Learn more about JWS [here](https://openid.net/specs/draft-jones-json-web-signature-04.html)

## JWE - JSON WEB ENCRYPTION
JSON Web Encryption enables us to encrypt a token so that only the intended recipient can read it. It standardizes the way to represent the encoded data in a JSON data structure. Representation of the encrypted payload may by JWE compact serialization or JWE JSON serialization.

### Structure
The  JWE compact serialization form has 5 main components: the JOSE header, JWE Encrypted Key, JWE initialization vector, JWE Ciphertext and JWE Authentication Tag. All these components are base64url-encoded and are concatenated using dots ' . ' .

- The JOSE Header being the first element of the token is same as the headers of the previously mentioned JWT and JWS. JWE has additional elements to the Header - 'enc' and 'zip'. The 'enc' defines the *content encryption algorithm* while the 'alg' element defines the encryption algorithm for the *Content Encryption Key (CEK)*. 'zip' provides a compression algorithm if token compression is needed.
- During the encryption process, a random key is generated by the issuer, which is 256 bits in size that is used to encrypt the message. This is placed in the JWE Encrypted key section.
- Some encryption algorithms require an initialization vector which is a randomly generated number that is used along with a secret key to encrypt data. This prevents repeated encryption of the same data using the same secret key. The recepeint requires this initialization vector to decrypt the message and hence, is placed in the JWE token.
- The fourth section of the token is the JWE ciphertext that is computed by encrypting the plaintext JSON payload. It uses the algorithm mentioned in the header's 'enc' element.
- The JWE Authentication tag is the last part fo the JWE Token that is generated along with the ciphertext. It ensures the integreity of the ciphertext.

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

## JWK - JSON WEB KEY

JWK is a JSON structure that represents a set of public keys as a JSON object using the Elliptic Curve or RSA algorithms. Public key representations can help verify the signature with the corresponding private key.

### Structure
JWK consists of a JWK Container Object and an array of JWK Key Objects.
- The JWK Container Object is a JSON Object that contains a specific member that is an array. This member is a required element in the Container Object.
- The JWK Key Objects are stored within the array of the JWK Contatiner object. They have a set of members that is common to all key types. As mentioned before JWK Key objects can use Elliptic Curve or RSA algorithms. In order to do so, the 'alg' field must hold 'EC' or 'RSA' respectively. Here is an example of a JWK using RSA:
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

## JWA - JSON WEB ALGORITHMS
The JWA specification focuses mainly on enumerating the algorithms necessary for JWS, JWK AND JWE. It also describes the operations that are specific to these algorithms and key types.
- Algorithms for JWS: These algorithms are used to sign the contents of the JWS Header and the JWS Payload

<img src="JWS_algo.png" align="center">

- Algorithms for JWE: These algorithms encrypt the Content Encryption Key (CEK) and and produce the JWE Encrypted Key

<img src="JWE_algo.png" align="center">

- Algorithms for JWK: JWA specifies a set of algorithm families to be used for the public keys represented by JWK

<img src="JWK_algo.png" align="center">

Learn more about JWA [here](https://datatracker.ietf.org/doc/html/draft-ietf-jose-json-web-algorithms-40)

Reference: 
- [https://tools.ietf.org/](https://tools.ietf.org/)
- [https://openid.net/](https://openid.net/)





