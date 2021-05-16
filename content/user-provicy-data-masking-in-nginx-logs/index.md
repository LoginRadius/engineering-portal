---
title: "Nginx - data-masking-in-nginx-logs-for-user-data-privacy-and-compliance"
date: "2021-05-17"
coverImage: "data-masking-in-nginx-logs-for-user-data-privacy-and-compliance.png"
author: "Vijay Singh Shekhawat"
tags: ["Nginx", "Logs","Data Masking", "Compliance","Privacy"]
---

 There are several Consumer/User data protection regulations in place to protect customer data and privacy. With data protection act like the California Consumer Privacy Act (CCPA) and the European Union's GDPR improving awareness of privacy rights, many data-driven businesses have sought to determine which of their applications contain sensitive data, where the sensitive data goes, and why data is going. As a result, they are reevaluating their data protection controls for employee and consumer data.

 Your programme must record vast volumes of data in order to meet business requirements. It's likely that the application log data contains highly sensitive information. Email addresses, URL parameters such as tokens, credit card data, jobs data, Login Credentials, and Official ID Numbers (passport numbers, driver's licence numbers, social security numbers) and authentication tokens may be included in specific log messages. it is important to mask sensitive details such as authentication tokens or credit card info while logging.

 A few years ago, Twitter requested users to reset their passwords. According to [Twitter's release](https://blog.twitter.com/official/en_us/topics/company/2018/keeping-your-account-secure.html), passwords were written in the logs without masking allowing those with access to the logs to see the password. In most startups or small businesses, all staff members have access to all tools, so masking confidential data is critical. Most log management tools allow you to mask any information until it is saved in the logs. Most of the log monitoring tools provide the feature for masking any information before it will save in the logs.

### Masking Sensitive Data in Nginx Logs

 By default, Nginx logs predefined format is combined. As you know we can overwrite access log formatting as per the requirement. The NGINX JavaScript plugin can be used to enforce data masking in NGINX logs. This module is a kind of JavaScript implementation for NGINX and NGINX Plus that is intended for server-side use cases and per-request processing. When each request is logged, we run a small amount of JavaScript code to masking the sensitive data.

 ### Instructions for enabling the NGINX JavaScript module

 The NGINX JavaScript module is by default included in the official NGINX Docker image. if your installed version is 1.9.11 or later, then you can install NGINX JavaScript as a prebuilt package for your platform

 1. Install the prebuilt package.
    
    Ubuntu and Debian systems
    ```javascript
    $ sudo apt-get install nginx-module-njs
    ```

    RedHat, CentOS, and Oracle Linux systems
    ```javascript
    $ sudo yum install nginx-module-njs
    ```

 2. Enable the module by adding a load module directive in the nginx.conf

     ```javascript
        load_module modules/ngx_http_js_module.so;
        load_module modules/ngx_stream_js_module.so;
    ```

 3. Reload NGINX service

    ```javascript
        sudo nginx -s reload
    ```
 
 ### How to mask Query String in NGINX and NGINX Plus 

 An application can be passed some potentially confidential information as query string parameters like tokens, public key, etc. this information logged as part of the request URI. If your program sends personal information in this manner, you can use the NGINX JavaScript module for masking customer/user personal information in the query string.


1. Create a new file ``` maskQueryString.js ```
 
     ```javascript
        vi maskQueryString.js

        function fnv32a(str) {
        var hval = 2166136261;
            for (var i = 0; i < str.length; ++i ) {
                hval ^= str.charCodeAt(i);
                hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
            }
            return hval >>> 0;
        }

        function maskQueryStringParameters(req) {
        var query_string = req.variables.query_string;
        if (query_string.length) {                     // Proceed if we have query string
            var keyvaluepairs = query_string.split('&');     // Convert to array of key=value
                for (var i = 0; i < keyvaluepairs.length; i++) { // Iterate through each Key Value pairs pair
                    var keyvaluepairs = keyvaluepairs[i].split('=');    // Split Key Value pair into new array
                    
                    if (keyvaluepairs[0] == "token") {              // Mask token query paramter
                    // Use first 5 digits of masked value
                    kvpairs[i] = kvpair[0] + "=" + fnv32a(kvpair[1]).toString().substr(5);
                    } 
                    ekse if (keyvaluepairs[0] == "accountno") {              // Mask account no
                    // Use first 7 digits of masked value
                    keyvaluepairs[i] = keyvaluepairs[0] + "=" + fnv32a(keyvaluepairs[1]).toString().substr(0,7);
                    } else if (keyvaluepairs[0] == "email") {     // Mask email
                    // Use hash as prefix for a single domain
                    keyvaluepairs[i] = keyvaluepairs[0] + "=" + fnv32a(keyvaluepairs[1]) + "@sample.com";
                }
        }
        return req.uri + "?" + keyvaluepairs.join('&');  // Construct masked URI
    }
    return req.uri; // No query string, return URI
    }
    ```

    The maskQueryStringParameters function loops through and key-value pair in the query string, searching for individual keys that have been identified as containing personal data. The value is converted into a masked value for each of these keys.

 2. Include ``` maskQueryString.js ``` file in the ``` nginx.config ``` file 

   ```javascript
        http {

    js_include maskQueryString.js;
    js_set     $request_uri_masked maskQueryStringParameters;

    log_format custom_log_format '$remote_addr - $remote_user [$time_local] '
                           '"$request" $status $body_bytes_sent $request_uri_masked '
                           '"$http_host" "$upstream_response_time"'
                            '"$http_referer" "$http_user_agent" clientId="$clientid"';

    access_log /spool/logs/nginx-access.log custom_log_format;
....................

     }
```
 In the above example I am using the ``` maskQueryStringParameters ``` js function and Since we only need to mask the query string, so using a different variable $request_uri_masked and then using the same variable in the log format 

3.Reload NGINX service

  ```javascript
        sudo nginx -s reload
   ```

 Now nginx will store ```token```, ```accountno```,  and ```email``` in the logs after sanitizing the data 


### Summery
These best practices will help you keep confidential information out of your logs. It's not a full package that will get you ready for a HIPAA or SOC2 audit, but it'll get you started.

The NGINX JavaScript module provides a quick and efficient approach for adding custom logic like data sanitizing to request processing. I showed how NGINX JavaScript can be used to mask personal data in the log files.


You can get more detail about the Nginx logs and masking from here - 
[Nginx - Everything you want to know about the Nginx logs in 10 minutes](https://www.loginradius.com/blog/async/quick-10-minutes-guide-about-the-nginx-access-and-error-logs/)

[Data Masking for User Privacy with the NGINX JavaScript Module](https://www.nginx.com/blog/data-masking-user-privacy-nginscript)


