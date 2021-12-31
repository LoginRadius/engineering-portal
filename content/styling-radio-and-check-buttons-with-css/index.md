---
type: async
title: "Styling Radio and Check buttons with CSS"
date: "2015-06-16"
coverImage: "radio-check-buttons-css-1.png"
author: "Team LoginRadius"
tags: ["CSS"]
---

Let's face it, at some point you look at a radio or a checkbox button and you're like... this looks like something that starts with an "s" and ends with a "hit". I'm here to stop you from saying that word and go on with your life without worrying about those ugly things.

We're just going to use code here. No images, just pure scalable user interface using code. Cool, eh? Let's get started.

Let's create our code structure first.

```js
<!-- Radio --> 
<label>
<input type="radio">
<span>I'm a radio button</span>
</label>
<!-- Checkbox -->
<label>
<input type="checkbox">
<span>I'm a checkbox</span>
</label>
```
  
If it looks ugly, don't be alarmed. That's normal for an untamed code from the wild. All you gotta do now is to tame it with our very best tool, CSS.

First thing you have to do is to hide the element that generates the hideous button, which is... DUN DUN DUN... the input tag. Don't worry, we can still trigger it even though it's hidden. How? by nesting it inside the label tag.

Now that the default toggles are gone, we need to create our fake —but amazing— toggles.

**Radio Button**

We can't really customize this toggle that much because it needs other toggles to work properly. Let's just prettify it a bit.

```css
label input[type="radio"] {
    display: none;
}
label input[type="radio"] ~ span {
    position: relative;
    display: inline-block;
    padding: 3px 0 3px 25px;
}
label input[type="radio"] ~ span:before {
    content: "";
    position: absolute;
    display: block;
    width: 18px;
    height: 18px;
    background: #fff;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 50%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transition: all 300ms ease-in-out;
}
label input[type="radio"]:checked ~ span:before {
    border: 5px solid #29d;
}
```

![checked-radio](checked-radio.png)

![unchecked-radio](unchecked-radio.png)

By now it should like this.  
  

Cleaner toggles!

**Checkbox**

This one is fun to customize because it has an on and off feature or a switch. Let's start with a simple toggle. We're going to transform this hideous toggle (screenshot) to this beautiful creature (screenshot).

```css
label.spin input[type="checkbox"] {
    display: none; /*hides ugly toggle*/
}
label.spin input[type="checkbox"] ~ span {
    position: relative;
    display: inline-block;
    padding: 3px 0 3px 25px; /*adds spacing on the left*/
}
/*create our new toggle*/
label.spin input[type="checkbox"] ~ span:before {
    content: "\2713"; /*add a new check mark*/
    text-align: center;
    font-size: 13px;
    position: absolute;
    display: block;
    width: 18px;
    height: 18px;
    background: #fff;
    color: #fff;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 50%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transition: all 500ms ease-in-out;
}
/*if checked do this*/
label.spin input[type="checkbox"]:checked ~ span:before {
    transform: rotatez(360deg);
    background: #29d;
    border-color: #29d;
}
```
  
Oh yes! Beautiful toggle.

![checked-check](checked-check.png)

![unchecked-checkbox](unchecked-checkbox.png)

**Bonus!**

Have you ever seen those toggles where it slides to the left and right when you click it? Did you know you can do that too using CSS? Let's try it.

First, we're going to design the default look of an unchecked checkbox. By now you know that we need to hide the default toggle.

```css
label input[type="checkbox"] { display: none; }
```  
And then add a space on the left of the span using padding. While you're there, add a position relative to because we need to contain the rest of the elements inside the span.

```css
label input[type="checkbox"] ~ span { position: relative; display: inline-block; padding: 3px 0 3px 35px; }
```
  
Now, let's create our toggles using CSS pseudo element :before and :after. Why? Because generated CSS is easier to handle.

```css
label input[type="checkbox"] ~ span:before, label.slide input[type="checkbox"] ~ span:after {
    content: "";
    position: absolute;
    display: block;
    width: 18px;
    height: 18px;
    background: #fff;
    margin-right: 5px;
    border: 1px solid #ccc;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transition: all 300ms ease-in-out;
}
```

This will generate a box looking element. Since it's targeting both pseudo elements, they will look identical and on top of each other.

It's time to start prettifying those pseudo elements.

For :after, since this is the background where the :before toggle slides through. We need to modify the width to look bigger. Add an inset shadow to make it look like it's pushed through and a red background for an "off" effect.

```css
label input[type="checkbox"] ~ span:before {
    width: 30px;
    border-radius: 20px;
    box-shadow: inset 0 2px 5px -1px rgba(0, 0, 0, 0.4), inset 0 -2px 0 -1px rgba(255, 255, 255, 0.2);
    background: #F22613;
}
```

For :before, we just need to make it look like a circle and lift it off a bit using box-shadow.

```css
label.slide input[type="checkbox"] ~ span:after {
    box-shadow: 0 3px 4px -2px rgba(0, 0, 0, 0.5);
    border-radius: 50%;
}
```

The "on" part just needs a little bit of pushing to the side and changing the background to blue or green.

```css
label.slide input[type="checkbox"]:checked ~ span:before {
    background: #29d;
}
label.slide input[type="checkbox"]:checked ~ span:after {
    left: 13px;
}
```

The CSS is a bit longer here because there's a lot of elements that need to change, but take a chill pill because CSS won't slow your page down.

And that's it. Your pretty checkbox or radio button toggles.
