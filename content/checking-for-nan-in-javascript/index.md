---
title: "NaN in JavaScript: An Essential Guide"
date: "2019-11-22"
coverImage: "numbers-1.jpg"
author: "Greg Sakai"
tags: ["JavaScript"]
description: "In this guide you'll learn about JavasScript NaN, how to verify whether a value is NaN, and how to manage NaN effectively."
type: "async"
---

You'll learn about JavasScript NaN in this tutorial, how to check whether a value is NaN, and how to effectively handle NaN.

## What is NaN in Javascript?

NaN, in JavaScript, can be many things. In fact, it can be almost anything, so long as it is _Not a Number_. Its type is technically “number” (when evaluated with “typeof”), although it stands for **Not a Number**.

## Values in NaN Javascript

Values can become NaN through a variety of means, which usually involve erroneous math calculations (such as 0/0), or as a result of type coercion, either implicit or explicit.

A common example is when you run parseInt on a string that starts with an alphabetical character. This isn’t exclusive to parseInt, as it also applies when using explicit coercion with Number(), or with the unary “+” operator.

## How to check NaN in Javascript?

Before selecting a method for checking for NaN, _how should you_ **_not_** _check for NaN?_

NaN is a bizarre value in JavaScript, as it does not equal itself when compared, either with the loose equality (==) or strict equality (===) operator. NaN is the only value in the entire language which behaves in this manner with regards to comparisons.

For example, if parseInt(“a”) returns NaN, then parseInt(“a”) === NaN will return false. This may seem strange, but it makes perfect sense after thinking about what NaN really is.

NaN doesn’t tell you what something is, it tells you what it **isn’t**.

These two different strings being passed to parseInt() will both return NaN.

```javascript
parseInt(“abc”) // NaN
parseInt(“def”) // NaN
```

Both statements return NaN, but are they _really_ the same? Maybe, but it certainly makes sense why JavaScript would disagree, given that they are derived from different string arguments.

Here are a few examples of strict inequality comparisons, which demonstrate the inconsistency of NaN.

```javascript
2 !== 2 // false
true !== true // false
“abc” !== “abc” // false
...
NaN !== NaN // true
```

### Method 1: isNaN or Number.isNaN

JavaScript has a built-in method, appropriately named “isNaN,” which checks for NaN. There is a newer function called Number.isNaN, which is included in the ES2015 spec.

The difference between isNaN and Number.isNaN is that isNaN coerces the argument into a number type. To avoid complicated and unexpected outcomes, it is often advised to use the newer, more robust Number.isNaN to avoid these side effects.

Number.isNaN does not perform any forcible type conversion, so it simply returns the boolean based on the parameter.

Here is an example of the difference between the two methods:

```javascript
isNaN(undefined) // true
Number.isNaN(undefined) // false
```

isNaN, when passed undefined, returns true because undefined becomes NaN after number coercion. You can test this yourself by running Number(undefined). You will find that it returns NaN.

Number.isNaN, on the other hand, returns false. This is because no coercion takes place, and undefined is _not_ NaN, it is simply undefined.

It is also important to note that Number.isNaN is a newer (ES2015) [method in JavaScript](https://www.loginradius.com/blog/async/16-javascript-hacks-for-optimization/), so browser support for Number.isNaN is not as stable as isNaN, which has been around since ES1 (1997).

### Method 2: Object.is

`Object.is` is a JavaScript method which checks for sameness. It generally performs the same evaluations as a strict equality operator (===), although it treats NaN differently from strict equality.

`Object.is(0, -0)` will return false, while 0 === -0 will return true. Comparisons of 0 and -0 differ, as do comparisons of NaN. This concept is called “Same-value-zero equality.”

```javascript
NaN === NaN // false
Object.is(NaN, NaN) // true
```

`Object.is(NaN, NaN)` will in fact return true, while we already know that NaN === NaN returns false. That makes this yet another valid way to check if something is not a number.

## Conclusion

Between the given methods of checking for NaN, the most common is to use the global isNaN function, or the ES2015 Number.isNaN method. While method #2 is valid, most people will typically use isNaN or Number.isNaN, which were created specifically for checking for NaN.
