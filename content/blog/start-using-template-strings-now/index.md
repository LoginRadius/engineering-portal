---
title: "Start using template strings now!"
date: "2020-10-15"
coverImage: "coder.jpg"
author: "Team LoginRadius"
tags: ["Engineering","JavaScript","Strings"]
description: "Boost your code with template strings."

---

Working with strings is not that easy when it comes to JS. They might be easy to create but make no mistake, they´re tricky to manipulate because unlike most programming languages JavaScript didn´t interpolate strings inside of variables. It was about time for a change and ES6 finally brought **template literals** ,as it´s called on it, to help us.
Keep in mind that this is about vanilla JavaScript (or just plain JavaScript, no frameworks here, right?).

Strings are a series of characters and a character is the smallest unit of information. It can be a letter, a number, a symbol, a space and it equals to one byte.
No big deal here if you´re not a beginner. If you are, a string is how you´re going to store and manipulate text characters, like your name, a product description, numeric codes that match to your product description or anything else text related. 

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

It doesn´t seem to be that magical, doesn´t it? Let´s see how things would work out without template strings:

### **2. Without template strings**

Example:
```js
function killRoach (mop){
 return "I killed the roach with" + mop + "."
 };
 killRoach ("my hands");
 // Output: I killed the roach with my hands.
```

Just picture having to do this a dozen times a day, picture the poor one that will maintain this code after you. Take this basic code fragment with just one string to interpolate and think about having to this with uncountable strings uncountable times. I can feel the pain from here.

This quotation marks and sum operators hell may seem harmless at first but they will surelly melt your brain when it´s 2pm and you have to get things done by morning. With template strings you won´t have to worry about a plethora of sum operators that you´ll surelly forget to close when working with hundreds of lines of code.  Now they can be replaced with placeholders like ${expression} trapped with back-ticks. Why back-ticks? Because they were one of the few ASCII characters not used in JS. Why did it took so long for this? I wonder. 

Trust me, you´ll lose precious hours just to find out that a missing sum operator is that mysterious bug you can´t work out how to fix and when you do find it, it might be too late to apologyze to your team. 

It´s a powerful change that will make your code more legible and easier to work with, not to mention that you can also add functions and even JavaScript, not just variables to it. And the elegance it brings to your code will add the clean coder badge to your toolbox. You´ll save time, focus on harder tasks and worry less about string variables with just a simple change as this. It´s just too handy to not take it for granted and yet many developers keep doing things the same old way. It´s been about five years since ES6 implemented it and we still have to talk about it! Please don´t be that person.

And I didn´t even mention tagged templates literals and web templates which blew my mind, maybe something for another post.

No more keyboard punching, hair pulling and despair while working with a pletora of strings. Easy and effective. Just start using it!

Hope you don´t mind my roaches example. Did you start already?

