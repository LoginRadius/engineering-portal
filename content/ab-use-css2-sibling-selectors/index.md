---
title: "How to ab-USE CSS2 sibling selectors"
date: "2015-08-18"
coverImage: "sibling-selectors.png"
author: "Team LoginRadius"
tags: ["Engineering","Selector","CSS"]
---

Hey there, spider. It’s me again, your amazing blog writer, Darryl. Have you ever wanted to select the second or third child of an element without using CSS3 nth-child —which aren’t working on grandpa browsers. Let’s face it, a lot of human beings are afraid of change that they tend to stick to what they know.

I’m not a pro “support the older browser” kind of guy because I still think that people won’t upgrade if we keep spoiling them. But for the sake of knowing a workaround I’m gonna teach you how to ab-use sibling selectors for better compatibility.

### What are sibling selectors.

Sibling selectors consists of a squiggly line ( ~ ) and a plus sign ( + ).

Squiggly line selects all the siblings below that element where you use that sign. Plus sign select only the next sibling.

### Great, give me the deets.

![lr-home](lr-home.png)

Have you ever seen our [support docs](https://docs.loginradius.com/)?  

Would you believe me if I tell you that from “Getting Started” to the “Social Sharing” section, they are all siblings with the same class and everything… well except for the css code and the search, we’ll get to that later.



Anyhoo, how did I do it? It’s easy, since I know that the sibling I want to get was the first child. I just used the :first child pseudo element to style the first element.
```css
.sibling:first-child {
/*styles for first sibling*/
}
```
  
Then again, that’s not a sibling selector, that’s a pseudo element. Calm your feets, this is the part where we ab-use those selectors.
```css
.sibling:first-child ~ .sibling {
/*styles for the rest of the sibling*/
}
```
  
Why would we do this? This is so it doesn’t add the style for the rest of the sibling to the first-child and vice versa. Less CSS to overwrite and eliminates the use of !important.

### Let’s go crazy.

How do we get the third child without using :nth-child pseudo element? It’s simple. Get the first child and ab-use your plus sign(+) sibling selector.
```css
<div:first-child + div + div {
/*styles*/
}
```
  
The best part is. It’s backwards compatible.

What about the 12th child? Well, you can just painfully type all those “+ div”.

Now, why would we do this? To support IE8, which I don’t like supporting but, maybe you do.

Keep experimenting with this technique and be free from any restrictions of IE8.
