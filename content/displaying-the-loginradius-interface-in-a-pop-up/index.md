---
type: async
title: "Displaying the LoginRadius interface in a pop-up"
date: "2015-11-09"
coverImage: "simplepop-150x150.png"
author: "Karl Wittig"
tags: ["HTML", "Login", "UI", "LoginRadius Interface"]
---

In order to display your LoginRadius Login Interface in a pop-up you can leverage Jquery-ui which is a well documented, easy-to-use library that allows you to handle some common functionality such as pop-up dialogs and other UI features. In this article we go over the steps to use Jquery-ui to display a pop-up on your page with a LoginRadius login interface using the LoginRadius HTML SDK.

1\. Get the required references this guide relies on: Jquery and Jquery-ui. You can include the hosted reference files in the header of your page:

```js
<!--

-->
```

2\. Include the LoginRadius Interface Javascript and HTML5 SDK reference:

```js
<!--
var options={};
options.login=true;
LoginRadius_SocialLogin.util.ready(function () {
    $ui = LoginRadius_SocialLogin.lr_login_settings;
    $ui.interfacesize = "";
    $ui.apikey = "";
    $ui.callback="";
    $ui.lrinterfacecontainer ="interfacecontainerdiv";
    LoginRadius_SocialLogin.init(options);
});
-->
```

3\. Create the HTML structure for your page. Below we have created a button to trigger our pop-up display as well as the dialog container that will be displayed in the custom pop-up which is hidden by default. We have also included a div to display profile data after successfully authenticating.

```js
<!--Login



 -->
```

4\. Create a JavaScript function to handle the display of the pop-up dialog. The below function utilizes Jquery-ui functions to display the dialog and the LoginRadius login interface initialization function to render the login interface on the popup:

```javascript
function Login() {
  $("#dialog").dialog()
  LoginRadius_SocialLogin.init(options)
}
```

5\. Include the JavaScript callback script to handle a successful authentication and display the profile data.

```javascript
LoginRadiusSDK.setLoginCallback(Successfullylogin)
function Successfullylogin() {
  LoginRadiusSDK.getUserprofile(function (data) {
    $("#dialog").dialog("close")
    document.getElementById("profile").innerHTML = JSON.stringify(data)
  })
}
```

Full Example:

```js
<!--




 var options={};
options.login=true;
LoginRadius_SocialLogin.util.ready(function () {
$ui = LoginRadius_SocialLogin.lr_login_settings;
$ui.interfacesize = "";
$ui.apikey = "";
$ui.callback="";
$ui.lrinterfacecontainer ="interfacecontainerdiv";
LoginRadius_SocialLogin.init(options); });



function Login(){
    $( "#dialog" ).dialog();
    LoginRadius_SocialLogin.init(options);
}

LoginRadiusSDK.setLoginCallback(Successfullylogin);
function Successfullylogin(){
    LoginRadiusSDK.getUserprofile( function( data) {
        $( "#dialog" ).dialog("close");
        document.getElementById("profile").innerHTML = JSON.stringify(data);
    });
}

Login



-->
```
