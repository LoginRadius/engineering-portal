---
title: "Integrating Twitter Social Login"
date: "2015-02-11"
coverImage: "twitter-feat-img.png"
author: "Karl Wittig"
tags: ["Twitter", "SocialLogin", "PHP"]
---

Implementing login using Twitter directly through their provided API endpoints can be tedious and require knowledge of external systems like the OAuth protocol. There are some useful libraries that can help you to quickly and easily implement a "Login using Twitter" button and get your users tweeting through your site. Below we go through the steps to setup a common PHP library used to handle Twitter social login authentication and functionality. Twitter has information on many common technologies libraries [here](https://dev.twitter.com/overview/api/twitter-libraries).

- Begin by downloading the  [Twitteroauth](https://github.com/abraham/twitteroauth) package which we will be using to setup the login using Twitter button. You can use the following composer package to get this:

```json
=5.4.0",
 "abraham/twitteroauth": "0.3.0-beta"
 }
}-->
```

- Import the [TwitterOAuth](https://github.com/abraham/twitteroauth) class onto your page and initialize the connection:

```php
<!--require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
define('CONSUMER_KEY', );
define('CONSUMER_SECRET', );
define('OAUTH_CALLBACK', );
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);-->
```

Create a Twitter App on the [Twitter dev site](https://dev.twitter.com/) that will service the requests for Twitter social login for your site.

Replace the above definitions with the following details from your App:

- <Consumer Key>- The Consumer Key found in the created app found under Keys and Access Tokens.
- <Consumer Secret>- The Consumer Secret found in the created app found under Keys and Access Tokens.
- <Callback Location>- The URL that you would like a user to return to after successfully authenticating.

Next generate a Request token that will be used to generate a URL which will trigger the twitter Authentication popup.

From the response object capture the "oauth\_token" and "oauth\_token\_secret" for further use.

Generate the URL to be used to display the Twitter social login Authentication interface.

Setup a button or trigger to cause users to navigate to this URL which will display the Twitter social login interface.

1. Once a user has successfully authenticated they will be redirect to the location that you specified in the request\_token OAUTH\_CALLBACK URL.
2. On your Callback page import the TwitterOAuth class again:

```php
<!--require 'vendor/autoload.php';
use Abraham\TwitterOAuth\TwitterOAuth;
define('CONSUMER_KEY', );
define('CONSUMER_SECRET', );
define('OAUTH_CALLBACK', );-->
```

Define the definitions as you did in step 2.

- Initialize the connection using the stored "oauth\_token" and "oauth\_token\_secret".

- Finally request an access\_token to be used to access user data and actions.

At this point your user is logged in and you can make calls to [Twitter social login APIs](https://dev.twitter.com/rest/public) and you have successfully set login using Twitter on your page.

Want to extend your social systems with additional provider functionality check out this post on [LinkedIn social login](/integrate-linkedin-social-login-website/ "Integrating LinkedIn Social Login on a Website").
