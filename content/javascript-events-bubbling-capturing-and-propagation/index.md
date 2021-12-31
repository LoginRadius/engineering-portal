---
type: async
title: "JavaScript Events: Bubbling, Capturing, and Propagation"
date: "2019-07-22"
coverImage: "bubbles.png"
author: "Greg Sakai"
tags: ["JavaScript", "JavaScript Events"]
---

**A basic example of a JavaScript event**

Events, in JavaScript, are occurrences that can trigger certain functionality, and can result in certain behaviour. A common example of an event, is a “click”, or a “hover”. You can set listeners to watch for these events that will trigger your desired functionality.

**What is “propagation”?**

Propagation refers to how events travel through the Document Object Model (DOM) tree. The DOM tree is the structure which contains parent/child/sibling elements in relation to each other. You can think of propagation as electricity running through a wire, until it reaches its destination. The event needs to pass through every node on the DOM until it reaches the end, or if it is forcibly stopped.

**Event Bubbling and Capturing**

Bubbling and Capturing are the two phases of propagation. In their simplest definitions, **bubbling** travels from the _target_ to the _root_, and **capturing** travels from the _root_ to the _target_. However, that doesn’t make much sense without first defining what a target and a root is.

The _target_ is the DOM node on which you click, or trigger with any other event.

For example, a button with a click event would be the event target.

The _root_ is the highest-level parent of the target. This is usually the **document**, which is a parent of the **<body>**, which is a (possibly distant) parent of your target element.

Capturing is not used nearly as commonly as bubbling, so our examples will revolve around the bubbling phase. As an option though, **EventTarget.addEventListener()** has an optional third parameter - which takes its argument as a boolean - which controls the phase of the propagation. The parameter is called **useCapture**, and passing **true** will cause the listener to be on the capturing phase. The default is **false**, which will apply it to the bubbling phase.

Once you trigger the event, it will _propagate_ up to the root, and it will trigger every single event handler which is associated with the same type. For example, if your button has a click event, during the bubbling phase, it will bubble up to the root, and trigger every click event along the way.

This kind of behaviour might not sound desirable - and it often isn’t - but there’s an easy workaround...

**Event.stopPropagation()**

These two methods are used for solving the previously mentioned problem regarding event propagation. Calling **Event.stopPropagation()** will prevent further propagation through the DOM tree, and only run the event handler from which it was called.

```js
<!--Try it-->
```

```js
function first() {
  console.log(1);
}
function second() {
  console.log(2);
}
var button = document.getElementById("button");
var container = document.getElementById("container");
button.addEventListener("click", first);
container.addEventListener("click", second);
```

In this example, clicking the button will cause the console to print **1, 2**. If we wanted to modify this so that _only_ the button’s click event is triggered, we could use **Event.stopPropagation()** to immediately stop the event from bubbling to its parent.

```js
function first(event) {
  event.stopPropagation();
  console.log(1);
}
```

This modification will allow the console to print **1**, but it will end the event chain right away, preventing it from reaching **2**.

**How does this differ from `Event.stopImmediatePropagation()`? When would you use either?**

```js
<!--Try it-->
```

```js
function first(event) {
  console.log(1);
}
function second() {
  console.log(2);
}
function third() {
  console.log(3);
}
var button = document.getElementById("button");
var container = document.getElementById("container");
button.addEventListener("click", first);
button.addEventListener("click", second);
container.addEventListener("click", third);
```

Let’s suppose we wanted to add a third function, which prints **3** to the console. In this scenario, we will also move the **second** function to also be on the button. We will apply **third** to the container now.

**Long story short**: we have two event handlers on the button, and clicking **<div#container>** will now print **3**.

What will happen now? This will behave the same as before, and it will propagate through the DOM tree, and print **1, 2, 3**, in that order.

**How does this tie in to `Event.stopPropagation()` and `Event.stopImmediatePropagation()`?**

Adding **Event.stopPropagation()** to the first function, like so, will print **1, 2** to the console.

```js
function first(event) {
  event.stopPropagation();
  console.log(1);
}
```

This is because **Event.stopPropagation()** will immediately prevent all click events on the _parent_ from being triggered, but it does **not** stop any **other** event handlers from being called.

As you can see in our example, our button has two click handlers, and it _did_ stop the propagation to its parents. If you wanted to stop _all_ event handlers after the first, _that’s where_ **Event.stopImmediatePropagation()** _comes in._

```js
function first(event) {
  event.stopImmediatePropagation();
  console.log(1);
}
```

Now, the first function _really will_ stop the parent click handlers, and all other click handlers. The console will now print just **1**, whereas if we simply used **Event.stopPropagation()**, it would print **1, 2**, and not including either would print **1, 2, 3** .
