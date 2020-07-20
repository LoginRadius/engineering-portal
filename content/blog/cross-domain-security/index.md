---
title: "Every web developer should know about cross-domain security"
date: "2020-07-20"
coverImage: "cross-domain-security.png"
author: "Abhimanyu Singh Rathore"
tags: ["Security", "Cross-Domain"]
description: "Cross-domain security is a comprehensive approach to defend against both known and unknown threats to data connections at the boundaries of sensitive or classified networks and enclaves"
---

Cross-domain security involves more than just focusing on an appliance or implementing a data diode with no additional security enforcement. It is a comprehensive approach to defend against both known and unknown threats to data connections at the boundaries of sensitive or classified networks and enclaves.

## The Major Concepts of Security

- 100% Security doesn’t exists.

There is no way of being 100% protected from being hacked. If anyone ever tells you that, they are wrong.

- Single layer of protection isn’t enough.

You can’t just say…

>*Oh, because I have CSP implemented, I am safe. I can cross off cross-site scripting from my vulnerabilities list because that can’t happen now.*

Maybe that is a given to some, but it is easy to find yourself thinking in this manner. I think one reason that programmers can easily find themselves thinking this way is that so much of coding is black and white, 0 or 1, true or false. Security is not so simple.

We’ll start with one that everyone runs into fairly early on in their web development journey. And then you look on StackOverflow and find a bunch of answers telling you how to bypass it.

## Cross-Origin Resource Sharing (CORS)

Have you ever gotten an error that looked like this?

> No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.

You are certainly not alone. And then you Google it, and someone tells you to get this extension that will make all your problems go away!

>  *Awesome, right?*

**CORS is there to protect you, not to hurt you!**

To explain how CORS helps you, let’s first talk about cookies, specifically **authentication cookies**. Authentication cookies are used to tell a server that you are logged in, and they are automatically sent with any request you make to that server.
>  Let’s say you’re logged in to Facebook, and they use authentication cookies. You click on bit.ly/r43nugi which redirects you to http://www.cryptoearn.co/. A script within http://www.cryptoearn.co/ makes a client-side request to facebook.com which sends your authentication cookie!

In a no-CORS world, they could make changes to your account without you even knowing. Until, of course, they post bit.ly/r43nugi on your timeline, and all of your friends click on it, and then the cycle continues in an evil breadth-first scheme that conquers all of Facebook’s users, and the world is consumed by http://www.cryptoearn.co/. ?

In a CORS world, however, Facebook would only allow requests with the origin of facebook.com to edit data on their server. In other words, they would limit cross-origin resource sharing. You might then ask…
>  *Well can http://www.cryptoearn.co/ just change the origin header on their request, so that it looks like it is coming from *facebook.com*?*

They can try, but it won’t work because the browser will just ignore it and use the real origin.
>  *Ok, but what if http://www.cryptoearn.co/ made the request server-side?*

In this case, they could bypass CORS, but they will not win because they won’t be able to send your authentication cookie along for the ride. The script would need to execute on the client-side to get access to your client-side cookies.

### What is a Security Policy?
>  Servers are used to host web pages, applications, images, fonts, and much more. When you use a web browser, you are likely attempting to access a distinct website (hosted on a server). Websites often request these hosted resources from different locations (servers) on the Internet. Security policies on servers mitigate the risks associated with requesting assets hosted on different servers. Let’s take a look at an example of a security policy: *same-origin*.
>  The **same-origin **policy is very restrictive. Under this policy, a document (i.e., like a web page) hosted on server A can only interact with other documents that are also on server A. In short, the same-origin policy enforces that documents that interact with each other have the same *origin*.

**Just a few things that could come to your mind**

*I have never heard of a server trying to restrict access from alien webpages.*

The Same Origin Policy is a restriction imposed by browsers, not servers.

CORS is the server telling the browser that it can relax its normal security because the data doesn’t need that level of protection.

*Even if server wanted to restrict connections from other domains, it’s impossible to do this using capability of the HTTP protocol.*

Which is why HTTP the protocol isn’t used for that.

*I suggest using tokens for that.*

Using a nonce to protect against CSRF solves a different problem.

It’s a relatively expensive solution that you only need to get out when it is the side effects of the request that can be problematic (e.g. “Post a new comment”) rather then the data being passed back to JavaScript running on another site.

You couldn’t use them instead of the Same Origin Policy to protect against reading data across origins because (without the Same Origin Policy) the attacking site would be able to read the token.

*What’s the use of blocking XMLHttpRequests while you still can use jsonp?*

You can’t use JSONP unless the server provides the data in JSONP.

Providing the data in JSONP and using CORS to grant permission to access resources are two different ways that the server can allow the browser to access data that is normally protected by the Same Origin Policy.

JSONP was a hack. CORS came later and is more flexible (since it can allow access to any kind of data, respond to request methods other than GET, and allow custom HTTP headers to be added).

*Can you explain why is this done that way?*

The default policy is “No Access” since there is no way for the browser to know if the data being requested is public or not.

**Consider this situation:**

Alice has an account on Bob’s website. That account is password protected and has information that should be kept secret between Alice and Bob (bank records or exam results, for example).

Mallory has another website. It uses Ajax to try to access Bob’s site.

Without the Same Origin Policy, Alice might (while logged in to Bob’s site) visit Mallory’s website. Without Alice’s knowledge or permission, Mallory’s website sends JavaScript to Alice’s browser that uses Ajax to fetch data from Bob’s site. Since it is coming from Alice’s browser, all of Alice’s private information is given to the JavaScript. The JavaScript then sends it to Mallory.

This is not a good thing.

The Same Origin Policy prevents that.

If Bob, as the person running the site, decides that the information is not secret and can be shared publicly, then he can use CORS or JSONP to provide access to it to JavaScript running on other sites.

*Do you know a way to prevent any cross-domain request from a webpage.*

No. The webpage is a single entity. Trying to police parts of it from other parts is a fool’s errand.

*Imagine a junior web developer creating a login form on a page having ads or other scripts potentially sniffing passwords? Isn’t this the essence of web security? Why anyone is talking about that?*

“Be careful about trusting third party scripts” is something that doesn’t get mentioned as much as it should be. Thankfully, most ad providers and CDN hosted libraries are supplied by reasonably trustworthy people.

*Do you know an easy way of overcoming the problem of missing Access-Control-Allow-Origin*

* Configure the server so it isn’t missing.

* Use JSONP instead

* Use a proxy that isn’t blocked by the same-origin policy to fetch the data instead (you won’t get any credentials the browser might send because Alice has an account with Bob though).

How does CORS manage requests from external resources?

The CORS standard manages cross-origin requests by adding new HTTP headers to the standard list of headers. The following are the new HTTP headers added by the CORS standard:

* Access-Control-Allow-Origin

* Access-Control-Allow-Credentials

* Access-Control-Allow-Headers

* Access-Control-Allow-Methods

* Access-Control-Expose-Headers

* Access-Control-Max-Age

* Access-Control-Request-Headers

* Access-Control-Request-Method

* Origin

## Content Security Policy (CSP)

To understand CSP, we first need to talk about one of the most common vulnerabilities on the web: XSS, which stands for cross-site scripting.

XSS is when some evil person injects JavaScript into your client-side code. You might think…
>  *What are they going to do? Change the color from red to blue?*

Let’s assume that someone has successfully injected JavaScript into the client-side code of a website you are visiting.

What could they do that would be malicious?

* They could make HTTP requests to another site pretending to be you.

* They could add an anchor tag that sends you to a website that looks identical to the one you are on with some slightly different, malicious characteristics.

* They could add a script tag with inline JavaScript.

* They could add a script tag that fetches a remote JavaScript file somewhere.

* They could add an iframe that covers the page and looks like part of the website prompting you to insert your password.

The possibilities are endless.

CSP tries to prevent this from happening by limiting:

* What can be opened in an iframe

* what stylesheets can be loaded

* where requests can be made, etc.

    So how does it work?

When you click on a link or type a website URL in the address bar of your browser, your browser makes a GET request. It eventually makes its way to a server that serves up HTML along with some HTTP headers. If you’re curious about what headers you receive, open up the Network tab in your console, and visit some websites.

You might see a response header that looks like this:

    content-security-policy: default-src * data: blob:;script-src *.facebook.com *.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';style-src data: blob: 'unsafe-inline' *;connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net *.spotilocal.com:* wss://*.facebook.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;

That is the content security policy of facebook.com. Let’s reformat it to make it easier to read:

    content-security-policy:
    default-src * data: blob:;

    script-src *.facebook.com *.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';

    style-src data: blob: 'unsafe-inline' *;

    connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net *.spotilocal.com:* wss://*.facebook.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;

Now, let’s break down the directives.

* **default-src** restricts all other CSP directives that are not explicitly listed.

* **script-src** restricts the scripts that can be loaded.

* **style-src** restricts the stylesheets that can be loaded.

* **connect-src** restricts the URLs which can be loaded using script interfaces, so fetch, XHR, ajax, etc.

Note that there are many more CSP directives than just these four shown above. The browser will read the CSP header and apply those directives to everything within the HTML file that was served. If the directives are set appropriately, they allow only what is necessary.

If no CSP header is present, then everything goes, and nothing is restricted. Everywhere you see *, that is a wildcard. You can imagine replacing * with anything and it will be allowed.

## Conclusion

Security is something that should be important to everyone, not just the people who have it explicitly named in their job title, and always try to have an additional layer for better security.
