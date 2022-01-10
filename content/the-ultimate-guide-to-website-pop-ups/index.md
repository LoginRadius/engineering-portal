---
type: async
title: "Know The Types of Website Popups and How to Create Them"
date: "2017-04-20"
coverImage: "The-Ultimate-guide-to-website-pop-ups.png"
author: "Team LoginRadius"
tags: ["CSS"]
---

POPUPS! They can annoy you but if used properly, they can be a boon to any marketing campaign. In 2015, Taylor wrote an article on best practices to use popup. While the article discussed how to optimize popup, in this article I am going to list down the types of articles and how you can implement them. I have added codes for every type of popup for a better idea.

### **1\. Creating a basic popup:**

![Creating a simple pop-up](Creating-a-simple-pop-up.png)

This section talks about creating a basic popup using simple HTML and CSS. There is a separate section for header, footer and content. I have also added a close button at top right corner of the popup. There are three steps to create this popup.

#### **A. Add HTML \[manage a structure of a popup\]**

```js
&amp;amp;lt;div class="popup-content"&amp;amp;gt;
&amp;amp;lt;span class="popup-close"&amp;amp;gt;&amp;amp;amp;times;&amp;amp;lt;/span&amp;amp;gt;
&amp;amp;lt;div class="popup-header"&amp;amp;gt;Header&amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;div class="popup-body"&amp;amp;gt;
&amp;amp;lt;p&amp;amp;gt;Your popup code goes here&amp;amp;lt;/p&amp;amp;gt;
&amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;div class="popup-footer"&amp;amp;gt;Footer&amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/div&amp;amp;gt;\
```

#### **B. Add CSS \[Display Like a popup\]**

```css
&amp;amp;lt;style&amp;amp;gt;
.popup-layout {
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100% ;
height: 100% ;
overflow: auto;
background-color: rgb(0, 0, 0);
background-color: rgba(0, 0, 0, 0.4);
}
.popup-header,
.popup-footer{
background: #29f;
padding: 20px;
color: #fff;
font-weight: bold;
}
.popup-body{
padding: 20px;
}
.popup-content {
background-color: #fefefe;
margin: 15% auto;
border: 1px solid #888;
width: 60% ;
}
.popup-close {
color: #FFF;
margin: 10px;
float: right;
font-size: 28px;
font-weight: bold;
}
.popup-close:hover,
.popup-close:focus {
color: black;
text-decoration: none;
cursor: pointer;
}
&amp;amp;lt;/style&amp;amp;gt;
```

Moreover, you can also check out this tutorial of [creating a basic popup](/simple-popup-tutorial/) if you want to learn the basic understanding.

#### **C. Add Script \[for action on close button\]**

```js
&amp;amp;lt;script&amp;amp;gt;
var popup\_close = document.getElementsByClassName('popup-close');
for (var i = 0; i &amp;amp;lt; popup\_close.length; i++) {
var closeThis = popup\_close\[i\];
closeThis.addEventListener("click", function () {
document.getElementsByClassName('popup-layout')\[0\].style.display = "none";
}, false);
}
&amp;amp;lt;/script&amp;amp;gt;
```

### **2\. Creating a timer based popup:**

![Creating a timer based popup](Creating-a-timer-based-popup.gif)

This is a timer based popup which can be displayed at a certain time after the page is loaded.

For reference, I have added the code to display the popup after 5 second \[Add following code\]. Steps are as below.

Follow all the steps mentioned in section 1. (Creating a simple popup) and add the following code below that code.

```js
&amp;amp;lt;script&amp;amp;gt;
document.getElementsByClassName('popup-layout')\[0\].style.display = "none";
setTimeout(function () {
document.getElementsByClassName('popup-layout')\[0\].style.display = "block";
}, 5000);
&amp;amp;lt;/script&amp;amp;gt;
```

To Auto hide after 5 second, add following code.

```js
&amp;amp;lt;script&amp;amp;gt;
document.getElementsByClassName('popup-layout')\[0\].style.display = "block";
setTimeout(function () {
document.getElementsByClassName('popup-layout')\[0\].style.display = "none";
}, 5000);
&amp;amp;lt;/script&amp;amp;gt;
```

### **3\. Creating a Scroll popup:**

This one shows up when you scroll down the page. I have set it to 500 pixels, you can change as per requirements

```js
&amp;amp;lt;script&amp;amp;gt;
document.getElementsByClassName('popup-layout')\[0\].style.display = "none";
window.onscroll = function () {
if (document.body.scrollTop &amp;amp;gt; 500 || document.documentElement.scrollTop &amp;amp;gt; 500) {
document.getElementsByClassName('popup-layout')\[0\].style.display = "block";
}
}
&amp;amp;lt;/script&amp;amp;gt;
```

### **4\. Creating a Scroll / Time \[5 second\] popup:**


Pretty much the same as above but this one shows popup after 5 seconds of scrolling .

```js
&amp;amp;lt;script&amp;amp;gt;
document.getElementsByClassName('popup-layout')\[0\].style.display = "none";
window.onscroll = function () {
if (document.body.scrollTop &amp;amp;gt; 500 || document.documentElement.scrollTop &amp;amp;gt; 500) {
setTimeout(function () {
document.getElementsByClassName('popup-layout')\[0\].style.display = "block";
},5000 }
}
&amp;amp;lt;/script&amp;amp;gt;
```

### **5\. Creating an Exit popup:**

![Creating an exit popup](Creating-an-exit-popup.gif)

Only confirmation alert popup will show and you can’t make changes in html of this popup. Use following line of code on a single page.

```js
&amp;amp;lt;script&amp;amp;gt;
window.onbeforeunload = function() {
return "You are about to leave"
}
&amp;amp;lt;/script&amp;amp;gt;
```

There is another variation you can make here. In this scenario, if the user moves his cursor beyond the browser screen, you can create a popup to convince the user to stay. Below is the line of code you will need.

```js
&amp;amp;lt;script&amp;amp;gt;
document.getElementsByClassName('popup-layout')\[0\].style.display = "none";
document.addEventListener("mouseout", function (event) {
document.getElementsByClassName('popup-layout')\[0\].style.display = "block";
});
&amp;amp;lt;/script&amp;amp;gt;
```

So guys, I hope this guide helped you through various types of popups. If you love animating your pop-up, you might want to check out this tutorial of [creating an animated CSS pop-up](/animating-simple-css-popup-tutorial/). Do try them and let us know your experiences.
