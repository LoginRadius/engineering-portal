---
type: async
title: "Let's Encrypt with SSL Certificates"
date: "2019-01-14"
coverImage: "ssl.png"
author: "Ruben Gonzalez"
tags: ["SSL", "SSL Certificate", "Security"]
---

**What is an SSL Certificate?**

Let’s start with some working definitions of the HTTP and HTTPS protocols. HTTP is the Internet protocol over which data is sent between a browser and a server when they are communicating. HTTP**S** is the secure counterpart of HTTP , which encrypts data to ensure private communication.1 An SSL certificate is a data file that is installed on a web server to enable the use of the HTTPS protocol.2

**Why SSL Certificates?**

The communication privacy that HTTP provides is desirable for obvious reasons: for example, you would not want a website you are purchasing something from to not encrypt your credit card information before sending it to the server, for that would expose it to everyone who needs only a decent understanding of how the internet works to access it. Other benefits of SSL certificates include:

- Providing server authentication: data in the internet is rarely sent from the source computer **_directly_** to the destination computer, which means a node (computer) in the path could pretend to be the server your browser is trying to send data to. This is what happens in a _man-in-the-middle attack_: the attacker forms connections with the two nodes that are intending to establish private communication and fakes its identity so the nodes confidently send data to it. Not only can the attacker access the data in the communication but it can also alter it as it pleases to direct the conversation between the nodes.4 This could be prevented with an SSL certificate from a trusted SSL provider, ensuring the delivery of your data to the right server.3
- Encouraging trust from users: visual clues will be present once an SSL certificate is installed on a server, signaling to the user that the server provides a secure connection. The protocol portion of the URL on the browser is visibly HTTP**S**, and a padlock icon shows up to the left of the address bar. Certain types of SSL certificates also colour the icon or  bar green. All these reassure users that the data they send to the server through their browser is safe, thus encouraging behaviours like online purchases and information sharing. 3

**Considerations**

There are some considerations to be aware of when implementing SSL certificates on your server. There is a cost involved due to he infrastructure that has been put into place by the SSL certificate provider to issue the certificate. Additionally, processing encrypted data takes more server resources. However, there is available hardware that can minimize this impact.3 Considering the additional security and end user trust SSL certificates can bring to your website, there is no doubt that its benefits far outweigh the costs and efforts of its implementation.

**A Final Note**

You might be aware that version 3.0 of the Secure Sockets Layer protocol was deprecated in 2015 by the IETF because of its vulnerabilities. Other protocols, such as TLS, are more secure and have to be used in replacement of SSL.5 This might lead you to think, how do I replace my _SSL_ certificate with a _TLS_ certificate so I ensure security in my website? The answer is you do not have to. Although the phrases ‘SSL certificate’ or ‘SSL/TLS certificates’ are used, the certificates are not bound to the protocol your server uses. Certificates can be used with either SSL or TLS; what determines what protocol you use is your server configuration.6

**References:**

1. [https://www.instantssl.com/ssl-certificate-products/https.html](https://www.instantssl.com/ssl-certificate-products/https.html)
2. [https://www.globalsign.com/en/ssl-information-center/what-is-an-ssl-certificate/](https://www.globalsign.com/en/ssl-information-center/what-is-an-ssl-certificate/)
3. [https://tools.ietf.org/html/rfc7568](https://tools.ietf.org/html/rfc7568)
4. [https://www.globalsign.com/en/blog/ssl-vs-tls-difference/](https://www.globalsign.com/en/blog/ssl-vs-tls-difference/)

Note: image labeled for reuse, taken from Google images.
