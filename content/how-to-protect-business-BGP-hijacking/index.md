---
title: "How to Mitigate BGP Attacks and Secure Your User's Data"
date: "2021-11-12"
coverImage: "bgp-attacks.jpg"
category: ["security"]
featured: false 
author: "Sudhanshu Agarwal"
description: "The reliance on BGP can be a double-edged sword as, on the one hand, it can be extremely convenient, while on the other, it can have major security lapses. However, enterprises can drastically reduce the risk by adopting the practices mentioned in the blog."
metatitle: "How to Protect Your Business from BGP Hijacking"
metadescription: "BGP can be a liability that enterprises cannot ignore. Learn how to protect your enterprise from BGP route hijacking."
type: "start-with-identity"
---

The existence of the Border Gateway Routing Protocol or BGP attacks is one of the primary reasons why transferring large volumes of information across a network is possible today. BGP acts as a post office that analyses the logistics involved in transporting data from one part of the network to the other using the most optimal path. 


## History of BGP Hijacking 

Since the early 2000s, hackers have targeted and successfully infiltrated secure networks after hijacking the protocol. Upon gaining control of a network’s BGP, the hackers can redirect files or web traffic to their own devices. 

For example, a major BGP hijacking occurred in April of 2020, where over [8800 prefixes](https://www.manrs.org/2020/04/not-just-another-bgp-hijack/) were affected. These prefixes belonged to e-commerce giants like Amazon and Alibaba. This hijacking resulted in the disruption of servers across the world. Moreover, the complete estimate of how much data was infiltrated is still unknown.  

Even tech giant Google is not immune to these attacks as a Chinese telecom company was allegedly behind the hijacking of 180 prefixes in 2018. Although the attack was small compared to other instances, it still resulted in the disruption of several Google services. This disruption was primarily seen in GSuite and Google search. 


## Best Practices to Prevent and Mitigate BGP Hijacking 

BGP can be a liability that enterprises cannot ignore when it comes to [enterprise security](https://www.loginradius.com/customer-security/). This is because it had dedicated security mechanisms in place until recently and instead required a company to put their trust in their ISP unless they maintain their autonomous system. 

In either case, the company or individual will have to ensure that there are measures to prevent or mitigate BGP hijacking. Most enterprises have turned to one of two security options. These include: 


### #1. Mutually Agreed Norms For Routing (MANRS) 

This is one of the more universally accepted routing [security measures](https://www.loginradius.com/blog/start-with-identity/maintaining-quality-data-security-practices/) that are in use today. It is essentially a global initiative carried out by operators and enterprises to prevent route hijacking and other forms of DoS attacks. 

According to this initiative, most of the BGP hijacking incidents that have taken place to date occurred as a result of the following: 

**Prefix hijacking**

This is the most common type of BGP hijacking, where there is an unauthorized takeover of IP addresses after hackers can corrupt internet routing tables or autonomous systems. 

**Route leaks**

A route leak is often described as propagating or making a BGP announcement beyond the intended scope. In other words, the unauthorized party will announce prefixes changing the course of the web traffic to a destination that was not intended. 

**IP spoofing**

This takes place when the hacker masquerades their device or entity as a legitimate one to gain access to files by redirecting them to a different IP address. 

 

To counter this, MANRS recommends implementing the following security measures: 

**Filtering**

This measure can be introduced to ensure that the announcement of BGP routes is accurate and belongs to legitimate entities. Therefore, enterprises can secure inbound routing advertisements using prefix-level filters to filter out suspicious IP addresses. 

**Coordination:**

This involves maintaining Regional Internet Registries (RIRs) that contain accurate and current contact information like NOC contacts. This will also include imposing authentication and authorization requirements on the maintainers to prevent the spread of misinformation. 

**Global validation**

Network operators from around the world will have to release their data so that others can validate the routing information on a global scale. Therefore, this is a publicly documented routing policy for ASNs and prefixes. All information is stored on RIRs. 

**Anti-spoofing**

This is a technique that is used to identify and drop information that has false IP addresses. The anti-spoofing filters which are used can deny service to spoofed IP addresses which try to gain access to a network. In most cases, if a packet coming from an external network contains an internal IP address, it gets blocked. 

[![enduser-cyber-wp](enduser-cyber-wp.png)](https://www.loginradius.com/resource/why-is-end-user-cyber-security-training-mandatory/)


### #2. RPKI adoption

MANRS also recommends using Routing [Public Key Infrastructure](https://www.loginradius.com/blog/start-with-identity/pki-future-secure-communications/), a security framework used to help internet service providers or operators make more informed decisions with regards to secure routing. 

Its main function is to prove the association between special IP address blocks. Doing so can reduce the occurrence of route leaks and mitigate the blast radius of any BGP hijacking incident.

However, the only downside of RPKI adoption is that it can be significantly expensive for an ISP or an enterprise to introduce into their network. This is the reason why only a minority of the world’s network adopts an RPKI. 


## The Bottom Line

The reliance on BGP can be a double-edged sword as, on the one hand, it can be extremely convenient, while on the other, it can have major security lapses. However, enterprises and ISPs can drastically reduce the risk of BGP hijacking by adopting the aforementioned safe practices. 


[![book-a-demo-loginradius](book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)