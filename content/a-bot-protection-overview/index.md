---
title: "A Bot Protection Overview"
date: "2019-05-31"
coverImage: "Productshot.jpg"
author: "Chris Yee"
tags: ["Engineering", "Captcha", "Spam", "Secure", "IP"]
type: "async"
---

Bots are tools that are created to automate tedious processes and reduce work. For example, chatbots automate replies to users for customer support, and search bots are used to populate search results on a Google search. However, there are many bots that are crafted for the malicious self-interest of a party. Examples of these hostile bots include DDOS (Direct Denial of Service) botnets and spam bots. This post will provide some information on how to implement bot protection to protect your systems from these nasty bot attacks.

### CAPTCHA:

One of the most popular methods of bot protection that is used today is CAPTCHA, which is provided through companies such as ReCAPTCHA, NuCaptcha and Solve Media. CAPTCHA, which stands for “Completely Automated Public Turing Test to tell Computers and Humans Apart”, is an anti-bot measure which consists of a challenge which a user must complete to verify if the user is human. Examples of challenges include translating images of distorted text, or recognition of objects in an image which match a given word. CAPTCHAs are useful in blocking automated form submissions by bots and are constantly being updated to be more friendly to human users. Some of the latest CAPTCHA implementations only require the user to click on a checkbox to pass their validation check.

An example of a ReCAPTCHA with distorted text

![](https://media-s3-us-east-1.ceros.com/editorial-content/images/2018/05/31/c5c224dc0fb2a058625073c470d70c3c/recaptcha-big.png?ver=1552286291?imageOpt=1&fit=bounds&width=1077)

To implement CAPTCHA using Google’s ReCAPTCHA solution, you can access [https://www.google.com/recaptcha/](https://www.google.com/recaptcha/) and login with your Google account. Following that you will be redirected to an interface where you can register your site. Different types of CAPTCHAs can be set up for different events on your domain and can be built to match your use case.

An example of a ReCAPTCHA with a checkbox validation

![](https://media.giphy.com/media/10p3VEnw29dD44/giphy.gif?ver=1552286291?ver=1552286291)

CAPTCHAs have a variety of uses, and can be used to prevent automated form completions and even prevent access to your domain. Setting up a CAPTCHA detection solution for different scenarios will typically provide a strong bot defense for your system.

### Spam Honeypots:

Spam honeypots are traps that ensnare bots by placing hidden input fields within a form that reject registration upon being filled in. Bots that use detect form fields through HTML may be programmed to fill in all the input fields in a form including the honeypot. Meanwhile, since the fields are hidden, human users should not be able to see the honeypot and should not be filling in the field.

The implementation of a honey pot can be as simple as implementing an extra form field onto your page that should not be filled in. Hide the element using CSS and set up logic to prevent users that fill in the field from successfully completing the form. A simple implementation can be done with this code:

```js
<input id="first-name-input" type="text" name="firstname" value="Fill me in"> <input style="display: none;" id="honeypot-input" type="text" name="honeypot"> <button type="button" onclick="submitForm()" value="button">Submit</button> <button type="button" onclick="fill()" value="button">Fill Honeypot</button> <script>    let submitForm = function() {         let honeypot = document.getElementById("honeypot-input").value;         if(!honeypot) {
   // Handle input submit
        console.log(“Pass”);         }
   else {
   // Handle honeypot error
    console.log(“Fail”);  }  }
     let fill = function() {  document.getElementById("honeypot-input").value = "Example";     }
</script>
```

With the implementation of the above code, if a bot is setup to fill in all input fields on your web page, then the hidden honeypot input will be filled in and the bot will be detected. On the other hand, if a normal user attempts to complete the form on the page, the honeypot would be invisible and the registration will be successful.

Honeypots are a solution to weed out basic bots, but they can be easily circumvented depending on how the honeypot is implemented. Regardless, adding a honeypot still provides an additional layer of defense against bot inputs and will help deter some bot traffic on your site.

### Lockout Time:

Often times, when bots are created to automate a task, they would be programmed to complete these tasks as quickly as possible to maximize efficiency. As a countermeasure, time lockouts can be set up to prevent bots from repeatedly spamming requests. By setting up a time lockout between requests to your domain, bots which attempt to quickly submit data on your domain will be detected. Meanwhile, human users that are registering onto the site will be working at a slower pace and will not notice the time lockout at all.

Setting a timer on form completion does not prevent any bots from affecting your domain, but can significantly slow down their efficiency. Combined with ReCAPTCHA or other anti-bot measures, it can be very useful in reducing the impact of bots.

### Blacklisting IPs:

If an entity accessing your website is from an unexpected location, for example, a Russian IP accessing your domain for an American service, using IP blacklists may be useful to prevent possible bot attacks. IP blacklisting can usually be set up through your hosting services and allows you to customize where users may access your domain.

There are some issues with blacklisting, though. Choosing which targets to blacklist could be a tedious task. Even with a bot set up to detect users with suspicious activity and block them, there could be a chance of a false positive, which may result in users of your domain being blacklisted.

### Proof Of Work:

If you want to save your site from spams and denial-of-service attacks you can incorporate a layer of Proof Of Work algorithm in your site. Whenever any client will try to connect to your server they need to commit some of their resources to the Proof Of Work algorithm first and then the server should be connected.

With this approach, any legitimate user would experience just a negligible computational cost, but a spammer/attacker trying to establish a large number of connections would bear the computational cost and time delay, it deters the abuser to do so. There are many POW algorithms which you can use eg:- [Client Puzzle Protocol](https://en.wikipedia.org/wiki/Client_Puzzle_Protocol), [Productive Puzzle Protocol](https://ieeexplore.ieee.org/document/7509937), [Guided Tour Puzzle Protocol](https://en.wikipedia.org/wiki/Guided_tour_puzzle_protocol)

### Other Forms of Malicious Bots:

Other malicious bots that can impact user experience negatively include, but are not limited to, bots designed for DDOS attacks, spam bots that harvest user data, bots that create links to phishing websites which generate viruses, and malicious bot worms that infect computers.

Countermeasures for these bots vary depending on what is being prevented. Honeypot data fields can act as a detection method against bots harvesting data, and with proper preventative training, phishing and scam bots can be handled. Third party services may also be used to protect from different forms of bots. For example, to mitigate impacts of DDOS attacks, a user may implement a solution offered by CloudFlare. Another example is the use of an ad blocker to prevent malware from being drive-by downloaded by intrusive ads.

### Conclusion:

Unless your domain is a highly popular website, or is being targeted by technical security violation experts, there is a good chance that utilizing a simple Google ReCaptcha prompt for form completion is enough to handle any malicious bots that attempt to access your website. For domains with significantly more traffic, paid solutions like Cloudflare might also be useful in dealing with malicious bots.

Keep in mind that although some bots are created for bad purposes, a large number of bots exist to automate beneficial tasks and make it easier for humans. Even though there are a significant amount of bots that are not helpful, it is important to embrace how useful benevolent bots actually are.
