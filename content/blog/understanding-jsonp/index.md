---
title: "Understanding JSONP"
date: "2018-06-29"
coverImage: "Screenshot-2018-06-29-12.21.27.png"
author: Govind Malviya
tags: ["JavaScript","JSONP","API"]
---

Nowadays, many API providers support JSONP requests. One reason for this is that most web browsers disable cross-domain requests when using basic Ajax.

For example, if your website has the domain "a.com", it will use JavaScript hosted on a.com. When the a.com JavaScript makes an Ajax call to make a request on b.com, most web browsers would automatically deem the Ajax call as insecure and disable it. This is called the Same-Origin Policy and web browsers have this to prevent malicious scripts from sending off information to a different domain. Because you need the a.com JavaScript to access b.com to provide your service, this seems to pose a pretty big issue … JSONP to the rescue!

Before understanding JSONP, we already know JSON is an object notation of JavaScript. The "P" stands for padding. So it’s a padded JSON, and, to be more specific, the JSON object is padded with a JavaScript function! It looks like this:

```javascript
jsFunction({"name" : "Ash Ketchum", "role" : "Pokemon trainer"});
```

Thus, technically, any call that retrieves JSONP, sends off an executable JavaScript line, if and only if your page has a JavaScript function that has the same function name that’s returned in the JSONP!

Let’s look at an example: say the user is on a.com and the browser is using JavaScript hosted on a.com. Then I shouldn't have any issues making Ajax calls to a.com. Ajax GET requests to b.com however, would fail. To avoid this, I first create a method in the JavaScript code that's located on a.com with the following signature

```javascript
function getData(data){
// use this data
}
```

With this, an Ajax call using JSONP will pass through fine and return this data:

```javascript
getData({"name" : "test", "value" : "test Value"});
```

After processing the request, the web browser will call the "getData" function because whenever a JavaScript tag is loaded, it gets executed.

Now, the JSON object will get passed as an argument to the getData function as the data parameter. So, you can think of the getData as a callback method of the request.

You can see the below code clearly

```javascript
function addJavascriptFile = function (url, context) {
context = context || document;
var head = context.getElementsByTagName('head')\[0\];
var js = context.createElement('script');
js.src = url;
js.type = "text/JavaScript";
head.appendChild(js);
return js;
}

function getJsonp = function (url, handle) {

//creating random name of function as to not conflict with others
var func = 'jsonpCallback' + Math.floor((Math.random() \* 1000000000000000000) + 1);

//adding randomly created function to global window object
window\[func\] = function (data) {

//calling handle
handle(data);

//removing random named declared function
window\[func\] = function () {};

//removing added js
document.head.removeChild(js);
}

//manipulating and adding js file to head
var endurl = url.indexOf('?') != -1 ? url + '&amp;amp;callback=' + func : url + '?callback=' + func;
var js = addJavascriptFile(endurl);
}
```

The above code is not doing any magic, it will accept the URL of the API and add a parameter callback with a random name, and also create a global method with this same random name. It will then create a script tag and add the complete URL to src of this tag.

The API will read the callback parameter from the query string and, if the callback parameter has the value "jsonCallback", the response will be as follows:

```javascript
jsonpCallback({"name" : "test", "value" : "test Value"});
```