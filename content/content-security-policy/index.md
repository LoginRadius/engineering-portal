---
title: "Content Security Policy (CSP)"
date: "2021-07-14"
coverImage: "content-security-policy.jpg"
author: "Vijay Singh Shekhawat"
tags: ["Secuirty Header", "CSP","Content Security Policy"]
---

What is a Content Security Policy (CSP), and why is it important?

## Overview
A Content Protection Policy (CSP) is a security standard that adds an extra layer of defense in detecting and mitigating certain kinds of attacks, such as Cross-Site Scripting (XSS), clickjacking, and other code injection threats. CSP is a preventative step against attacks that rely on executing malicious material in a trusted web context, as well as other attempts to bypass the same-origin policy.

## What Threats CSP Can Mitigate?

### 1. Mitigating cross-site scripting

The CSP's main purpose is to prevent and report XSS attacks. XSS attacks take advantage of the browser's faith in the server's content. Because the browser trusts the source of the material without additional safety measures, the browser runs all code from a trustworthy origin. It is unable to distinguish which code is legal. Thus any injected malicious code is also executed.

The website administrator can reduce the XSS attack using the CSP by defining trusted source sites for the executable scripts. When we use the CSP header, browsers only allow us to run the script from the whitelisted domains and ignore all other scripts.

We can also use the same-origin policy (SOP) header to prevent the website from accessing data from the other origin. Still, Websites need to include lots of assets from external sources like content delivery networks (CDNs), Google Analytics scripts, fonts, styles, comment modules, social media buttons, etc., so for the modern web, we need to use CSP.  


### 2. Mitigating Packet Sniffing and Enforcing HTTPS
One interesting advantage of a content security policy is we can define the permitted protocols. For example, the sites can restrict browsers from loading content over HTTPS. Some browsers, by default, will not connect to HTTPS but using the content security policy, we can enforce browsers to encrypt conversations with your server. 

Sites may also leverage HTTP Strict-Transport-Security headers to ensure that browsers only connect to the site over encrypted routes.


## Understand the CSP

### How to Use CSP?
Adding the Content-Security-Policy HTTP header to a web page and setting values for it allows you to restrict what resources the user agent is authorized to load for that page. For example, A page that allows loading external CSS or fonts but not allows loading javascript from the external domains.

HTTP response headers are generally used to specify the Content-Security-Policy header, but if needed, you can also use HTML meta tags to provide specific CSP directives at the page level. 

An example of adding CSP headers is shown below. 

 ```javascript
  Content-Security-Policy: default-src 'self'; img-src *;  script-src loginradius.com;
 ```

 An example of adding CSP headers in the HTML tags

 ```javascript
 <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
 ```


## CSP Directive
Listed below are a couple of CSP directives and their use cases:

**`Default-src`**: This directive serves as a fallback for the other CSP fetch directives. For absent directives like media-src and script-src, the user agent looks for the default-src directive's content and uses it.

**`Script-src`**: This directive is used to define locations from which external scripts can be loaded.

**`Img-src`**: Specifies sources from which images can be retrieved.

**`Media-src`**: This directive is used to define locations from which rich media like video can be retrieved.

**`Object-src`**: This directive is used to define locations from which plugins can be retrieved.

**`Font-src`**: Specifies permitted sources for loading fonts.

**`manifest-src`**: A list of acceptable source locations for web manifests. Web manifests are used by users of Progressive Web Applications to download websites and run them like native mobile apps.

**`frame-ancestors`**: A list of acceptable URL locations which this website can load in an iFrame.

**`form-action`**: A list of acceptable URL target locations where the website can send form data. It's most likely that you want this value set to `self`  as most websites only submit their form data locally. This property is not covered by default-src above, so make sure you set it.

**`plugin-types`**: The list of plugin types that can be loaded from the locations in object-src. Likely that you also want to set this to `none`.

**`base-uri`**: The list of URLs that can be used in HTML base tags on your site.

**`child-src`** is used to restrict permitted URLs for JavaScript workers and embedded frame contents, including embedded videos. In Level 3, frame-src and worker-src directives can be used instead to control embedded content and worker processes, respectively.

**`style-src`** is used to whitelist CSS stylesheet sources. To allow stylesheets from the current origin only, use style-src 'self'.

**`connect-src`** specifies permitted origins for direct JavaScript connections that use EventSource, WebSocket, or XMLHttpRequest objects.

You can find a more updated and complete list maintained by Mozilla here.
Mozilla maintains a more up-to-date and comprehensive list, which can be seen [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

## CSP Browser Compatibility
 All major modern browsers have supported Content Security Policy.
 1. Chrome
 2. Firefox
 3. Safari
 4. Edge
 5. Opera
 6. Internet Explorer
 7. Chrome Android
 8. Firefox Android
 9. Safari on iOS
 10. Opera Android
 11. Samsung Internet

Mozilla maintains a more up-to-date and comprehensive list for the CSP support in the browser, which can be seen [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP#browser_compatibility).


## Common Use cases 

### User case #1: Site's Origin only
The ```default-src``` directive in the below example policy is set to self. This permits the browser to load resources from the site's origin. 

```javascript
 <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
 ```

### User case #2: Trusted Domain only
The `default-src`  directive in the below example policy permits the browser to load resources from the trusted domain and all its subdomains.

```javascript
 <meta http-equiv="Content-Security-Policy" content="default-src 'self' *.loginradius.com">
 ```

The above policy permits the browser to load content from loginradius.com as well as any subdomain under loginradius.com.


### User case #3: SSL/HTTPS only
Suppose you are running an e-commerce site and want to ensure that all resources are only loaded via SSL or HTTPS. The below policy ensures that all of the resources on your website load from TLS.

```javascript
 <meta http-equiv="Content-Security-Policy" content="default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'">
 ```

 ### User case #4: Trusted Executable Script only

If you want to allow users of a web application to add images/photos from any source but permits all scripts from trusted sources or specific sources.

```javascript
 <meta http-equiv="Content-Security-Policy" content="default-src 'self' img-src *; script-src cdn.loginradius.com;">
 ```
 
 The `img-src` directive allows images to load from anywhere.
 The `script-src` directive can only accept executable scripts from cdn.loginradius.com.

 If you want to add social widgets like the google+ button, Facebook like, Tweet button on your website, you need to allow external script also like the below policy.

 ```javascript
 <meta http-equiv="Content-Security-Policy" content="default-src 'self' img-src *; script-src cdn.loginradius.com;https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com;">
 ```


 ### User case #5: Reporting only
The ` Content-Security-Policy-Report-Only ` Header is a wonderful method to evaluate the effects of a Content-Security-Policy header without really blocking anything on the site. Also, we can get any violation reports using this header. By default, it only sends reports to the developer tools console. If you include a `report-to` or `report-uri` directive, it will send a JSON representation of the violation to the provided URI endpoint. 

```javascript
 <meta http-equiv="Content-Security-Policy-Report-Only" content="default-src 'self'; report-uri https://report.yourwebsite.com/cspreport;">
 ```

In the above example, it will not enforce anything. `Content-Security-Policy-Report-Only` policy only generates reports and sends them to the report URI. The CSP violation report is generated in JSON format. 

```javascript
 <meta http-equiv="Content-Security-Policy-Report-Only" content="default-src 'self'; script-src cdn.loginradius.com; report-uri https://report.loginradius.com/cspreport;">
 ```
In the above example, the policy only allows the script from cdn.loginradius.com.

#### Sample Html

```html
<!DOCTYPE html>
<html>
  
<head>
    <title>Content Security Policy</title>
   <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>
</head>
  
<body>
    . . .
</body>
  
</html>
 ```
In the below sample HTML browser trying to download javascript from the other source, but we have allowed javascript src only from the CDN so that the browser will send the following violation report.

```JSON
 {
"csp-report":{
"document-uri": "https://loginradius.com/test.html",
"referrer": "",
"blocked-uri": "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
"violated-directive": "script-src cdn.loginradius.com",
"original-policy": "default-src 'self'; script-src cdn.loginradius.com; report-uri https://report.loginradius.com/cspreport;",
"disposition”: “report"
}
}
 ```

## Summary
The Content Security Policy will add an additional layer of protection to your web application. CSP is compatible with almost all current browsers and is widely used on the internet as an effective technique for decreasing the threat of cross-site scripting attacks.

The Web Application Security Working Group of the Wide Web Consortium (w3c has already begun work on the specification's next [version, Content Security Policy Level 3](https://www.w3.org/TR/CSP3/) and Content Security Policy Level 2 already [Candidate Recommendation](https://www.w3.org/TR/CSP2/).
