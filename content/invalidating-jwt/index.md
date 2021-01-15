---
title: "Invalidating JSON Web Tokens"
date: "2021-01-15"
coverImage: "unsplash.png"
author: "Nick Chim"
tags: ["JSON Web Tokens", "JWT"]
description: "A discussion on invalidating JSON Web Tokens."
---

## Invalidating JSON Web Tokens

As we all know, JSON Web Tokens are a way of sending information between parties in a way where the sender's authenticity can be verified. It is essentially a JSON object with a signature. Using this signature, services that issue these tokens can verify that they are the ones who issued this token and thus can trust the claims which are contained within. 

The trustworthiness of these tokens make them popular for use in authorization and authentication scenarios:

* In authorization workflows, JSON Web Tokens are distributed to users with claims containing the resources and services that are allowed for that user. The issuing service can perform its database lookups to determine the user's authorization levels when the token is being generated and issued. Since the signature can be used to verify that the token is authentic and issued by a trusted source, for subsequent transactions using the token, the service can safely take the token at its word. This saves the service from needing to check its database for the user's relevant permissions every time a transaction is performed.
* In authentication workflows such as OAuth2, JSON Web Tokens are often used as part of a larger workflow, where they are useful to securely transmit information between parties. Since the resource server and authenticating server are different, these tokens ensure that the information being received by these parties is valid and authentic.

For this post, we'll be focusing on the former use case. So having a token with trustworthy claims is great; we can take the token at its word, and trust all of the information that it has contained within as gospel. Our server is unburdened from having to potentially make database calls to verify the user's role, their permissions, their existence, or even if they're logged in. Once the server has generated the token, as far as it is concerned, no state has to be maintained regarding the validity of the token. It will expire once its expiration time included in its claim has passed.

But before we go ahead and use this for all of our authorization needs, we have to remember that while JSON Web Tokens themselves are stateless, to have a robust, feasible, and controllable authorization workflow, we'll have to maintain some state one way or another.

You can think of an authorization token as an elementary school hall pass. The teacher (resource server) knows that it is a legitimate hall pass because it is green, 6 cm x 12 cm and has a signature from another member of the faculty. Now imagine that you've issued a hall pass, but now you need to take it back (you've changed your mind, or the kid did something bad). Your options are:

* Go to the kid and take the pass back (browser deletes the token from its storage). However, the kid made a photocopy, and can still roam the halls with relative ease.
* Wait till the hall pass expires (wait till the token expiry claim passes). Green hall passes are only valid on Mondays. He can still roam the halls freely for the remainder of Monday (the horror).
* Change the entire format of the hall pass (change the secret used to sign the token). The crisis has been averted, but now you'll need to handicraft another 5 whole hall passes for the class.

Other than the 3rd option which may or may not be feasible depending on your use case (most likely not), we can see that it is not possible to reliably remove or revoke a token without maintaining state. The solutions that I've looked up on Stack Overflow for invalidating these tokens boil down to relying on some form of state, one way or another. Don't get me wrong however, this is not a bad thing in my opinion. Using JSON Web Tokens can and do allow us to minimize the state that we do have to maintain, with minimal added complexity.

So let's look at some ways that we can couple state and JSON Web Tokens that allow us to invalidate these tokens effectively.

### Token Whitelist

We can maintain a database table containing all of the tokens issued by our server that we would like to accept as valid. This would be a 1:1 session store, with every transaction occurring requiring this table to be checked to prevent an invalidated token from being accepted. While we would not be able to reduce the amount of state being maintained on our server, JSON Web Tokens still provide us with the utility of its trusted claims (and the performance benefits of not needing to check those).

### Token Blacklist

We can maintain a database table containing all of the tokens issued by our server that we do NOT want to accept as valid. Every transaction that occurs will require this table to be checked, to prevent an invalidated token from being accepted. Each record would only have to be maintained until the token itself expires. I can't think of any use case where a table of invalidated tokens would regularly be larger than a table of active tokens, so I'd imagine that the table maintained would almost always be smaller than maintaining a table of active tokens.

### Using a Dynamic Secret to Sign

This solution still needs a database lookup, but interestingly requires no state. For this, we can use the hash of a piece of data to sign the token itself. For example, by using the hash of a user's password, when the user changes their password, subsequent transactions involving an old token will fail, as the signature will fail to be verified. The effectiveness of this, however, would depend on your requirements, as this would be limited to invalidating tokens based on changing data (such as changing roles, passwords, etc.). It would not allow you to invalidate a token whenever you want.

### Concluding Remarks

I think that JSON Web Tokens coupled with a token blacklist is a fantastic way to manage authorization in web applications. This allows you to leverage the benefits of these tokens in reducing the network calls needed to secure your application, reduce the amount of data you need to store to manage sessions, and do so in a reliable way without introducing too much complexity.