---
title: "Use PHP to generate filter portfolio"
date: "2015-05-19"
coverImage: "php-filter-portfolio.png"
author: Lucius Yu
tags: ["PHP"]
---

**Overview**

Filter Portfolio can be very useful for websites, especially when there is a lot of images you want to show to users. It is always nice to keep it into different categories and allow your user to play with them.

But adding a tag and a div on hundreds of images is definitely not fun. Our goal today is to use PHP to generate the Filter Portfolio instead of manually adding them one by one.

The logic is like this, first we have a folder to contain all the portfolio images. It could be like this:

"assets->img->logos->businesses"

![folder-structure](folder-structure.png)

And in the "businesses" folder, we have some sub-folders to put all the images in different categories, like this:  

Each sub-folder contains different images in that category, and our goal is to use those sub-folders name as the filters, and the images under each category will be added automatically. Lets do it.

- First we need to implement a filter portfolio.

I know people hate this, but we are going to use a little pre-built javascript file called MixitUp, I promise it is a very easy but powerful tool to use, see a [demo here](http://www.jqueryrain.com/?URGti1_4).

There is already very comprehensive tutorial on how to install that plugin  in their [github](https://github.com/patrickkunka/mixitup) repository, you can follow either of these.

1. **Download the javascript file from github**

Click this link [git -> src](https://github.com/patrickkunka/mixitup/tree/v3/src) to open the repository for the javascript file, download and save it in your asset folder.

1. **Import js and css**

You can do this right before the closing body tag. You probably have Jquery installed already, but just in case you don't.

```js
<!--
-->
```

  
It is recommended to link your Mixitup function while your document is ready, so add this after the importing lines.

```js
<!--
$(document).ready(function(){
    jQuery(function(){
        $(function() {
            $('#Container').mixItUp();
        });
    });
});
-->
```

1. **Add the code**

Here is where the fun begins! I am not going to do any stylings in this tutorial, since you can always customize it yourself. Okay, first of first, add a div as a container of your filter portfolio section, so:

```js
<!---->
```

  
Next, we need to add those clickable filter buttons to the div we just created. We can add them programmatically, but to be honest, it is not that bad to do it manually.

```js
<!-- All 
 Eateries 
 Cafes 
 Bars, Clubs & Lounges 
 Lifestyle 

 Health & Fitness 
 Fashion 
 Beauty & Spas 
 Entertainment -->
```

  
Please note, for these `<a>` tags, you need to follow the patterns of MixitUp. Basically in class attribute you need to specify "filter" for it, and in data-filter, you need to tell which category it is. Next we are going to write some PHP code, to iterate through the destination folder, and process the files within it.

```php
<!--
valid()) {
    if (!$it->isDot()) {
        $subject = $it->getSubPathName();
        // Mac OS automatically creates .DS_store file to store metadata
        // The following regex is used to ignore those files
        $pattern = '/\\.DS/';
        preg_match( $pattern, $subject, $match );
        if( !$match ) {
            $file_path_name = str_replace("\\", "/", $subject);
?>
    <div class="mix getSubPath(); ?> col-md-3 ">
        <img src="" alt="" class="business-logo-img"/>
    
next();
}
?>
-->
```

  
The code is pretty straightforward, just want to label out a couple of things.

First, we specified which folders we are working with and then we used a built-in recursive iterators to cycle through the folder.

For each item we found in every sub-folder, $it->getSubPath will return the sub-folder name and $it->getSubPathName will return the name of the file. Create a div for each image, and play with those returned parameters to fit them into the pattern of MixitUp.

The $it->isDot() function and regular expressions are used to filter out some system hidden files such as ".DS\_Store" and others, since we do not want to them to be shown as images.

Easy, right? If you like this post, click share and help people who's having this kind of issue.
