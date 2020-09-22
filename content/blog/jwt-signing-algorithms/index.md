---
title: "JWT Signing Algorithms"
date: "2020-09-21"
coverImage: "unsplash.png"
author: "Nick Chim"
tags: ["JWT", "JSON Web Tokens"]
description: "Deciding between which signing algorithm to use."
---

JWT Signing Algorithms
===

When JSON Web Tokens are created, they are typically signed by its issuer. This allows the recipient of the token to validate that the token received contains all of the information encoded by the issuer unmodified and as intended.

A signature is not to be mistaken for encryption! The fact that a JSON token is signed does not mean that the data enclosed is unreadable by third parties. All a signature does is ensure that the message is authentic, which it achieves by allowing the recipient to compare the data they’ve received with a trusted claim included in the data (the signature).

JWTs are most commonly signed using one of two algorithms: HS256 (HMAC using SHA256), and RS256 (RSA using SHA256).


How does a signature ensure authenticity?
---

A signature can only be created by someone possessing a secret key, and the original payload. Signatures are generally formed by combining the data to be signed with a secret key, either by appending them together and hashing them (HS256), or by encrypting a representation of that data (a hash) using the secret key (RS256).

In both signing algorithms, the data is formatted into an immutable representation in a way that a recipient can check that the creator of the signature was in possession of that particular secret key.


HS256
---

HS256 is a symmetric signing method. This means that the same secret key is used to both create and verify the signature.

The issuer appends the JWT header and payload with the secret key, and hashes the result using SHA256, creating a signature. The recipient uses their copies of the secret key, JWT header and payload in the same way to reproduce the signature, checking to see if they match.

Aside from some incredibly unlikely scenarios, the only way for these signatures to be consistent is if the JWT header, payload and secret shared between the two parties are identical.


RS256
---

RS256 is an asymmetric encryption method. This differs from a symmetric scheme in that rather than using a single secret key, a pair of seperate keys are used to encrypt and decrypt the data.

The issuer generates a hash of the JWT header and payload using SHA256, and encrypts it using the RSA encryption algorithm, and their private key. The recipient uses their public key to decrypt the signature ciphertext, and then compares it to a hash they’ve reproduced using their copy of the JWT header and payload, checking for consistency.

The only way that these resulting hashes are consistent is if the JWT header and payload shared between the two parties are identical, and the public key corresponds to the private key used to encrypt the hash.


When to use which?
---

Both signing schemes are effectively secure, with HS256 being a little faster. However, given this use case, the difference in speed is not particularly relevant.

The main consideration on which to use, is in my opinion the symmetric vs asymmetric property of each:

-   For HS256, the secret must be shared between the sender and recipient.
    
-   For RS256, the private key can be kept secret, and the public key can be freely issued.
    
-   In both cases, it confirms to the recipient that the message was sent by the expected party, and was received in the form that it was in when the signature was generated.

Having an unsecured publicly available key is useful in many cases. For example, it can be published openly on the internet as part of a metadata endpoint, allowing JWT configurators to automatically retrieve the key, making for a straightforward and automatic JWT setup. As such, RS256 may be more suitable for situations where data is exchanged between two independent parties.

Having a shared secret key can however also be useful in some cases. For example, if the issuer and recipient were both managed by a single party, the two applications would be able to share configurations without having to manage two separate keys. As such, HS256 may be more suitable for situations where data is exchanged within a single party
