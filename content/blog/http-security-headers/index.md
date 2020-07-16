---
title: "HTTP Security Headers"
date: "2020-07-15"
coverImage: "http-security-headers.jpg"
author: "Vijay Singh Shekhawat"
tags: ["Security","HTTP Headers"]
description: "HTTP security headers are a fundamental part of website security. Upon implementation, they protect you against the types of attacks that your site is most likely to come across. These headers protect against XSS, code injection, clickjacking, etc. This article explains most commonly used HTTP headers in context to application security"
---

### What are HTTP Security Headers

When we visit any website in the browser, the browser sends some request headers to the server and the server responds with HTTP response headers. These headers are used by the client and server to share information as a part of the HTTP protocol. Browsers have defined behavior of the web page according to these headers during communication with the server. These headers are mainly a combination of key-value pairs separated by a colon `:`. There are many HTTP headers, but here I'm covering some very useful web security headers, which will improve your website security. 

### Why Http Security Header Are Necessary
As you know, nowadays too many data breaches are happening, many websites are hacked due to misconfiguration or lack of protection. These security headers will protect your website from some common attacks like XSS, code injection, clickjacking, etc. Additionally these headers increases your website SEO score.

#### 1. Enforcing HTTPS (HTTP Strict Transport Security (HSTS))
HTTP Strict Transport Security security header helps to protect websites against man-in-the-middle attacks and cookie hijacking. Let's say, you have one website `www.example.com` and you have purchased SSL certification for migrating your website from HTTP to HTTPS. Now suppose old users are still opening your website using the HTTP, so they may redirect your HTTP users to HTTPS via redirection as a solution. Since visitors may first communicate with the non-encrypted version of the site before being redirected. This creates an opportunity for a man-in-the-middle attack. The HTTP Strict Transport Security header informs the browser that it should never load a site using HTTP and should automatically convert all attempts to access the site using HTTP to HTTPS requests.

##### Syntax
  ```
    Strict-Transport-Security: max-age=<expire-time>
    Strict-Transport-Security: max-age=<expire-time>; includeSubDomains
    Strict-Transport-Security: max-age=<expire-time>; preload
  ```
##### HSTS directives :

|  Directives | Explanation   |  
|---|---|
|`max-age=<expire-time>` | This directive allows us to specify the amount of time (in seconds) that the content of the header will be stored in the browser cache. |
| `includeSubDomains`  | If this optional parameter is specified, this rule applies to all of the site's subdomains as well. | 
|  `Preload` | This is not part of the specifications. Please see the Preloading Strict Transport Security | 

#### 2. Cross-Site Scripting Protection (X-XSS)
X-XSS header helps protect websites against script injection attacks. When an attacker injects malicious JavaScript code into an HTTP request for accessing confidential information such as session cookies, at that time HTTP X-XSS-Protection header can stop the browsers from loading suce web pages, whenever any detect is reflected cross-site scripting (XSS) attacks. XSS is a very common and effective attack.

#### Syntax
  ```
    X-XSS-Protection: 0 
    X-XSS-Protection: 1 
    X-XSS-Protection: 1; mode=block 
    X-XSS-Protection: 1; report=<reporting-uri>
  ```
##### X-XSS-Protection directives:

| Attribute | Description |
|---|---|---|---|---|
| `0`  |  Disable the XSS Filtering | 
| `1`  |  Enable the XSS Filtering and remove the unsafe part | 
| `1; mode=block`  |  Browser prevents the entire page from rendering when an XSS attack is detected. | 
| `1; report=<reporting-URI> (Chromium only)`  | When a cross-site scripting attack is detected, the browser will remove the unsafe parts from the page and report the violation on the reporting URL. |  

#### 3. Website IFrame Protection
The X-Frame-Options HTTP response header can be used to instruct the browser whether a web page should be allowed to render a `<frame>, <iframe>, <embed> or <object>`  element on website or not.

This header protects users against ClickJacking attacks. An attacker uses multiple tricks to trick the user into clicking something different than what they think they’re clicking.

#### Syntax
  ```
    X-Frame-Options: DENY 
    X-Frame-Options: SAMEORIGIN
  ```
#### X-Frame-Options directives include the following:

|  Directives | Explanation   |  
|---|---|
|`DENY` |  This will not allow to page rendering in the `<frame>, <iframe>, <embed> or <object>`|
| `SAMEORIGIN` | This will allow the page to only be displayed in a `<frame>, <iframe>, <embed> or <object>` on the same origin. | 

#### 4. Preventing Content-Type Sniffing
**X-Content-Type-Options** response header prevents the browser from MIME-sniffing a response away from the declared content-type. A MIME-sniffing vulnerability allows an attacker to inject a malicious resource, such as a malicious executable script, Suppose an attacker changes the response for an innocent resource, such as an image. With MIME sniffing, the browser will ignore the declared image content type, and instead of rendering an image will execute the malicious script. 
 
Syntax 
  ``` 
    X-Content-Type-Options: nosniff 
  ```

#### X-Content-Type-Options directives:
  
`nosniff` - Blocks a request if the request destination is of type:


#### 6. Content Security Policy
Content-Security-Policy header is used to instruct the browser to load only the allowed content defined in the policy. This uses the whitelisting approach which tells the browser from where to load the images, scripts, CSS, applets, etc. If implemented properly, this policy prevents the exploitation of Cross-Site Scripting (XSS), ClickJacking, and HTML injection attacks.

#### Syntax
  ```
    Content-Security-Policy: <policy-directive>; <policy-directive>
  ```
More information about the Content Security policy can be found on  [Mozilla’s website ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).

  
### Conclusion
As a web developer, you can follow this guide for adding security headers to your website. HTTP headers can be configured on the server to enhance the overall security of the web application. You can easily validate your website security headers. Multiple free online tools are available to check the same:
  - https://securityheaders.com/
  - https://www.serpworx.com/check-security-headers/ 

These headers reduce the potential vulnerabilities of the application. Alongside these headers will add one layer of security still we need to add more layer's of security in our web application  

