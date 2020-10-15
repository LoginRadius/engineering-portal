---
title: "Start using template strings now!"
date: "2020-10-15"
coverImage: "16-JavaScript-Hacks-to-save-time-and-boost-productivity-768x555.png"
author: "Team LoginRadius"
tags: ["Engineering","JavaScript","Strings"]
description: "Boost your code with template strings."

---

Working with strings is not that easy when it comes to JS. Keep in mind that this is about vanilla JavaScript (or just simply JavaScript, no frameworks here, right?).

Strings are a series of characters, no big deal here if you´re not a beginner. If you are, a string is how you´re going to store text, like your name, a product description or anything else text related. 

Here´s how **template strings** work in a very simple way:

### **1. With template strings**

Example:
```js
function killRoach (mop){
 return `I killed the roach with ${mop}.`
 };
 killRoach("my mop");
 
 // Output: I killed the roach with the mop.
```

It doesn´t seem to be that useful, huh? Let´s see how it would be without template strings.

### **1. Without template strings**

Example:
```js
function killRoach (mop){
 return "I killed the roach with" + mop + "."
 };
 killRoach ("my hands");
 // Output: I killed the roach with my hands.
```


Just picture having to do this a dozen times a day, picture the poor one that will maintain this code. 

This quotation marks and sum operators hell may seem harmless but they will surelly melt your brain when it´s 2pm and you have to get things done.

It´s a powerful move that will make your code more readable and easier to work with, not to mention the elegance it brings to it. You´ll save time, focus on harder tasks with just a simple change as this.

No more keyboard punching, hair pulling and despair working with a pletora of strings. Easy and effective.

Did you start already?

