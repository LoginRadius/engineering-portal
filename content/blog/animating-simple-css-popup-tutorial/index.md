---
title: "Animate the modal popup using CSS"
date: "2015-03-23"
coverImage: "simplepop.png"
author: "Team LoginRadius"
tags: ["Slide","CSS","Swirl","PopUp"]
description: "Learn how to animate the modal popup using CSS keyframe"
---

By now you’ve probably seen the cool and simple way(not to mention, without using jQuery) of creating a  popup by Zoie Carnegie. If not, you can click this [link](/blog/simple-popup-tutorial/) to go and follow that tutorial. Cool?

Once you’re done creating your css popup. We’re now going to animate it with CSS3. Why? because we’re tired of seeing things that just pop onto users screen and you don’t know where it came from. Also, to make it fun for your users. Let's get started.

First things first. CSS3 animations don't work on "display: none" or "block". So, we need to modify Zoie's code to not do that and just simply add and remove the relevant class.

```css
// Close Popup Event
closePopup.onclick = function() {
    overlay.className = ''; /*This removes all classes, use at your own risk*/
    popup.className = ''; /*This removes all classes, use at your own risk*/
};
// Show Overlay and Popup
button.onclick = function() {
    overlay.className = 'show';
    popup.className = 'show';
}
```

We need to modify the CSS too.

```css
#popup {
  visibility: hidden;
  opacity: 0;
  z-index: -1; /*hide it in the back of the page*/
}
#overlay {
  visibility: hidden;
  opacity: 0;
  z-index: -1; /*hide it in the back of the page*/
}
```

Now, why did I do that? Since, we can't use display: none, we need to find a way to hide it differently. CSS3 animation works perfectly with "visibility: hidden", "opacity" and "z-index". I know it's a bit more CSS but, I assure you that it's worth it.

**Slide Down**

Let's start with a simple one. Sliding them pops, yo!
```css
/*Add defaults*/
#popup {
  top: -50%; /*Put it on the very top*/
  transition: all .5s ease-in-out; /*make it smooth*/
}
/*Now show it*/
#popup.show {
  visibility: visible;
  z-index: 200;
  opacity: 1;
   top: 50%; /*slide it down smoothly*/
}
#popup.show ~ #overlay {
  opacity: 1;
  visibility: visible;
  z-index: 100;
}
```

The "top: -50%" will push our pop-up outside while "top: 50%" will bring it back to the center. Now, combine it with a CSS transition and it will gracefully slide down along with the fading effect of opacity. Pretty neat huh? How about making it pop up from the center of the page? I mean it's called "pop-up" for a reason right?

We can achieve that effect by using the same code we made earlier. Just change the "top: -50%" to "transform: scale(0)". This will scale our beloved pop-up to a small size. The showing it part will have to change too. Same as the default, change the "top: 50%" to "transform: scale(1)". This will then scale it back to original size.

```css
/*Add defaults*/
#popup {
  transform: scale(0) /*scale it to a smaller size*/
  transition: all .5s ease-in-out; /*make it smooth*/
}
/*Now show it*/
#popup.show {
  visibility: visible;
  z-index: 200;
  opacity: 1;
  transform: scale(1) /*scale it to a default size*/
}
#popup.show ~ #overlay {
  opacity: 1;
  visibility: visible;
  z-index: 100;
}
```

Want to try something different than that? I got your back.

**Swirly Pop**

Have you heard of CSS keyframes? We're going to use that to achieve what we want. I just want to say first that CSS keyframes **do not** work on older browsers like IE8 and IE9. Use this trick at your own risk.

The keyframes code looks like this
```css
@keyframes pop-swirl {
  0% {
    transform: scale(0) rotate(360deg);
  }
  60% {
    transform: scale(0.8) rotate(-10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
```

The word "pop-swirl" is the variable we need to call later on to trigger that animation or keyframe. You can name this to whatever you want, there are no restrictions. The animation works by specifying your start and end points. There's 2 ways you can do that, either by using "from" and "to" or "0%" to "100%". I prefer the 2nd way because you can add like 100 keyframes to it.

Calling that code will need the help of an "animation" tag. This is like a transition but more advanced. I also like to point out that right now, It's not fully supported yet but you can still use it by appending your vendor prefix like "-webkit-". Like this...
```
\-webkit-animation: pop-swirl 1s ease forwards;
```
Let's break this down

**\-webkit-** = Vendor prefix.  
**animation** = Used to call the keyframes.  
**pop-swirl** = The variable we used on keyframes.  
**1s** = Duration of animation.  
**ease** = Timing function. This can also make the animation smoother.  
**forwards** = This is the [animation play state](http://www.w3schools.com/cssref/css3_pr_animation-play-state.asp).

Using the same method as Slide Down and Pop In. We just need to remove top or transform tags and add the animation tag in it.
```css
/*Don't need the defaults*/
/*Now show it*/
#popup.show {
  -webkit-animation: pop-swirl 1s ease forwards; /*trigger the keyframe*/
  visibility: visible;
  z-index: 200;
  opacity: 1;
}
#popup.show ~ #overlay {
  opacity: 1;
  visibility: visible;
  z-index: 100;
}
```
**Bonus!**

**The Anvil Effect**

Let's shock your screen with this heavy pop-up. You can achieve the anvil effect by using this code.

```css
@keyframes anvil {
  0% {
    transform: scale(5) rotate(0);
    opacity: 0;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0);
  }
  50% {
    transform: scale(1) rotate(-0.2deg);
    opacity: 1;
    box-shadow: 0 0 0 rgba(241, 241, 241, 0.5);
  }
  75% {
    transform: scale(1) rotate(0.2deg);
    opacity: 1;
    box-shadow: 0 0 250px rgba(241, 241, 241, 0.5);
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
    box-shadow: 0 0 500px rgba(241, 241, 241, 0);
  }
}
#popup[data-pop="anvil"].show {
  -webkit-animation: anvil 1s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  visibility: visible;
  z-index: 200;
  opacity: 1;
}
#popup[data-pop="anvil"].show ~ #overlay {
  opacity: 1;
  visibility: visible;
  z-index: 100;
}
```


Of course a tutorial won't be complete without a demo.

[Slide Down Demo](https://codepen.io/notdarryltec/full/ByOBvj/) [Pop In Demo](http://codepen.io/notdarryltec/full/YPOKdb/) [Pop Swirl Demo](https://codepen.io/notdarryltec/full/yyxBZo/) [Anvil Demo](https://codepen.io/notdarryltec/full/KwxPrm/)

And there you have it. A little something to spice up your pop-up game. I hope this helps you woo your users and entertain them. Until next time. Cheers.
