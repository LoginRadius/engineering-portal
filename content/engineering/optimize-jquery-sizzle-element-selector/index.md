---
title: "Optimize jQuery & Sizzle Element Selector"
date: "2015-11-05"
coverImage: "jquery-sizzle-element-selector-150x150.png"
author: "Govind Malviya"
tags: ["Engineering", "JQuery"]
---

Almost every active website worldwide uses jQuery, you can check stats [here](http://trends.builtwith.com/javascript/jQuery) , but using it without optimization might make the DOM very slow. The same goes for other javascript libraries, such as SizzleJS. To ensure the performance of your DOM, you have to follow some best practices for it.

In this article I am going to list down some of the most critical factors that you need to watch out. Even though this not a complete list; taking care of these will help you optimize those jQuery Selector.

### **Let's start!**

#### Always cache your selector

Whenever you apply any selector in jQuery or [SizzleJS](http://sizzlejs.com/),  the selector engine goes through the whole DOM to find the specified element.

For example, if you use the code below, it will go through the whole DOM twice in order to find ".myClass" selector.

```js
$(".myClass").show();

$(".myClass").addClass("anotherClass");
```


But instead of that, if you make all the methods in a chained format like this. It will only try to find that class once.

```js
$(".myClass").show().addClass("anotherClass");

```

Or if you want to use this element in other places; you can do so by doing it in this way.

```js
var myElem = $(".myClass");

myElem.show();

myElem.addClass("anotherCLass");
```

In both of these cases, the selector will be executed only once. Some selectors are very slow to traverse and passing them again and again will make your DOM very slow.

Read on the next point to understand,  how the type of selector affects performance.

#### Prioritizing selectors based on their performance

Selector's type affects the performance of your site. SizzleJS is a smart selector engine that also uses native js APIs for finding specific element. This is the main reason why ID selector and tag selector perform faster than others. But, if you prefer using jQuery, it’s pretty much the same. Modern browsers also have an API to find an element by class name but, let’s just focus on jQuery and SizzleJS.

- The order of selector's performance (fast -> slow) is
- ID selector ($("#ID")) \= Fastest
- Tag ($("Tag")) \= Fast
- Class ($(".Class")) \= Average
- Attribute ($("\[Attribute='Value'\]")) \= Slow
- Pseudo ($(":pseudo")) \= Slower

You can verify performance. In some exceptional cases, the selection of those tags does not matter; It’s all in the combination of the selectors. Because, it affects the performance of your site, let's discuss this on next point.

#### Selecting ID selector first and then other ones

If you have the combination of selectors, then the sequence of selectors matter for optimization. For example:
```js
$("#someId div .someClass");
```

The same code can be written as:
```js
$("#someId").find("div .someClass");
```

Both of these variant represent the same thing but in the term of performance, second one is better. The reason for that is because in the first code, Sizzle will go through the DOM 3 times to find #someId, div, and .someClass.

In the second one, the selector engine will go through the DOM again but, this time, it’ll only look for #someId and then find the rest inside that element without going through the DOM again.

See how this will affect performance.

#### Being more specific in right hand side instead of left hand side

Sizzle executes selector from right to left so it will definitely  improve performance if applied in right except left.

**Unoptimized code:**
```js
$( "div.myclass .myChildClass" );
```

**Optimized code:**
```js
$( ".myclass td.myChildClass" );
```

If you don’t see the difference, find the div and td.

#### Selection inside a parent always improves performance

When you have a context, or any level of parent, then you can select an element inside that parent. It will perform better this way than selecting it directly. Because, in this case, the selector engine goes through the DOM once to find the parent.

For example, assuming you are trying to find “.child” class:

```js
$(".child");
```
Is slower than
```js
var parent = $("#parent");

parent.find(".child").show();
```

You can also specify context by following syntax
```js
$(".child", parent).show();
```

#### Excessive selector slows down your query

The selector engine always checks every selector you have specified and it might traverse slowly. That being said, always make sure to specify minimum selectors in order to maintain the performance.

For example, you are  trying to find “.myClass” using both of these code variants,
```js
$("#div div span.myClass");
```
Is slower than
```js
$("#div").find(".myClass");
```
####
**The .children() tag is quicker than .find()**

In case, you are trying to find a children element, it is recommended to use .children() instead of .find(). Using .find() will tell jQuery to look on every level of children, while .children() will find only the first level children. Therefore .children() is faster than .find().

For example, you are trying to find “.child” inside $parent and it is the first level children of the $parent.
```js
parent.find(".child");
```

Is slower than
```js
parent.children(".child").show();
```
####
Use minimum DOM append

DOM manipulation is very heavy so always try to ignore or minimize using it.

For example, by using the code below, it will make the process sluggish because you didn’t apply any selector caching. Resulting in going through  the DOM ten times and appending an element.

```js
for( var i = 0; i < 10; i++) {
    $(".myClass").append("");
}
```


But instead of using the above code, using the code below will solve the whole issue of appending and traversal. Not only that, it will merge the 10 times manipulation of DOM into a single call.

```js
var myClassInnerHtml = "";
for( var i = 0; i < 10; i++ ){
    myClassInnerHtml += "";
}
$(".myClass").append(myClassInnerHtml);
```


All the tips I have mentioned above is highly dependant on your requirement but one thing is for sure; Optimization will definitely improve your process.  ‘SizzleJS’ is most the powerful and quick element selector. But, without writing optimized code you can’t prevent the DOM from freezing. With that being said,  jQuery is awesome but without optimized code it can get more DOM freezes and frustrate your users.

I hope this help you optimize your element selecting. Thank you and have a great coding.
