---
title: "Using Facebook Graph API After Login"
date: "2015-09-29"
coverImage: "fb-feat-img-150x150.png"
author: Karl Wittig
tags: ["Facebook","Graph API"]
---

Facebooks Graph API gives you the ability to better understand and target content to your user. In this blog we go over some useful implementations of the Graph API that you can use to pull in user data as well as publish on your users behalf.

## Getting Your Site Ready

The first thing you will need to do is implement an authorization interface that will allow your users to Login with there Facebook credentials and grant access to your application to handle the features that we will go over in this blog.

You can refer to this article on setting up a Facebook Login integration: [https://lr-engineering.now.sh/blog/implement-facebook-social-login/](https://lr-engineering.now.sh/blog/implement-facebook-social-login/)

While implementing the Login detailed in the above blog you can modify the scope included in the Facebook button to request the scopes that we will be using.

Define your Facebook button as follows:

```js
<!-- -->
```

  
This will cause your interface to request additional permissions that may require you to submit your app for review in order for your users to get access to these permissions.

## Managing your users login credentials.

After your user has authenticated you can capture the users access token for use in your application or backend systems. During the Facebook login in the function function statusChangeCallback you can check the response for an active Facebook session and store the access token from this object as follows:

```javascript
if (response.authResponse) { var access_token = FB.getAuthResponse()['accessToken']; }
```

This token is valid for 2 hours by default and can be upgraded to a long lived with a server-side call as detailed here:[https://developers.facebook.com/docs/facebook-login/access-tokens#extending](https://developers.facebook.com/docs/facebook-login/access-tokens#extending)

The long lived token will be valid for 60 days over which you will be able to access the users data or handle actions that they have granted your app permissions.

If you have stored an access token or long lived token and wish to reinitialize the Facebook JavaScript graph API you can handle this by including the following parameter when making FB.api calls:

```javascript
FB.api( '/me', 'get', { access_token : 'access_token_for_some_user_fetched_from_your_database' } );
```

##   
Getting User Data and Specific Fields

The simplest way to get a copy of the User Profile object is to access the /me endpoint:

```javascript
FB.api('/me', function(response) { });
```
  
This will this will return the users name and an ID by default. You can add additional field requests to the me endpoint in order to retrieve further data-points for the user. Below we request the users id, name, age\_range, bio, birthday, and email using a stored access-token.

```javascript
<!--FB.api( '/me?fields=id,name,about,age_range,bio,birthday,email', 'get', { access_token :  },function(response) { //Handle Data Here it will arrive in a Json object in the response } );-->
```

  
There are additional edge cases which can be accessed through the /me endpoint. A full list can be found [here](https://developers.facebook.com/docs/graph-api/reference/user). A below sample details how you can retrieve the videos that the user is tagged in or has uploaded.

```javascript
<!--FB.api( '/me/videos', 'get', { access_token :  },function(response) { //Handle Data Here it will arrive in a Json object in the response } );-->
```

##   
Publishing Content to a Users Wall

In order to publish content to a users wall you will have to have requested the publish\_actions permission during login which we have done in the first part of this article. You can then access the following endpoint to publish a status post to a users wall:

```javascript
<!--FB.api( '/me/feed?message=', 'Post', { access_token :  },function(response) { //Handle Response which will contain a Post ID if successful } );-->
```

##   
Conclusion

Facebook offers many options to integrate their API into your site and offers a variety of easy to use SDKs for multiple languages. Check out [their documentation](https://developers.facebook.com/docs) for details on the various SDKs and additional graph endpoints.
