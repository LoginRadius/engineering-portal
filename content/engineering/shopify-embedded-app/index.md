---
title: "Shopify Embedded App"
date: "2015-06-02"
coverImage: "shopify.png"
author: Lucius Yu
tags: ["Shopify", "PHP"]
---

Recently, I was working on an implementation to build an embedded app on Shopify with PHP. I realized that the 3rd party PHP SDK recommended by Shopify called "phpish" does not support the feature to "PUT" assets into your shopify shop's theme. The link to "phpish" git repository can be found  [here](https://github.com/phpish/shopify), I'd like to thank these guys for their great work, it saved me lots of time to get the implementation on the right track.

So if you want to do a PUT API call to Shopify web service, you can do it in raw PHP by customizing a CURL request, this is not very hard. But prior to make the Asset API call, first you need to retrieve the currently activated theme ID by calling the Shopify Theme API call, this part can be done easily with the help of phpish.

Then it is the time to customize your CURL request to do the PUT API call, remember phpish stores our information such as Oauth Token and Shop into the $\_SESSION, we can leverage on that or manually fill in the correct information

```php
<!-- array("key" => "snippets/put-asset.liquid", "value" => "this is a test to put assets"));
$ch = curl_init($_SESSION['shop']."/admin/themes/$theme_id/assets.json");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
$headers = array();
$headers[] = "X-Shopify-Access-Token: ".echo $_SESSION['oauth_token'];
$headers[] = "Content-Type: application/json";
curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers );
curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($data));
$response = curl_exec($ch);
echo "";
echo curl_error($ch)."";
var_dump($response);
curl_close($ch);
?>-->
```

  
Let me briefly explain this snippet, so first you define an array with key and value, key maps to the file name that you want to create, and value is the actual code or asset you want to pass in. Then you create a curl request with method "PUT" like all the other requests

```php
$ch = curl_init($_SESSION['shop']."/admin/themes/$theme_id/assets.json");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
```
  
Next is something special for Shopify, to make an API call to Shopify you have to specify Oauth\_Token in your request to tell Shopify who you are, and so does Content-Type.

```php 
$headers = array();
$headers[] = "X-Shopify-Access-Token: ".echo $_SESSION['oauth_token'];
$headers[] = "Content-Type: application/json";
```
  
Last but not least, json encode your data array into JSON format and send the request.

```php
curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($data));
$response = curl_exec($ch);
```
  

The last part is just to catch the returned response or show the error message from your CURL request if something is going wrong.

Hope this can help someone, happy coding.
