---
title: "How to Promise"
date: "2016-01-05"
coverImage: "promise-300x300.png"
author: "Solomon Yu"
tags: ["Javascript", "Promise"]
---

As a front-end developer, if you haven't heard about Promise in Javascript, well ...  
At least you have heard about it now! And it is truly amazing.

Promise is a the standard way of handling asynchronous operations, such as calling APIs. It is comprehensive but elegant, espeically with a series of Async operations and handling the errors from them.  
It has been widely supported by mordern browsers. But of course IE is not one of the modern ones, so do not forget to find a promise-polyfill for your IE users.

[Can I use Promise](http://caniuse.com/#feat=promises)  
[Polyfill for IE](https://github.com/taylorhakes/promise-polyfill)

In this blog I will cover the basic usages for Promise, let's get started.  
A promise function would look like this

```javascript
new Promise(function (resolve, reject) {
    var data = asyncCall(); // could be API calls
    if( data ) {
        resolve(data); // success
    } else {
        reject(data); // fail
    }
});
```
First we need to declare it is a \`new\` Promise, inside you can put your async calls and let promise know how to deal with the response with \`resolve\` and \`reject\`. You can treat \`resolve\` and \`reject\` as two callback functions, \`resolve\` when you are confirmed that you have got what you expect, and reject if anything bad happened.

Here is a brief example, [Fiddle it here](https://jsfiddle.net/02fj0cnv/)

```javascript
var aync1 = function() {
    return new Promise(function(resolve, reject){
        // Wait 1s and alert
        setTimeout(function(){
            resolve("Hello Promise");
        }, 1000);
    });
}

aync1().then(function (resp) {
    alert(resp);
});
```

If something is going wrong, you want to catch and handle it, [Fiddle it here.](https://jsfiddle.net/j26ka27w/)

```javascript
var aync2 = function() {
    return new Promise(function(resolve, reject){
        // Wait 2s and alert
        setTimeout(function(){
            // pretend we got something wrong.
            reject("error");
        }, 1000);
    });
}
 
aync2().then(function (resp) {
    alert("This will not be called");
}).catch(function(err){
    alert(err);
});
```

Here I have quickly demonstrated the basic usage of Promise, you may think "Oh callbacks can do the same thing as well". You are not wrong, but in next blog I will show the real power of Promise, thanks for reading.
