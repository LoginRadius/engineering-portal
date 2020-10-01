---
title: "3 Simple Ways to Secure Your Websites/Applications"
date: "2019-06-24"
coverImage: "hacker.png"
author: "Karl Wittig"
tags: ["Engineering"]
---

It's hard to write 100% bug-free code, no matter how hard you try. Sometimes it's not even your fault (language implementation, server setups, etc.) and these factor are likely out of your control. That being said, as developers, we should strive to write our code as safe and secure as possible. Here are my suggestions to keep yourself from being woken up in the middle of the night:

1\. **Don't Trust any User-Input, PERIODT.** 
 This is the most common attack vector for your web applications, whether it is just a contact form or an API end-point. For example, if a form is implemented to store data in a database, someone can try brute-forcing with classic SQL-injection techniques. Others can certainly try calling your API and see if there are any spotty error-handling issues. Sanitize all inputs as much as you can, and handle all errors behind the scenes properly and gracefully without exposing the actual details to the public.

2\. **UPDATE, UPGRADE and REPEAT.** Chances are, a lot of your code is dependent on third-party libraries (open or close source, does not matter). It's your job to make sure you are using their latest version. There is high chance that hackers can exploit the vulnerabilities manifested due to using outdated obselete versions. Over the last few years many websites have been hacked due to outdated plugins or libraries.

You might say, "Hey, upgrading that library will break my code!!". Well, guess what, It's your job! Deal with it!

3\. **Web Application Firewall (WAF)** Consider getting one if your server admin lets you, it can potentially save yourself a lot of embarrassments. Just keep in mind though it should not be your only security strategy, as WAFs will not stop all kinds of attacks. It's still your sole responsibility to write good code and repeat step 1 and 2.

**Happyyyyy coding!**
