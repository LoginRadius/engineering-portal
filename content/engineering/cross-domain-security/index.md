---
title: "Cross Domain Security"
date: "2020-08-16"
coverImage: "cross_domain_security.png"
author: "Abhimanyu Singh Rathore"
tags: ["Security", "Web Security", "Cross-Domain"]
description: "Cross domain security address security threat by enabling the information sharing in more reliable and secure environments. Cross domain security is an inclusive approach to defending against all kind of threats to data connections at the boundaries of sensitive or classified networks."
---

## **Every Web Developer should know about cross-domain security**

While working in the world of the internet, all of the complex systems are interconnected in a shareable environment. But exposing systems in the outer world will invite security vulnerabilities and data breach for the organization. Cross-domain security address this security threat by enabling information sharing in more reliable and secure environments. Cross-domain security is an inclusive approach to defending against all kinds of threats to data connections at the boundaries of sensitive or classified networks.

## The Major Concepts of Security

### 100% Security doesn’t exists.

There is no way of being 100% protected from being hacked. If anyone ever tells you that, they are wrong.

### Single layer of protection isn’t enough.

You can’t just say…

> "Oh, because I even have CSP implemented, I am safe. I can cross out cross-site scripting from my vulnerabilities list because that can’t happen now."

Maybe that is a given to some, but it is easy to find yourself thinking in this manner. In my opinion one reason that programmers can easily find themselves thinking this way is because so much of coding is black and white, 0 or 1, true or false. Security is not that so simple.


## Cross-Origin Resource Sharing (CORS)

Have you ever gotten an error that looked something like this?

    No 'Access-Control-Allow-Origin' header is available on the requested resource. Origin 'null' is therefore not allowed access.

You are certainly not alone. And then you Google it, and someone tells you to urge this extension which will make all of  your problems go away!
>  *Awesome, right?*

**CORS is there to protect you, not hurt you!**

In order to explain how CORS helps you, let’s starts about cookies, specifically **authentication cookies**. Authentication cookies are wont to tell a server that you are simply logged in, and that they are automatically sent with any request you make to that server.
>  Let’s think you’re logged in to yahoo, and they use authentication cookies. You click on bit.ly/r43nugi which redirects you to [http://www.cryptoearn.co](http://www.cryptoearn.co/). A script within [http://www.cryptoearn.co](http://www.cryptoearn.co/) makes a client-side request to yahoo.com which sends your authentication cookie!

In a no-CORS world, they might make changes to your account without you even knowing. Until, obiviously , they post bit.ly/r43nugi on your timeline, and everyone of your relative orfriends click on thereon, and then the cycle continues in an evil breadth-first scheme that conquers all of yahoo’s users, and the world is consumed by [http://www.cryptoearn.co](http://www.cryptoearn.co/). ?

In CORS world, however, yahoo would only allow requests with an origin of yahoo.com to edit data on their server. In other words, they might limit cross-origin resource sharing. You might then ask…
>  *Well can [*http://www.cryptoearn.co](http://www.cryptoearn.co/) *just change the origin header on their request, so that it looks like it is coming from *yahoo.com*?*

They will try, but it won’t work because the browser will just ignore it and use the actual origin.
>  *Ok, but what if [http://www.cryptoearn.co](http://www.cryptoearn.co/)made the request server-side?*

In this case, they can bypass CORS, but they can't crack this because they won’t be ready to send your authentication cookie along for the ride. The script should be executed on the client side to urge access to your client side cookies.

### What is a security Policy?
>  Servers are generally host web sites, applications, images, fonts, and many more. When you use any browser, you are likely attempting to access a definite website (that is hosted on a server). Websites often request these hosted resources from different locations (servers) on the web. Security policies on servers mitigate the risks associated with requesting assets hosted on distinct server. Let’s take a glance at an example of a security policy: *same-origin*.
>  The **same-origin **policy is very restrictive. Under this policy, a document (i.e., sort of a web page) hosted on server A can only interact with other documents that also are on server A. In short, the same-origin policy enforces that documents that interact with one another have the same *origin*.

The CORS standards manage cross-origin requests by adding a new HTTP headers to the standard list of headers. The following are the new HTTP headers added by the CORS standard:

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

To dig in to  CSP, we first need to talk about one of the most common vulnerabilities on the web: XSS, which means cross-site scripting.

XSS is when some evil guy injects JavaScript into your client-side code. You might think…
>  *What are they going to do? Change a color from red to blue?*

Let’s think of someone has successfully injected JavaScript into client-side code of a website you are visiting.

What could they do that would be malicious?

* They might make HTTP requests to another site pretending to be you.

* They might add an anchor tag that sends you to a website that looks same to the one you are on with some slightly different, malicious characteristics.

* They might add a script tag with inline JavaScript.

* They might add a script tag that fetches a remote JavaScript file somewhere.

* They might add an iframe that covers the page and looks like part of the website prompting you to insert your password.

The possibilities are endless.

CSP is something prevent this from happening by limiting:

* what can be opened in an iframe

* what stylesheets can be loaded

* where requests can be made, etc.

    So how does it work?

Whenever you click on a link or type a website URL in the address bar of your internet browser, your browser makes a GET request. It eventually makes its way to a server which serves up HTML along with HTTP headers.  for more details about what headers, open up the Network tab in your console, and visit some sites.

You might see a response header that looks like below:

    content-security-policy: default-src * data: blob:;script-src *.yahoo.com *.fbcdn.net *.yahoo.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';style-src data: blob: 'unsafe-inline' *;connect-src *.yahoo.com yahoo.com *.fbcdn.net *.yahoo.net *.spotilocal.com:* wss://*.yahoo.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;

That is the content security policy of yahoo.com. Let’s reformat it to make it easier to read:

    content-security-policy:
    default-src * data: blob:;

    script-src *.yahoo.com *.fbcdn.net *.yahoo.net *.google-analytics.com *.virtualearth.net *.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval' *.atlassolutions.com blob: data: 'self';

    style-src data: blob: 'unsafe-inline' *;

    connect-src *.yahoo.com yahoo.com *.fbcdn.net *.yahoo.net *.spotilocal.com:* wss://*.yahoo.com:* https://fb.scanandcleanlocal.com:* *.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob: *.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;

Now, let’s break down the directives.

* **default-src** the CSP directives that are not explicitly listed will be restricted.

* **script-src** scripts that can be loaded will be restricted

* **style-src** stylesheets that can be loaded will be restricted.

* **connect-src** URLs which can be loaded using script interfaces, so fetch, XHR, ajax, etc will be restricted

*Note:* there are many more CSP directives than just these four shown above. The internet browser will read the CSP header and apply those directives to everything within the HTML file that was served. If the directives are set correctly, they allow only what is required.

If there is no CSP header is present, then everything goes, and nothing is restricted. Everywhere you see * , that is a wildcard. You can think of replacing * with anything and it will be allowed.

## Conclusion

Security is something that should be important to everyone, not just the people who have it explicitly named in their job title, and always try to have additional layer for better security.