---
title: "CSS Responsive Grid, Re-imagined"
date: "2015-03-16"
coverImage: "desdev.png"
author: "Team LoginRadius"
tags: ["CSS", "Grid", "Responsive"]
---

I know what you're thinking. Why am I writing this blog? There's like a bunch of apps out there that do this thing automatically. See, that's the problem, "automatically". That means you have no control over it when it messes things up. Even if you do, you might mess things up for other stuff too.

This is why controlling your own code is better than letting other apps do it. Just like what my mentor said, "Don't let the apps write your own code, they screw it up".

**Let's get started**

Let's make a responsive grid without using any crazy percentages or complicated margins. Sounds cool? Good.

By now you know how complicated it is to calculate all the width and margins to make sure they correspond with each other. Not to mention that you need to use percentages on both of them which sometimes doesn't work, especially with our friend IE8.

What if we create a grid that doesn't need margins for spacing? Or using percentages to separate objects? Sounds awesome right? No more calculating for the right percentages and getting crazy numbers.

Let's start with 4 grids first. So 100 / 4 = 25 then add a percentage (%) sign and we get 25% for our 4 grid system. No crazy numbers there, but we need spacing. To add spaces between those elements just add padding on left and right. Pixels or percent, it's up to you. Yes, yes, padding adds width but, if you add "box-sizing: border box" on our lovely grid, the padding will start respecting your decision to add a width of 25% and start pushing everything inside.

![grid](grid.png)

There you have it, Spacing. By now your CSS code will look like this.

```css
div {
    width: 25%;/*4 grid system*/
    padding: 0 5px;/*spacing*/
    box-sizing: border-box;/*removes the added with from padding*/
    float: left; /*put them side by side*/
}
```
**Problem**

Of course, there's no perfect code. Since we're using padding on both left and right. you'll see some spacing too on the left and right side of your website. For example, I used 5px padding. That means I will have a 5px offset on the left and right side of my screen. It doesn't align with my site anymore.

**Solution**

To tackle this problem we need to add a margin on the parent of our grid. Since my padding is 5px, I need to add a -5px margin on left and right to stretch it back to it's intended size. So our code will look like this now.

```css
parent {
    margin: 0 -5px;
}
parent div {
    width: 25%;/*4 grid system*/
    padding: 0 5px;/*spacing*/
    box-sizing: border-box;/*removes the added with from padding*/
    float: left; /*put them side by side*/
}
```
 I'd like to also point out that if your parent has a width (which it doesn't really need because our grid css will add a width to the parent), the negative margins won't work. So, be careful.

Another thing to watch out for, because we're using floats, we will also need to use a clearfix hack on our parent.

Using the simple code we learned today will create all the grids you want.

1 = 100%  
2 = 50%  
3 = 33.33%  
4 = 25%  
5 = 20%  
6 = 16.66%  
7 = 14.28%  
8 = 12.5%  
9 = 11.11%  
10 = 10%

and so on.

See it on [codepen](https://codepen.io/notdarryltec/pen/emMpQB).

And this is where it ends. I hope this will help you easily create a grid in the near future. If you have any other tips, leave it in the comments and I'll be happy to try it out. Cheers.
