---
title: "Get your FREE SSL Certificate!"
date: "2017-07-13"
coverImage: "letsencrypt.png"
author: "Kundan Singh"
tags: ["Engineering","SSL"]
---

These days SSL is a must-have element for websites, but SSL certificates are costly and range from $30 to $500 per year for a single website. Don’t fret! You can get a FREE SSL certificate! Through “Let's Encrypt” ([https://letsencrypt.org/](https://letsencrypt.org/)), a free, automated, and open certificate authority, you will be able to acquire the necessary certificate to enable SSL on your website. Check out the below steps you can follow to get an SSL certificate for your site today.

To obtain this certificate, you will first need to prove ownership of the domain. There are two requirements that you need to meet in order to generate a certificate from “Let's Encrypt”:

**Http-01**:  
You will need to setup a directory on your web server's root, and the name of this directory should be “.well-know” and with a “acme-validation” directory included within this. Inside these directories, create a file containing the random string that was provided by the ACME server and this file should serve content which is the random string included in the doc.

**Sample Structure**

```

/.well-known/acme-validation/&amp;amp;lt;random file name provided by ACME&amp;amp;gt;
```


**Dns-01:**

You will need to create a .TXT record on the subdomain \_acme-challenge. For instance, if you would like to obtain an SSL for the domain “example.com”, then you will need to setup a subdomain on this domain - \_acme-challenge.example.com - and the content of the .TXT record will be a random string provided by the ACME server.

Now that you have everything setup, how do you get your FREE SSL? Below, we will go over the various ways to enable SSL for free on your website:

**1\. Certbot** : [certbot](https://certbot.eff.org/) is a Linux utility that is simple yet powerful. This tool doesn't share private keys with any servers, and it keeps your private key on the client that is being used to generate the cert.  You can install certbot with the following command on ubuntu:


```
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install certbot
```


The [certbot site](https://certbot.eff.org/) has even more details and information for installing this on other systems.

Once installed, open the DNS Manager (must do!) and call the following command to get the SSL certificate for your domain.

```
sudo certbot --text --agree-tos --email &amp;amp;lt;YOUR EMAIL ID&amp;amp;gt; -d &amp;amp;lt;YOUR DOMAIN&amp;amp;gt; --manual --preferred-challenges dns --expand --renew-by-default  --manual public-ip-logging-ok certonly
```

This command will request that you add the .TXT record on the subdomain \_acme-challenge. Once this is added, simply press any key to generate the SSL certificate. It will show the locations of the certified file.

**2\. Online using** [**https://www.sslforfree.com/**](https://www.sslforfree.com/) : This is also a non-profit site and you can get SSL without any installation; just follow the steps to set up the ACME compliant site structure. They provide an easy step-by-step guide for generating the SSL certificate. Once you work through the guide, you will be able to download a copy of your certificate and include on your webserver.

**3\. Other ways** : There are lots of other ways to get the “Let's Encrypt” SSL. [This page](https://letsencrypt.org/docs/client-options/) contains a list of ACME clients and libraries, so you can choose to work with whichever one that best suits your needs.
