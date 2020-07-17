---
title: How to create and validate JSON Web Tokens in Deno
date: "2020-07-10"
coverImage: "deno_jwt.png"
author: "Puneet Singh"
tags: ["Deno","JWT", "JSON Web Token"]
---

In this blog, we’ll see how to create and validate a JWT(JSON Web Token) in Deno. For this, we’ll be using [djwt](https://github.com/timonson/djwt), the absolute minimum library to make JSON Web Tokens in deno and [Oak framework](https://deno.land/x/oak)

## Before You Get Started
This tutorial assumes you have:

*   A basic understanding of JavaScript and Deno
*   Latest Deno version installed on your system

### What is JWT?

JSON Web Token is an internet standard used to create tokens for an application. These tokens hold JSON data and are cryptographically signed. 

Here is how a sample Json Web Token looks like

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9sYXR1bmRlZ2FydWJhQGdtYWlsLmNvbSIsIm
```
JWT is a good way of securely sending information between parties. Because JWTs can be signed—for, you can be sure the senders are who they say they are. And, as the signature is generated using the header and the payload, you can also verify that the content hasn't been tampered with.

JWT can contain user information in the payload and also can be used in the session to authenticate the user. 

If you want to know more about JSON Web Token, We have a very good [article](https://www.loginradius.com/engineering/blog/jwt/) about it.

### How to generate JWT token in Deno

First, let's set up a Deno server to accept requests, for it, we are using [Oak framework](https://deno.land/x/oak), it is quite simple and few lines of codes as you can see below.


```TS
// index.ts
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "JWT Example!";
  })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
```

Once our program is ready for accepting request lets import djwt functions to generate JWT token, In below code we can use a secret key, expiry time for JWT token in 1 hour from the time program will run and we are using HS256 algorithm.

Add the below code in index.ts and update the router as shown below, you can now get a brand new token on `http://localhost:8000/generate`

```TS
// index.ts
...

import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts";

const key = "secret-key";
const payload: Payload = {
  iss: "Jon Doe",
  exp: setExpiration(new Date().getTime() + 60000),
};
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};


const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "JWT Example!";
  })
  .get("/generate", (context) => {
    context.response.body = makeJwt({ header, payload, key }) + "\n";
  })

...
```


### Validating a JWT token
Once you get a JWT token you can validate the token by `validateJwt` function in djwt, let us import the validateJwt and add one more route `/validate/:token`

Now you can verify any token by passing it to a route like - `http://localhost:8000/validate/jwt_token` (jwt_token is a placeholder, please replace it with a real JWT token)
```TS

// index.ts
...

import { validateJwt } from "https://deno.land/x/djwt/validate.ts";

...

router
  .get("/", (context) => {
    context.response.body = "JWT Example!";
  })
  .get("/generate", (context) => {
    context.response.body = makeJwt({ header, payload, key }) + "\n";
  })
  .get("/validate/:token", async (context) => {
    if ( context.params && context.params.token && (await validateJwt(context.params.token, key)).isValid) {
      context.response.body = "Valid JWT\n";
    } else {
      context.response.body = "Invalid JWT\n";
    }
  });

...

```

Now you know how to generate and verify a JWT token in Deno, you can easily use it in your application, The complete source code used in this blog can be found in this [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/Deno/JWTAuthentication)