---
title: "How Lapsus$ Breached Okta and What Organizations Should Learn"
date: "2022-03-25"
coverImage: "how-lapsus-breached-okta.png"
author: "Deepak Gupta"
tags: ["Breach", "Cybersecurity"]
description: "Businesses have to be extra vigilant in safeguarding customer data. Minor mistakes can cause a massive data breach, violating data privacy regulations and attracting penalties from regulatory authorities."
---

Protecting customer data is paramount to every business organization. Even though businesses deploy the most stringent security measures to safeguard data, malicious actors somehow find security shortcomings to access network systems and cause data breaches, compromising the confidentiality, integrity, and availability of information.

Cybersecurity firms like Okta, which provides identity management solutions and deals in authentication space, make the backbone of an organization's cybersecurity posture. Okta serves 15000+ customers worldwide. The Okta data breach by Lapsus\$ is a recent example of what can happen if business organizations depend on third-party solution providers who show laxity in implementing robust cybersecurity strategies, frameworks, and controls.

It is also a cautionary tale for cybersecurity MSPs (Managed Services Providers) and ITSPs (IT Solution Providers) to ensure that they have the best of security controls in place to prevent incidents like this.

## What Is Okta?

Okta is an identity platform and offers identity and access management solutions such as Single sign-on (SSO), Multi-Factor Authentication (MFA), etc., for an organization's customers and employees.

## Why Is Okta In the News?

Okta’s CSO (Chief Security Officer) [David Bradbury](https://www.okta.com/blog/2022/03/updated-okta-statement-on-lapsus/) recently published an [official statement](https://sec.okta.com/articles/2022/03/official-okta-statement-lapsus-claims) about a support engineer whose computer was accessed by malicious actors for five days in mid-January (between January 16 to 21, 2022) and said they detected the unsuccessful attempt early on.

## How Was the Attack Executed?

Okta has now confirmed that malicious actors had access to one of its employees' laptops for five days in January 2022 but maintained there has been no data breach and remains fully operational. However, they concede that around [2.5% of its customers (about 366)](https://www.okta.com/blog/2022/03/updated-okta-statement-on-lapsus/) might have been affected.

Here is how the attack happened.

- On March 22, 2022, a hacking group identifying itself as Lapsus\$ posted some screenshots in its Telegram channel claiming to have compromised Okta's internal systems. The screenshots included Okta's Slack channels, super admin dashboard (access to reset passwords and MFA of their business customer’s employees — the customer in the screenshot was Cloudflare), and JIRA board.
- Okta's CSO responded through a blog post stating that the incident that Lapsus\$ refers to had happened in January 2021 when it detected an attempt by hackers to compromise the account of a customer support engineer working for a third-party service provider.
- Okta alerted the service provider, suspended the engineer's account, and terminated the user's active Okta sessions. Besides, the company shared pertinent information with a third-party forensics firm for investigation.
- The investigation reported that hackers accessed the engineer's laptop for five days in January 2022.
- However, Lapsus\$ claims that it had gained admin access to Okta's systems for two months, and it found Okta storing AWS keys in Slack channels. Furthermore, the hacker group claimed that it used its access to focus on Okta's customers.

## Who Is Behind Okta’s Breach?

News reports show that a group of unscrupulous actors identifying themselves as Lapsus$ in their Telegram channel was behind this Okta breach. They were aided by a customer support engineer working for a third-party service provider whose laptop was accessed by these hackers to gain vital information. Lapsus$ is also known as a notorious threat actor group — [DEV-0537](https://www.microsoft.com/security/blog/2022/03/22/dev-0537-criminal-actor-targeting-organizations-for-data-exfiltration-and-destruction/). This group has a history of taking over individual user accounts to drain their crypto holdings at cryptocurrency exchanges.

## The Key Reasons That Caused The Security Breach

The forensics report cited by Okta's CSO did not state how the hackers managed to gain access to the support engineer’s laptop, but the fingers point towards negligence by the engineer. However, the hackers claim to have had access to Okta's systems for more than a month before the January 2022 incident. If these claims are valid, it indicates a significant security breach at Okta's network center.

### Okta Breach: What Was the Impact?

The Okta breach exposed the security frailties of the Okta network system and put 15,000 Okta customers’ data at risk. However, Okta stated it had contacted the affected 2.5% of customers, appraising them of the matter. Okta further noted that the customers need not take any precautionary measures as their data is safe.

The CSO blog post went on to add that the damage was restricted to the access that support engineers have, such as Jira tickets and lists of users. Though customer support engineers facilitate password resetting and MFA, the hackers did not seem to have obtained this information. The CSO also confirmed that customer service engineers could not create or delete users.

Notably, Okta's customers include high-profile enterprises like FedEx Corporation and Moody's Corporation. Hence, [Okta's shares plunged 11%](https://www.reuters.com/technology/okta-says-up-366-customers-have-potentially-been-impacted-by-hacker-attack-2022-03-23/) immediately after hackers claimed the breach that has put thousands of Okta customers at risk.

## What to Learn From Okta's Cyber Hack?

### 1) Limit Access on a ‘Need-to-Know’ Basis

Limiting access and permissions to the employees is the first step to take. Employees and contractors should only be provided access on a 'need-to-know' basis and must be provided on a ‘least privilege’ basis (minimum access needed to perform a task or job). For example, support engineers shouldn't be able to access internal HR, accounting, or payroll systems. At the same time, marketing personnel should not have access to network configuration or applications that they do not use.

### 2) Validate Third-party Apps and SaaS Solutions

In an increasing multi-cloud and hybrid-cloud environment, it's paramount to understand the s IT ecosystem, third-party APIs (Application Programming Interfaces) and applications, and Software as a Service (SaaS) solutions deployed. Requesting SOC reports from vendors and contractors can help understand how their information systems are maintained and secured.

### 3) Implement Robust IAM-PAM Solutions

Implementing robust processes around Identity and Access Management (IAM) and Privileged Access Management (PAM) can help strengthen the cybersecurity posture by making it almost impossible for attackers to barge into the organization’s periphery.

### 4) Train Employees and Customers

'People' are the most valuable asset for any organization but can also be the weakest link in the cybersecurity chain. Therefore, organizations must regularly review the processes around training and educating employees, vendor-contractors, customers, and users to follow basic cyber hygiene.

### 5) Be Vigilant

Organizations must continue to monitor and audit the control environments. Leveraging automated monitoring and alerting tools can help overcome many challenges SOC teams face.

### 6) Audit and Review Regularly

Organizations should perform internal audits and review the systems and monitor the traffic and access permission more frequently. It is also advisable to engage third-party audit firms to get an external and independent view of the cybersecurity posture.

### 7) Communicate Transparently

In case of a security incident, it is essential to be transparent to the employees, customers, vendors, and regulators and communicate with them immediately about the incident. Organizations should also provide specific guidance on how to safeguard the information assets.

## To Conclude

The Okta breach shows that no business organization is 100% safe from malicious attacks. One simplest security issue is sufficient for malicious actors to wreak havoc.

In this specific example, the hackers accessed the laptop of one of Okta's customer service engineers to gain vital insights into the company's customer data. Such incidents prove that customers can never be sure that their information is safe and leak-proof.

However, it offers a valuable learning experience that business entities should not ignore the minutest of details regarding network security. It surfaces the adage that ' A chain is only as strong as its weakest link.'
