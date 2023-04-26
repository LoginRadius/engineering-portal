---
title: "PKCE: What it is and how to use it with OAuth 2.0"
date: "2020-09-03"
author: "Narendra Pareek"
coverImage: "pkce.png"
tags: ["PKCE", "Oauth", "OIDC"]
description: "If you are working with OAuth and OIDC authorization code flow and want to setup PKCE flow then this article will help you to understand everything about PKCE."
---


PKCE is an OAuth 2.0 security extension for public clients on mobile devices intended to avoid a malicious programme creeping into the same computer from intercepting the authorisation code. The [RFC 7636](https://oauth.net/2/pkce/) introduction discusses the mechanisms of such an attack.

PKCE has a different specification of its own. It allows applications to use the most reliable OAuth 2.0 flows in public or untrusted clients - the Authorization Code flow. In order to efficiently use a dynamically generated password, it achieves this by doing some setup work before the flow and some verification at the end of the flow. 

This is important because getting a fixed secret in a public client is not safe.

In this blog, we will see how PKCE is useful in authorization code flow for OAuth and OIDC and how you can use this with your OAuth and OpenID Connect providers.

## What is PKCE

Proof Key for Code Exchange as known as PKCE, is a key for preventing malicious attacks and securely performing code authorization flow.

I would say, PKCE is used to provide one more security layer to the authorization code flow in [OAuth](/oauth2/) and OpenID Connect.

PKCE is mainly useful for the client-side application or any web apps that are using the client secret key and used to replace the static secret used in the authorization flow.

This flow basically works with two parameters **Code Verifier** and **Code challenge**. Let's see what are these parameters, how we use them, and generate them.


### PKCE code verifier and challenge

**The code verifier** is a cryptographically random string using the characters A-Z, a-z, 0-9, and the punctuation characters -._~ (hyphen, period, underscore, and tilde), between 43 and 128 characters long.
Once the client has generated the code verifier, it uses that to create the **code challenge**.

For devices that can perform a SHA256 hash, the code challenge is a BASE64-URL-encoded string of the SHA256 hash of the code verifier.


### Generate code verifier and code challenge

Here you can see the examples to generate the Code verifier and code challenge in different languages. Either you [can find Node](/oAuth-implemenation-using-node/) and [Go Packages](/golang-maps/) for this but I would recommend you to not depend on any package for such small things.


**NodeJs**

```javascript

var crypto = require("crypto")

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
var verifier = base64URLEncode(crypto.randomBytes(32));
console.log("code_verifier: ", verifier)

if(verifier){
    var challenge = base64URLEncode(sha256(verifier));
    console.log("code_challenge: ",challenge)
}


function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

```

**Golang**

```golang

package main
 
import (
    "crypto/sha256"
    "encoding/base64"
    "fmt"
    "math/rand"
    "strings"
    "time"
)
 
type CodeVerifier struct {
    Value string
}
 
const (
    length = 32
)
 
func base64URLEncode(str []byte) string {
    encoded := base64.StdEncoding.EncodeToString(str)
    encoded = strings.Replace(encoded, "+", "-", -1)
    encoded = strings.Replace(encoded, "/", "_", -1)
    encoded = strings.Replace(encoded, "=", "", -1)
    return encoded
}
 
func verifier() (*CodeVerifier, error) {
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    b := make([]byte, length, length)
    for i := 0; i < length; i++ {
        b[i] = byte(r.Intn(255))
    }
    return CreateCodeVerifierFromBytes(b)
}
 
func CreateCodeVerifierFromBytes(b []byte) (*CodeVerifier, error) {
    return &CodeVerifier{
        Value: base64URLEncode(b),
    }, nil
}
 
func (v *CodeVerifier) CodeChallengeS256() string {
    h := sha256.New()
    h.Write([]byte(v.Value))
    return base64URLEncode(h.Sum(nil))
}
 
func main() {
    verifier, _ := verifier()
    fmt.Println("code_verifier: ", verifier.Value)
    challenge := verifier.CodeChallengeS256()
    fmt.Println("code_challenge :", challenge)
}
 
```

## Implement the OAuth 2.0 Authorization Code with PKCE Flow 

### Get the Authorization code
In the OAuth Authorization flow, we need to have the code verifier and code challenge to start with the authentication and obviously an OAuth provider to connect.


 For the initial request, we need to pass the code_challenge and code_challenge_method to the OAuth or OIDC provider that supports PKCE based flow.

The request will look like: 

```
Provider + /oauth/redirect?
client_id={client_id}
&redirect_uri={Callback URL}
&scope={Scope}
&response_type=code
&state={random long string}
&code_challenge={code challenge}
&code_challenge_method=SHA256
```

The provider should redirect you to the authentication/login page and where you’ll get the code after successful authentication.

### Code Exchange 

In the code exchange request, we need to pass the code we have received through the above request and the code verifier that we have generated in our first step.

```
POST Provider + /oauth/access_token

Request body:
{
   client_id:{client_id},
   client_secret:{client_secret},
   redirect_uri:{redirect_uri},
   response_type:token,
   Code:{code} // That we have received in authorization request
   code_verifier: {code verifier // generated in the first step
}
```

Once the code_verificer hash matches with the code_challenge of the authorization request, You will get the token in the response with status code 200 OK.

```
{
    "access_token": "c5a****b-****-4*7f-a********e4a",
    "token_type": "access_token",
    "refresh_token": "5*****82-b***-**82-8c*1-*******7ce",
    "expires_in": 11972
}

```

That's it and you've implemented PKCE flow in your application.