---
type: async
title: "Introduction to Web Accessibility with Semantic HTML5"
date: "2019-07-24"
coverImage: "handicapped.png"
author: "Greg Sakai"
tags: ["HTML5", "HTML", "Web Accessibility", "Semantic HTML5"]
---

**What is Web Accessibility?**

Web Accessibility (often stylized “a11y”), is the practice of ensuring that your websites and web applications are accessible by people with disabilities of many kinds.

Some examples of common disabilities which we need to consider are: Blindness and visual impairment, deafness and hearing difficulties, motor skill impairment, and many more.

The common categories of disabilities include:

- Auditory
- Cognitive, learning, and neurological
- Physical
- Speech
- Visual

_This list was taken from the W3C Web Accessibility Initiative (WAI). A link to their resources can be found at the bottom._

**What is Semantic HTML? What is its correlation with Web Accessibility?**

HTML semantics refers to conveying meaning through the use of HTML elements. An example of _semantic_ HTML would be using **`<header>`**, **`<main>`**, **`<footer>`**, and other content-specific tags when applicable. _Unsemantic_ HTML would be using **`<div>`** or **`<span>`** tags for every use-case.

**Images and “alt” attributes**

Users who are visually impaired may encounter trouble when the content of a website relies on an image. Luckily, there are precautions that we - as developers - can take to ensure that their user experience does not suffer because they are unable to see images.

The easiest way to do this is to add an **alt** attribute to **all** of your **`<img>`** tags. This way, screen readers will be able to describe the image to the user. Here are a few suggestions and best practices for writing **alt** text:

- **Do not include words like “image”, or “picture”.** It is redundant, because the screen reader will notify the user that it’s an image. An exception to this would be if the image is of a painting, or an illustration. In this case, emphasizing that is fine, because you want the user to know that it’s specifically a painting, as opposed to any image.
    - Example: **alt=”Painted portrait of Albert Einstein”**
- **Always include the alt attribute**, even if you don’t want the screen reader to read it. If you have a decorative image (one that is simply cosmetic, and not necessary for the site), then you can add an **alt** tag and assign it to an empty string. In this case, the image will be ignored by the screen reader. If this is neglected, the screen reader may read the file name instead, which may not be particularly helpful.
    - Tip: you can also assign an attribute of **role=”presentation”** for decorative images. This can be done in addition to the alt attribute.
- **Keep it concise.** While there is no limit for length of **alt** text, some screen readers will cut off the alt text at around 125 characters. Either way, you don’t want to waste the user’s time by having their screen reader read a needlessly long description.

**Form Labels and ARIA Labelling**

Users with screen readers will need some way to differentiate between multiple inputs on a single form. Without labels, the user will have a difficult time figuring out what each input is for.

The easiest way to implement form labelling is with the HTML **`<label>`** tag. The **`<label>`** element uses an attribute called `for` in order to form a relationship with the ID of the **`<input>`** tag.

Another way to give context to a screen reader is with the ARIA **`aria-labelledby`** attribute. This attribute can be placed on (but not limited to) **`<input>`** tags, and then reference the **id** of the label. You can use **`<label for=””>`** in conjunction with **`<input aria-labelledby=””>`** in order to provide extra support and maximize compatibility.

**Buttons and Tabindices**

Buttons should use **`<button>`** tags (or **`<input type=”submit”>`** if applicable), rather than **`<a>`**, **`<span>`**, **`<div>`**, or anything else that doesn’t have semantic meaning for clickable buttons. Often people choose to use these tags, because they want to clear all styling and not have default **`<button>`** styling. This is ill-advised because **`<button>`** tags come with a ton of functionality built-in, an important part being its **`tabindex`**. A user who isn’t able to use a mouse, and must navigate the site with their keyboard, will press the **`tab`** key to jump through interactive elements. Standard **`<div>`** tags are not tabbable by default, and assigning a **`tabindex`** to it manually can break the flow of the natural tabindices of the page.

**Other Semantic HTML tags**

Other than images and forms, there are still many ways to provide the best accessibility possible. Semantic HTML tags are useful because they describe the content and the relationship with your overall page. Using appropriate, accurate tags such as **`<article>`**, **`<aside>`**, **`<section>`** will give screen readers an idea of what the role is for those sections.

Other elements such as **`<h1>`** and other heading tags should be carefully planned before sprinkled throughout your webpage. The **`<h1>`** through **`<h6>`** tags should form direct relationships with each other in order to differentiate their meaning. Headings with lower importance (relative to the previous heading) can be used to start new subsections within its current section. Your different page sections can even use **`aria-labelledby`** to point to its corresponding heading in order to label your sections accurately.

The full W3C specification on HTML semantics can be found at: [https://www.w3.org/TR/2016/REC-html51-20161101/dom.html](https://www.w3.org/TR/2016/REC-html51-20161101/dom.html).

More information about the varying disabilities and barriers can be found at: [https://www.w3.org/WAI/people-use-web/abilities-barriers/](https://www.w3.org/WAI/people-use-web/abilities-barriers/)
