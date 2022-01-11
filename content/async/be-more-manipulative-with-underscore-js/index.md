---
title: "Be More Manipulative with Underscore JS"
date: "2016-02-16"
coverImage: "underscore.png"
author: "Zakary Hughes"
tags: ["JavaScript", "UnderscoreJs"]
---

Manipulating collections like arrays and objects can be a hassle with vanilla JS. Thankfully there are libraries like Underscore which offer some extremely useful low level utility functions.

Underscore JS provides much of the array/collection/object manipulating functionality similar to what you may have seen in other languages such as Ruby. As for calling the methods if you're familiar with JQuery, Underscore is identical except instead of "$" we use the library's namesake "\_" to access the methods.

Underscore has over 100 functions that can be used on collections, arrays, objects and functions (you read that right, function functions). I'm going to be discussing a few of the functions that work on collections, but definitely check out what else [Underscore has to offer](http://underscorejs.org/).

Once you know how to re-create the same output with Underscore syntax, you'll never want to go back to plain old JS and using nested for loops. One of the most helpful tools Underscore provides for accomplishing this is...

## \_.each

The \_each method does exactly what it sounds like. It works on collections (arrays or objects), and will iterate over each element in the collection invoking the function you specified with 3 arguments (value, index, list) with index being replaced by key if used on an object. It's also worth noting \_.each returns the list if you want chain some more manipulation after calling \_.each.

Here's a quick example showing how it can be used and what's available to you when you call it.

```javascript
var someArray = ["a", "b", "c"];
 
_.each(someArray, function (element, index, list) {
    console.log("value: " + element + " index: " + index + " list: " + list)
});
 
// outputs
value: a index: 0 list: a,b,c
value: b index: 1 list: a,b,c
value: c index: 2 list: a,b,c
```

With that out of the way, let's think about what this means in terms of cleaning up our code. To do the above normally we would write a little for loop like this.

```javascript
for ( var i = 0; i &lt; someArray.length; i++) {
    console.log("value: " + someArray[i] + " index: " + i + " list: " + someArray);
}
```  
Admittedly these two aren't all that different, but let's imagine we have a function defined elsewhere that will deal with handling the arguments passed in on each iteration. We can replace that same functionality with a significantly less verbose solution.

```javascript
_.each(someArray, doStuff);
```  
  
To quote Antoine de Saint Exupéry: "It seems that perfection is attained not when there is nothing more to add, but when there is nothing more to remove." While it may not be perfection, there are certainly arguments to be made about performance, I think you would be hard pressed to find anything further simplify this code.

## \_.map

While \_.each will return the original list you input, \_.map will allow you to manipulate or otherwise transform the input as you please and then returns the new array. Map needs a minimum of 2 arguments, first the collection and then the function to be executed on each iteratee and also accepts a third argument which dictates the context for the iterating function.

```javascript
var numbersObject = {1:1, 2:4, 3:9};
 
var productArray = _.map(numbersObject, function(value, key) {
    return value * key;
});
 
//proudctArray is now
[1, 8, 27]
```  

Before you go writing some functions to pass as an argument to \_.map be sure to take a peek at the other methods available in Underscore. Map is a little bit like having the Lego blocks to build whatever you want, but if you already have a pre-packaged Batcave available, it might not be the best use of your time building it from scratch.

## \_.pluck

To illustrate my childhood toy analogy let's talk about \_.pluck. Pluck is basically just a refined version of \_.map made for a specific use case. That's not to say there aren't ways of combining the two to achieve something a little more complex, but if standard \_.pluck behaviour is all you're after then don't go re-inventing the wheel.

Often with data objects we're interested in the values of a specific key, for example let's say we have an array of movies.

```javascript
var movies = [
    {title: "Dracula", genre: "Horror", star: "Nosferatu"},
    {title: "Cast Away", genre: "Drama", star: "Wilson"},
    {title: "Airplane", genre: "Comedy", star: "Leslie Nielsen"}
];
```  

Now we want to just have an array of the titles of these movies.

```javascript
var titlesArray = _.pluck(movies, 'title');
 
//titlesArray is now
["Dracula", "Cast Away", "Airplane"]
```  
  
Not much else to say about it, it works on collections and is extremely handy for a very common task.

## \_.filter

Another example of a more refined \_.map function that comes in handy often enough. Aptly named this method will return an array of only the things that make it through your test.

```javascript
var numbers = [1,33,6,24,8,21,11,22];
 
var lessThanTen = _.filter(numbers, function(number) {
    return number &lt; 10;
});
 
//lessThanTen is now
[1, 6, 8]
```  
Works on collections and kitchen sink faucets.

## \_.conclusion

Just kidding there's no \_.conclusion method.

I hope by now that you get the idea that if what you need to do isn't already a method, Underscore's \_.map is a powerful tool for accomplishing whatever obscure collection manipulation your heart desires.

So get out there, take a look through Underscore JS and start writing less obfuscated (nested) for loops with the help of \_.each.
