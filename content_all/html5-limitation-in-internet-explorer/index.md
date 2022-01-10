---
type: async
title: "HTML5 Limitation in Internet Explorer"
date: "2015-06-30"
coverImage: "radio-check-buttons-css.png"
author: "Team LoginRadius"
tags: ["Java", "Maven", "Eclipse"]
---

HTML 5 is the latest and greatest web technology, although it has some issues in some browsers which don’t have native support for the new HTML5 elements. If you want to support some of the older browsers which may still be in use such as IE8 and lower then you are going to have some trouble using HTML5.

The problem with IE8 and lower versioned IE browsers is that they were created many years ago while HTML5 is new technology and HTML5 tags were newly invented so legacy browsers do not support them. Microsoft will not release any updates for these browsers because they have released new versions of the IE browser.

As old IE browsers do not know about these tags then it can’t style them so you will find that in IE8 or lower your websites will be rendered without many styles.

#### How to use HTML5 in IE

If you want HTML5s new tags to be supported in IE then you need to add some javascript to create the elements:

Example:

```js
  <script>
    document.createElement('header');
    document.createElement('article');
    document.createElement('aside');
    document.createElement('footer');
  </script>
```
  
This is not a very good way, you would need to remember all the tags that you have set and include them on every page of your website. If you add any new tags then you need to add these tags on every page of the website as well. Thankfully Remy Sharp provided a solution for this, Remy Sharp has created a Javascript file which he hosts with google code that will handle this for you.

add the following at the top of your pages and it will include this code file on your website if the end user is using an IE browser lower than version 9.

```js
<!--[if lt IE 9]>
<script src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
```
  
IE also does not support some of the most useful new HTML5 methods that are supported by modern browsers:Window.postMessage()

**Window.postMessage**

allows for sending data messages between two windows/frames across domains. Normally, scripts on different pages are allowed to access each other if and only if the pages that executed them are at the same locations with the same protocol (usually both http) and matching host names. The HTML5 postMessage function provides a great way to communicate securely and with high performance and reliability even cross-domain. Unfortunately, the HTML5 postMessage function does not work in IE

Let’s take a look at how Window.postMessage works:

#### Syntax

The below signature is used for postMessage:

**otherWindow.postMessage(message, targetOrigin);**

**otherWindow**
A reference to another window; such a reference may be obtained, for example, using the contentWindow property of an iframe element, the object returned by window.open

**message**
This parameter is required for a message to be sent to the other window. The message is serialized using the structured clone algorithm. This means you can pass a broad variety of data objects safely to the destination window without having to serialize them yourself.

**targetOrigin**
When the message is dispatched, the current location of the target document is checked. If it does not match the specified URI, then the message will not be dispatched. This parameter can be useful if you want to be sure of the location of the target document before dispatching the message and you can also specify a literal string “\*”  (indicating no preference) or as a URI

but always provide a specific targetOrigin, not \*, if you know where the other window’s document should be located. If you do not set a specific location and use “\*” then a malicious site can change the location of the window without your knowledge, and therefore it can intercept the data sent using the postMessage method.

**Example for postMessage**

**Sender**

The first part of the process is setting up a “source”.  With the source, we will open a new window (or IFrame), send the new window message (in the our example, we’ll do so every 6 seconds, and create an event listener for any response we receive from the destination window.

```javascript
//create popup window
var domain = 'https://www.example.com';
var myPopup = window.open(domain + '/postmessage.html','myWindow');
//periodical message sender
setInterval(function(){
    var message = 'Hello!  The time is: ' + (new Date().getTime());
    myPopup.postMessage(message,domain); //send the message and target URI
},6000);
 
//listen to back
 
window.addEventListener('message',function(event) {
    if(event.origin !== 'http://scriptandstyle.com') return;
        console.log('received response:  ',event.data);
},false);
```

I have used window.addEventListener which doesn’t work with Internet Explorer so use window.attachEvent

**Receiver**

In the destination window we should validate the message origin and if it is not valid then we will not send the message to the sender, otherwise we send a response back to the sender:

```javascript
window.addEventListener('message',function(event) {
    if(event.origin !== 'https://lrblogs.wpengine.com) return;
        event.source.postMessage('message received:  ',event.origin);
},false);
```
  
**sessionStorage**

sessionStorage stores data for one session only, this is used in a single transaction it stores the data only for one session and as you close the window the session would be lost and  the data is deleted when the browser is closed.

HTML5 sessionStorage object are shared in different tabs in the same browser session if you change a sessionStorage attribute’s value in one tab, that change should be reflected within another tab but in IE8 this system will not work properly it does not share sessionStorage objects between frames on a page. This issue has since been fixed in IE11.

**Example:**

```javascript
//save a value
sessionStorage.setItem("website", "https://www.example.com");
//retrieve item
var website= sessionStorage.getItem("website");
//remove the key
sessionStorage.removeItem(“website”);
```

**localStorage**

The localStorage object stores the data like a persistent cookie, with no expiration date. The data will not be deleted when the browser is closed, and will be available when a user returns to the browser.

IE also supports localStorage from IE8 but it does not support localStorage in IE7 and previous versions.

localStorage Vs Cookies

1. Cookies are small text files stored by browsers allowing for a max of 4KB while with localStorage we can store Mbs of localStorage data.
2. Cookies are delivered with every request, which can slow down the delivery of your web pages.

**Example**
```javascript
//save a value
localStorage.setItem("Domain", "https://www.example.com");
//retrieve item
var website= localStorage.getItem("website");
//remove the key
localStorage.removeItem(“website”);
```