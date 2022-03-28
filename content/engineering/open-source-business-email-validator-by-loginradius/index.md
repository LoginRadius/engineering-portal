---
title: "Open Source Business Email Validator By Loginradius"
date: "2017-04-25"
coverImage: "Open-Source-Business-Validator-By-Loginradius.png"
author: "Team LoginRadius"
tags: ["Engineering"]
---

While creating Lead Generation form at LoginRadius, Marketers wanted to sure that visitors enter business emails. To that end, I created a list in JSON format to block free mail providers like Gmail, Outlook etc.

Business mail validator makes sure users enters only business emails in submission forms on a web page. User can’t enter with free email’s that provided by the third party (free email) service provider.

Ex. Gmail.com, Yahoo.com, Yahoomail.com, Rediff.com etc.

We can classified business email validation in two ways.

### **1\. Client side**

In client side validation we use javascript(js) OR jQuery to validate entered the email at time of submission the html form. So we can follow the following steps to validate it on client side.

- First of all create a simple html page with name emailvalidate.html
- Add jQuery script on head section

   ```js
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
   ```


- Call json file content in a script variable like

```js
<script>
    var emailValidator = {
        "123.com": true,
        "123box.net": true,
        "123india.com": true,
        …………………….
        …………………..
        "ymail.com": true,
        "yandex.com": true
    };
</script>
```

Our complete list is available [here](https://github.com/LoginRadius/business-email-validator/blob/master/src/freeEmailService.json)

- Add validation form function after you have added above code.

```js
<script>
function validateForm(id) {
                            var emailValue = jQuery('#'+id).val();
                            var emailArray = emailValue.split("@");
                            var provider = emailArray[1] ? emailArray[1] : '';
                            for(var domain in emailValidator){
                            if(emailValidator[domain]){
                                                        if(domain == provider){
                                                        alert("Please Provide Business Email Address.");
                                                        return false;
                                                                        }
                                                      }
                           }
 return true;
}
</script>
```

- **Create html form**

 

```js
<form name="myForm" action="emailsubmit.php" onsubmit="return validateForm('business_email');" method="post">
    <input type="text" placeholder="Full Name"/><br>
    <input type="email" id="business_email" name="email" placeholder="Email Address"/><br>
    <input type="submit" value="submit"/>
 </form>
```

Note: if you have already have html form where you want to apply this avalidator, look up for the buysiness\_email and replace it accordingly.

- Save the file and try to execute this html page on a browser.

### **2\. Server side**

In Server side validation we use php scripting language to validate entered email at time of submission the html form. So we can flow the following steps to validate it.

- Create a php page with name of emailsubmit.php

- Receive email in php post method by following code.

```php
<?php
$email = isset($_POST[‘email’]) ? trim($_POST[‘email’]):’’;
if(!empty($email)){
                 $tempEmail = explode('@', $email);
                     if (isset($tempEmail['1']) && !empty($tempEmail['1'])) {
                 $validEmail = json_decode(file_get_contents('freeEmailService.json'), true);
                     if (is_array($validEmail) && in_array($tempEmail['1'], array_keys($validEmail))) {
                     echo "Please use business email address.";
                  }
                }
}else{
                     echo ‘email is required field.’;
}
?>
```

- Save file and upload on server

Feel free to add, edit or modify this script as per your requirements. You can contact us if you have any queries.
