---
type: async
title: "The truth about CSS preprocessors and how they can help you"
date: "2015-11-17"
coverImage: "desdev-150x150.png"
author: Zakary Hughes
tags: ["CSS"]
---

As a preface to this article: preprocessors can be used for a variety of file types, but this article is going to focus solely on CSS preprocessors. Additonally I'm going to try and avoid my personal bias and give a very generic description of CSS preprocessors rather than my preferred preprocessor.

## Introduction

First off what is a preprocessor? To give you a simple analogy think of speaking with someone, in a language you understand, who has a strong accent or is speaking in a different dialect. They're technically speaking the same language as you, but actually understanding what they're saying can be next to impossible.

In the context of CSS, the "normal" or unaccented language would be CSS and the accented version would be the preprocessor! What this means in practice is that you're writing out expressions that resemble standard CSS, but with some very distinct differences with regards to its syntax.

As with regular spoken language, there's not a whole lot we can do with something we can't understand. Luckily there are translators, and the same is true of preprocessors. The preprocessor code can be processed (there are a number of different ways to accomplish this), and then out pops an understandable standard-syntax CSS file ready to be used.

Now why would we want to write CSS in some weird way you might ask? An excellent question! Because our nonsense can be translated into regular CSS, this allows us to write some very robust and even dynamic CSS expressions.

## New Toys

With preprocessors we've got a bundle of features now available to be used along with all the standard CSS rules we're accustomed to writing.

To name a few features supported by preprocessors we've got: functions, mixins, math, variables, operators, conditionals, iteration and more to help you be more organized and write less overall.

### Variables

Variables increase your maintainability drastically by making it so you only have to change a value in one place to affect it everywhere it was used. Imagine for example you want to add a Halloween theme to your site's colors.

```css
.elementOne {
    background-color: orange;
}
.elementOne p {
    color: black;
}
.elementTwo {
    background-color: orange;
}
h3 {
    color: black;
}
a:hover {
    color:orange;
}
```

Changing them back would require you to go and change each instance of black or orange. However; with variables you can do something like this.

```css
$theme-color-1: orange;
$theme-color-2: black;
 
.elementOne {
    background-color: $theme-color-1;
}
.elementOne p {
    color: $theme-color-2;
}
.elementTwo {
    background-color: $theme-color-1;
}
h3 {
    color: $theme-color-2;
}
a:hover {
    color: $theme-color-1;
}
```

Define the value of the variable in one place, and everywhere it gets used will be a reference to that value. Want to change all instances of black back to grey? Just change the variable definition and you're done.

### Functions & Friends

Another one of the biggest features would be functions. With these you can set up one well written function definition and then sit back and let it do all the heavy lifting for you!

Functions combined with math, variables, iteration, and conditionals allows you to write some very dynamic style rules. Think of sprite sheets where the value of the background position is being incremented with each statement. Instead of writing out each one by hand, make a function that uses math and iteration to change the background position.

That's a very simple example, but I've seen some truly impressive and complicated designs created with the use of functions!

### Selectors

One of my favorite features of preprocessors are the new selectors. The parent reference (&) allows you to group your rules so that everything pertaining to a specific element can be grouped together nicely.

```css
.someElement {
    some-rule: some-value;
    &amp;:hover {
        color: some-color;
    }
}
```

Compiles to...

```css
.someElement {
    some-rule: some-value;
}
.someElement:hover {
    color: some-color;
}
```

The parent selector takes whatever follows it immediately and tacks it on to the parent that it is nested under. In this case hover will be appended to .someElement. Another great one to check out is the root reference!

## Nesting and General Aesthetic

CSS's default format is ugly as sin. An endless tide of barely indented rules, hopefully organized in some meaningful way. With CSS preprocessors nesting is an awesome feature that helps your rules become more intuitive/logically grouped and increases readability. Nesting can give your CSS a much more distinct visual hierarchy not unlike HTML.

```css
.someElement {
    some-rule: some-value;
    .someOtherElement {
        some-rule: another-value
    }
}
```
  
Compiles to...

```css
.someElement {
    some-rule: some-value;
}
.someElement .someOtherElement {
    some-rule: another-value;
}
```
  
Full disclosure, your resulting CSS file will still likely look like someone dropped their bowl of Alphaghetti in their bowl of Alphabits and then threw that bowl at a wall. However; the file you actually work in will be considerably prettier, and that's all we care about.

Some people have beef with preprocessors because of over done selectors which are a result of going a little too hard with nesting. An easy way to avoid this is by limiting your nesting to 3 levels deep. Any further than that gets pretty ugly, but hey I'm not your supervisor... if you feel it's necessary then you do what you gotta do.

## Processing dependant

Now depending on how you choose to have your preprocessor code processed these features may or may not be more/less accessible. That being said I still feel they are worth mentioning.

Auto updating the page you're working on is a small perk but I remember being quite happy to find out I could just save my project and not have to spam F5 like my little sister trying to buy front row Justin Bieber tickets online. Just save and it will update your project automatically.

Another one is vendor prefixes. There are a handful of ways to stop writing these things out by hand each time. Whether it's via mixins, functions or a built in feature of the processor itself you can avoid writing out these dreadfully monotonous prefixes for good.

## Conclusion

At first it might seem like a bunch of new stuff you have to learn and implement... but really if you already know CSS you're over halfway there. All you need to do is learn the specific syntax and familiarize yourself with the new features available to you with the preprocessor of your choice. It's a gentle learning curve with a surplus of benefits to integrate preprocessors into your workflow.

This article is by no means all encompassing, but rather a sampler to create enough interest to try it out and learn more about preprocessors.

On that note there are [resources](http://csspre.com/compile/) for comparing the preprocessors as well as trying them online. Each one has its own perks so try 'em out and find the one that fits your style!
