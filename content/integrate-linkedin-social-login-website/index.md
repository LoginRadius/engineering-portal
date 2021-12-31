---
type: async
title: "Integrating LinkedIn Social Login on a Website"
date: "2015-02-11"
coverImage: "linkedin-feat-img.png"
author: "Lucius Yu"
tags: ["LinkedIn", "SocialLogin"]
---

It is important nowadays to allow your user to sign in to your website with their social network account. It provides a better experience for your user and also lets you obtain more information about your user. The most welcomed social platforms are Facebook, Twitter, LinkedIn and Google. In this article, we will cover how to integrate LinkedIn social login authentication into your website.

<h2> Create a LinkedIn App </h2>

Creating an app for the social platform is always the first step, no matter which platform you are working with. In this case, the created app will service the LinkedIn social login. Basically, you are creating a gate to let your user go through this gate and access the service, and in this gate, you can specify the permissions and the preferences you want to grant to your user. You can refer to the instructions [here](https://www.loginradius.com/docs/api/v2/admin-console/social-provider/app-reviews/linkedin-app-review/) for clear instructions on how to create a LinkedIn social login app.

<h2> Set your App </h2>

After creating the app, you need to set the "JavaScript API domain" field for your app.  In that field, fill in your website URL. Here we have used http://localhost for this article.

![luciusblog2-1](luciusblog2-1.png)

<h2>Implement the script in your html file</h2>

Now you are ready to code! First, put this JavaScript code snippet inside your head tag:

```js
<!--<script type="text/javascript" src="http://platform.linkedin.com/in.js">
api_key: your_api_key_goes_here
-->
```

You can find your API key inside your application, the first entry under OAuth Keys "Consumer Key / API Key."  This script is used to load the LinkedIn script into your website, and it will not display anything on your page, at least not the frontend.

![luciusblog2-2](luciusblog2-2.png)

Next, you will need to add another script inside your body tag. It is actually used to display the sign-in button.

```js
<!--
Hello, ; .
-->
```

If everything has been implemented correctly, load your page, and you will see this lovely button appear on your site.

![luciusblog2-3](luciusblog2-3.png)

Want to extend your social systems with additional provider functionality? Check out this post on [Twitter social login](https://www.loginradius.com/blog/async/integrating-twitter-social-login/ "Integrating Twitter Social Login").
