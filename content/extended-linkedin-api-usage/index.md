---
title: "Extended LinkedIn API Usage"
date: "2016-02-09"
coverImage: "linkedin-feat-img.png"
author: "Karl Wittig"
tags: ["LinkedIn", "SocialLogin"]
---

LinkedIn has recently revamped their API systems and added many new restrictions. We will go through some examples on how you can utilize the LinkedIn Javascript API in order to setup some useful features that comply with LinkedIn's new terms and conditions and use cases.

## Getting Your Site Ready

The first step will be setting up your login button which will prompt the user to authenticate with their LinkedIn credentials. We have provided a guide to getting a basic login button setup [here](/blog/integrate-linkedin-social-login-website/). The linked guide will get you as far as setting up a button that allows your users to login with LinkedIn and display a personalized welcome message. Below we will go over extending this functionality to allow you to handle more complex features for your users after logging in.

## Event Handling

You can control and initiate specific behavior after a user logs in. You can assign these event handlers by first setting the function that will be used to initialize the events. This will trigger the event designation after the LinkedIn scripts have been loaded on your page. Update the LinkedIn initialization script:

```js
<!--
api_key: 
authorize: true
onLoad: onLinkedInLoad
-->
```

  
This will trigger the onLinkedInLoad function after the Linkedin scripts have been loaded.

You can now assign some LinkedIn Event handlers in this function to control the behavior that will occur for different LinkedIn user actions. Let's begin by assigning the behavior that occurs after a user logs in.

```js
<!--
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
}
-->
```

  
The above event will trigger when a user authorizes and will call the getProfileData function. We can add another event assignment for the user logging out.

```js
<!--
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
    IN.Event.on(IN, "logout", sendGoodByeMessage);
}
-->
```

  
The above logout event will trigger the sendGoodByeMessage when the user logs out. Now that we have the basic event handling in place we can handle the specific behavior for users logging in.

## Data Retrieval and API access

Once a user has logged in and triggered the getProfileData event we can pull in their user profile using the LinkedIn Raw data API handlers, these allow you to access any of LinkedIn's API endpoints and get data back. We will begin with a quick check to make sure the user is still authorized and then call the Raw API to pull in the people endpoint for the current user:

```js
<!--
function getProfileData() {
    if(IN.User.isAuthorized())
        IN.API.Raw("/people/~").result(onSuccess).error(onError);
}
-->
```

  
If the data is successfully returned it will call the onSuccess function and if not it will call onError.

These functions will both include a JSON formatted response that can be used to display their profile data or log a message:

```js
<!--
function onSuccess(data) {
    console.log(data);
}
function onError(error) {
    console.log(error);
}
-->
```

  
You can test the response formats for most of the LinkedIn APIs on LinkedIns API console: https://apigee.com/console/linkedin You can access any of the API endpoints after successful login via the raw API handler and retrieve data per your requirements.

## User Management

Before making any API requests you should verify that your user has a current active session. User sessions are valid for 30 minutes by default. These sessions can be extended using the following call:

```js
<!--
IN.User.refresh()
-->
```

  
The above call can be used to refresh the expiration time for the user but repeated calls may cause your app to be blocked so this should be used sparingly.

You can provide the ability for your users to logout by setting up a button or link that will trigger the following function call:

```js
<!--
IN.User.logout(sendGoodByeMessage);
-->
```

  
This will trigger the same function that was assigned to the logout event.
