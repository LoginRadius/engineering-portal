---
type: async
title: "An Intro to Curl & Fsockopen"
date: "2015-03-09"
coverImage: "fsock-and-curl.png"
author: "Zoie Carnegie"
tags: ["curl", "Fsock"]
---

**What are they?**

cURL and Fsock are both methods used to communicate with different types of servers using communication protocols. Fsock is included in PHP and cURL is a library that can be installed on a server or utilized on many different platforms.

**Example:**

[cURL](http://php.net/manual/en/book.curl.php)\-

```php
<!---->
```

[Fsock](http://php.net/manual/en/function.fsockopen.php)\-

```php
<!--<?php
$fp = fsockopen("www.example.com", 80, $errno, $errstr, 30);
if (!$fp) {
    echo "$errstr ($errno)\n";
} else {
    $out = "GET / HTTP/1.1\r\n";
    $out .= 'Host: www.example.com\r\n';
    $out .= "Connection: Close\r\n\r\n";
    fwrite($fp, $out);
    while (!feof($fp)) {
        echo fgets($fp, 128);
    }
    fclose($fp);
}
?>-->
```

**How to check if you have cURL enabled**

Run phpinfo() to see if cURL is enabled on your server then navigate to the cURL section. You will see the setting cURL support - enabled or disabled.

Or use the php script below to create a curl\_check.php file

```php
<!--<?php
// Script to test if the cURL extension is installed on this server
// Define function to test
function _is_curl_installed() {
    if (in_array('curl', get_loaded_extensions())) {
        return true;
    }
    else {
        return false;
    }
}
// Output text to user based on test
if (_is_curl_installed()) {
    echo 'cURL is installed on this server';
} else {
    echo 'cURL is NOT installed on this server';
}
?>-->
```

After saving this file as curl\_check.php load it on a server installed with PHP and run the path yourpath/curl\_check.php you will see a message shown that notifies you if cURL is enabled or disabled

Check if fsockopen function exists

```php
<!---->
```

Normally, by default your server will have cURL enabled and ready to use on your server. It is the most commonly used method to communicate to different types of servers. If you're ever having a problem communicating with a server run one of the above checks to verify your cURL and Fsock is working correctly.
