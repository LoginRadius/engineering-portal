---
title: "3 Simple Ways to Secure Your Websites/Applications"
date: "2019-06-24"
coverImage: "hacker.png"
author: "Karl Wittig"
tags: ["Engineering"]
---

It is hard to write 100% holes-free code, no matter how hard you tried. Sometimes it is not even your own fault (language implementation, server setups, etc.) and those factors are likely out of your control. That being said, as developers, we should strive to write our code as safe and secure as possible. Here are my suggestions to keep yourself from being woken up in the middle of the night:

1\. **DO NOT trust any user-input, PERIOD.** Not even if it is yours truly. This is the most common attack vector for your web applications, whether it is just a contact form or an API end-point. For example, if a form is implemented to store data in a database, someone can try brute-forcing with classic SQL-injection techniques. Others can certainly try calling your API and see if there are any spotty error-handling issues. Sanitize all inputs as much as you can, and handle all errors behind the scenes properly and gracefully without exposing the actual details to the public.

2\. **UPDATE, UPGRADE and REPEAT.** Chances are, a lot of your code is dependent on third-party libraries (open or close source, does not matter). It is your job to make sure you are using the latest version for them all. When hackers find out you are using outdated or vulnerable code, you are done. I have seen this happening way too many times than I can count over the years when websites got hacked and outdated plugins or libraries was the main culprit.

You might be saying, "hey, upgrading that library will break my code!!". Well, what is your job again? Deal with it.

3\. **Web Application Firewall (WAF)** Consider getting one if your server admin lets you, it can potentially save yourself a lot of embarrassments. Just keep in mind though it should not be your only security strategy, as WAFs will not stop all kinds of attacks. It is still your sole responsibility to write good code and repeat step 1 and 2.

**Happy coding!**
