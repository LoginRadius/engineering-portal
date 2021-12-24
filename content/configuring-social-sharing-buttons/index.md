---
title: "Configuring Your Social Sharing Buttons"
date: "2015-06-09"
coverImage: "configuring-social-share-buttons-300x300.png"
author: "Karl Wittig"
tags: ["SocialSharing"]
type: "async"
---

Social sharing button offers an easy way to distribute your content to a wider audience. The major social providers allow options to configure the content that will be shared programmatically. In this guide we explore the options that you can use in order to configure the shared content of your social shares including: Message, URL, Image, and Image Caption/Description.

**Facebook**

Facebook utilizes Open Graph Tags which are meta tags that can be included on your page and are scrapped by Facebook when determining the content that should be shared with a specific button. These tags can be included in the head section of your page. All meta tags should be formatted with a property value of "og:<tag-name>", some useful tag names are:

- title- The title of your article.
- type- The media content that is included in the shared article. This is defaulted to "website".
- image- The image that will be included in the share.
- url- The canonical URL that will be used to identify the share and aggregate the community shares/likes.
- description- A  brief description that is displayed below the image in the share.

Example of og meta tags that can be included in your html head tag:

```js
<!--





-->
```

If you are modifying these tags it can take some time for the changes to translate over to Facebook. You can refer to [this blog](/social-provider-social-sharing-troubleshooting-resources/) on troubleshooting, testing, and force updating your configured sharing systems.

**Google**

Google offers multiple ways that you can set the shared content which it intelligently determines the most relevant details to be displayed in the share. This works to varying degrees with the following options available and taking precedence respectively:

- Structured Data Markup- HTML markup detailed on [http://schema.org/](http://schema.org/).
- Open Graph Tags- Turn your page into a rich data object, commonly used to customize Facebook sharing details. Information on the markup is available on [http://ogp.me/](http://ogp.me/)
- Title or Meta Description- HTML attributes that provide details on the site.
- Google’s best guess- If none of the above are included, Google will crawl your page and try to interpret the most suitable details to include in the share.

Below is an example of basic structured data markup:

```js
<!--
 Your Site Title


    A description of your site.

-->
```

Below is an example of using basic meta tags to define the shared content:

```js
<!--

-->
```

**Twitter**

The best way to customize your Twitter shares is to modify the URL query string parameters that gets triggered when the share icon is clicked. Another way is to customize the `<a>` tag by including data-attribute tags as detailed on Twitters [Tweet button creation instructions](https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview) . If you do not have control over the links or triggers that are being used to activate the Tweet popup you can also set Twitter Card meta tags which handle the Twitter customizations.

```js
<!--




-->
```

Various providers will utilize some of the above methods with open graph tags being one of the most common methods for controlling the shared content. Other systems will customize this content based off of parameters that are passed into the script or URL that is used to trigger the share interface. Getting these to be correctly configured can be a bit of a trial and error process, you can use the resources detailed in [this blog post](/social-provider-social-sharing-troubleshooting-resources/) to help test and verify that you have correctly configured your social sharing content.
