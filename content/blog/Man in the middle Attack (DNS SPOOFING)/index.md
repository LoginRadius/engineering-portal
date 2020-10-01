---
title: "Man In The Middle : DNS Spoofing"
date: "2020-10-01"
author: "Ojas Kumar Dubey"
tags: ["Engineering","JavaScript","Hacks","Array"]
description: "Learn how to perform DNS spoof MITM."

---

Man in the middle attack is a very common attack in terms of cyber security that allows a hacker to listen to the communication between two users. As the name suggests the hacker acts as the man in the middle who hears to the communication going on between two targets which he or she is not allowed to “listen” to thus the name “Man In The Middle Attack”.

![MITM](1_Vin-lXJ8lkZYgzMK5oDH8A.png)

For an example : Aman and Rohan are having a conversation now if Raj wants to be the man in the middle and hear there convo he can do a simple thing i.e. he’ll tell Aman that he is Rohan and to Rohan that he is Aman like this he’ll be able to hear to their conversation being man in the middle.

### **DNS Spoofing :**

#### What is DNS?

Domain Name Systems (DNS) is like a phonebook directory for the Internet. We when request a web browser for a site we interact using domain names like loginradius.com but a web browser do not understands it, so in order to communicate DNS acts as a transalator and translates the domain name for the web browser and convert it to its IP address which the browser understands.
For example: Ram and Rohan wants to interact to each other but Rohan’s english is not quite good so Raj translates what Ram is saying to Rohan thu working like a translator between them , this is how DNS works between user and browser (as a translator)
In below example the bucket elements are _null_ and are ready to get filtered out. 

#### What is DNS Spoofing?

DNS Spoofing or DNS hijacking is a type of MITM (Man In The Middle Attack) . This is mostly done by altering the DNS records thus redirecting the online traffic to a different server thus hacking the data coming to a site and directing it to a fraud server .

![What is DNS Spoofing?](1_awwz6biNwYnBATxlE7ZQng.png)

Once a hacker successfully spoofs the DNS server he/she is able to hear to the data that was being transferred somewhere else and was not meant to read by somebody else.

#### How To Prevent It ?

DNS is an unencrypted method thus a different method called DNSSEC can be used to do so . However it is also not fully secured as it does not encrypt the DNS responses but yet it is quite safe to use as it uses an authentication crytographic signature alongside with the domain name to make the connection secure and authenticated.

Moreover , you are advised to use servers which are secure of DDOS attacks as they also can led to data leakage.

Two-Factor authentication is also a very secure way to prevent your data getting stole by Hackers as it authenticates that only the correct user gets the data and the one with the key gets it. Two Factor authentications are very secure and are advised to be used.

And, you can also Lock you DNS changes so that no one else can change them and take advantage of it .

So, these were some methods you can use to prevent DNS hacks and safeguard your data .
