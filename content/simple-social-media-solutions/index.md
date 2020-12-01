---
title: "Social Media Solutions"
date: "2015-10-08"
coverImage: "social-media.png"
author: Karl Wittig
tags: ["Social Media", "Social Login"]
---

Integrating social into your site can drastically improve user engagement with your platform. Below are a few useful solutions and implementation instructions.

## Social Login

Social Login, also known as Social Sign On, Allows you to bypass traditional registration forms and utilize the systems in place by social providers in order to retrieve a copy of the users data and a unique identifier for the user that can be used to identify that user in your system.

The following guides go over setting up Social Login with a few common Social Providers:  
Facebook: [How to Implement Facebook Social Login](/implement-facebook-social-login/)  
Twitter: [Integrating Twitter Social Login](/integrating-twitter-social-login/)  
LinkedIn: [Integrating LinkedIn Social Login on a Website](/integrate-linkedin-social-login-website/)

## Social Sharing

Most major social providers offer an easy tool to formulate and include sharing buttons on your pages. Below is an example of setting up an easy to use social sharing button with Facebook:

1. Include the Facebook JavaScript SDK on your page:

```js
<!---->
```

  
6. Next include the div that will contain the sharing button on your page with the following data attributes:
    1. data-href - Set this to the URL that you want to share.
    2. data-layout - Set this to one of the following to control the style of button that is displayed:  
        a. box\_count  
        b. button\_count  
        c. button  
        d. icon\_link  
        e. icon  
        f. link

Sample Div:

```js
<!-- -->
```

  
You can find information on generating sharing links with other providers in the following locations:  
Twitter: [https://about.twitter.com/resources/buttons](https://about.twitter.com/resources/buttons)  


Or you can contribute to our open source project on github-[https://github.com/social9](https://github.com/social9)

## Follow Company

Follow buttons work very much the same as the social sharing buttons above. Simply include the relevant SDK and div with some customizations and users will be able to follow(and un-follow) your brand directly from your page.

Below is an example of setting up a Twitter follow button:

1. Include Twitters JavaScript SDK using their provided script:

```js
<!---->
```

  
6. Include a link tag in the location that you would like to display your follow button:

```js
<!-- Follow @TwitterDev -->
```

  
You can set the data attributes in the above link to control various aspects of the follow button.

Find information on generating follow buttons for other social providers in the following locations:  
Facebook- [https://developers.facebook.com/docs/archive/docs/plugins/follow-button/](https://developers.facebook.com/docs/archive/docs/plugins/follow-button/)  


## Social Linking

One of the most common and easy to configure social integrations is setting up links to your companies Social profiles.  
All you need to do is create a link tag on your page:

```js
<!--Facebook-->
```

  
You can improve upon this by utilizing one of the Social providers branded icons to better display the linking UX. Get a copy of Facebooks Branded Icon [here](https://www.facebookbrand.com/).  
You can store the image locally and include it in the a tag:

```js
<!--<img src="" alt="Facebook"> -->
```

## Conclusion

Now that you have setup the above social features your users will have a variety of touch-points to keep them active and interacting with your site, seamlessly driving user conversions and making brand ambassadors of your users.
