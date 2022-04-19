---
title: "What Is Broken Authentication and How to Prevent Your Company From It"
date: "2021-02-17"
coverImage: "what-is-broken-authentication.jpg"
tags: ["security"]
featured: false
author: "Deepak Gupta"
description: "If a hacker successfully logs with stolen credentials, they can misuse your privileges and impact your company's sustainability. Authentication protects a consumer's identity by allowing only a verified user to enter into the system. But there are numerous ways through which a hacker can impersonate consumers and enter inside the system."
metatitle: "What is Broken Authentication and How to Prevent it"
metadescription: "Learn what is broken authentication and its impact on consumers and businesses. How to prevent broken authentication vulnerability, examples and more."
---

No matter what online platforms or applications you use, you are never fully protected against cyberattacks.

Statistics provide testimony to this fact as the number of [data breaches rose by 37% in 2020 ](https://www.theweek.in/news/biz-tech/2020/11/17/india-sees-37-increase-in-data-breaches-cyber-attacks-this-year.html#:~:text=Data%20breaches%20have%20shown%20a,of%202020%20compared%20to%202019.&text=%E2%80%9CIn%20India%2C%20data%20breaches%20have,breaches%20are%20invariably%20not%20reported.)compared to 2019, and the trend is only increasing. 

The first step to protect your organization against such attacks is to have a comprehensive understanding of the issue.

Let us begin by figuring out what is broken authentication.

Very simply put, when the hacker gains access into the system admin's account by using the online platform's vulnerabilities, particularly in two areas: credential management and session management, it's referred to as broken authentication.

Authentication protects a consumer's identity by allowing only a verified user to enter into the system. But there are numerous ways through which the hacker impersonates the consumer and enters inside the system. 

The weaknesses inherent in the system, as mentioned above, can be divided into two different groups, namely poor credential management and poor session management.  


## What Scenarios Can Cause Broken Authentication

As mentioned earlier, the primary reasons for broken authentication. Let’s understand them one by one.


### a. Poor credential management

Consumer credentials can be hijacked to gain access to the system. There are various ways that the hacker can steal critical information, such as the following:


*   **Weak passwords**: The consumer creates a weak password like '12345' or 'pass123'. The hacker can use various password cracking techniques like rainbow tables and dictionaries to gain access to the system.
*   **Weak cryptography**: Using weak encryption techniques like base64 and weak hashing algorithms like SHA1 and MD5 make credentials vulnerable. Which is why they must be stored using strong hashing algorithms that make password cracking challenging. 


### b. Poor session management

Let’s assume you like playing online games. You log in to the application and make several interactions with the network. 

The application issues a session ID whenever you log in and records all your interactions. It is through this ID that the application communicates with you and responds to all your requests. 

The [OWASP broken authentication](https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication) recommendations state that this session ID is equivalent to your original login credentials. If hackers steal your session ID, they can sign in by impersonating your identity. This is known as session hijacking.  

The following points list the scenarios that can cause broken authentication.

1. Weak usernames and passwords.

2. Session fixation attacks.

3. URL rewriting.

4. Consumer identity details aren't protected when stored.

5. Consumer identity details are transferred over unencrypted connections.


## What Is the Impact of Broken Authentication and Session Management

If a hacker successfully logs in by stealing your credentials using any of the above mentioned broken authentication techniques, they can misuse your privileges and impact your company's sustainability. 

Cybercriminals can have various intentions of [hijacking your web application](https://www.loginradius.com/blog/start-with-identity/2021/01/7-web-app-sec-threats/), such as:



*   Stealing critical business data
*   Identity theft
*   Sending fraud calls or emails.
*   Creating malicious software programs for disrupting networks.
*   Cyber terrorism
*   Cyberstalking
*   Selling illegal items on the dark web
*   Sharing fake news on social media

In short, hackers can use broken authentication attacks and session hijacking to gain access to the system by forging session data, such as cookies, and stealing login credentials. 

Thus, it would be best if you never compromised with your web applications' security. 


### Broken Authentication Examples

Here are a few examples of broken authentication.

**Example #1: Credential Stuffing**

Suppose you run a departmental store and sell groceries. To grow your business rapidly, you implement a CRM system that stores critical customer data, such as name, phone number, username, and password. 

Hackers make their way inside the CRM system and steal all the data. They then use the same credentials — usernames and passwords — to hack into the central bank's database. 

In this case, hackers are trying to successfully log in to the central bank's database by hoping that a handful of consumers must be using the same credentials at both places. Such kinds of broken authentication attacks are called [credential stuffing](https://www.loginradius.com/blog/start-with-identity/2019/09/prevent-credential-stuffing-attacks/).

**Example #2: Application session timeouts aren't set properly.**

Suppose you go to a cyber cafe and login your Gmail account. After sending the email, you close the browser tab and return home. 

Sometime later, the hacker opens your Gmail account and gains access to your crucial information. It happens because your credentials — username and password — haven't been invalidated adequately during logout. 

Thus, if the application session timeouts aren't set properly, hackers can execute a broken authentication attack.

[![buyer-guide-to-multi-factor-authentication-ebook](buyer-guide-to-multi-factor-authentication-ebook.png)](https://www.loginradius.com/resource/buyers-guide-to-multi-factor-authentication/)


**Example #3: Passwords are not properly hashed and salted.**

Look at the names and their hashes in the following table:

 


<table>
  <tr>
   <td>Alice
   </td>
   <td>4420d1918bbcf7686defdf9560bb5087d20076de5f77b7cb4c3b40bf46ec428b
   </td>
  </tr>
  <tr>
   <td>Bob
   </td>
   <td>4420d1918bbcf7686defdf9560bb5087d20076de5f77b7cb4c3b40bf46ec428b
   </td>
  </tr>
  <tr>
   <td>Mike
   </td>
   <td>77b177de23f81d37b5b4495046b227befa4546db63cfe6fe541fc4c3cd216eb9
   </td>
  </tr>
</table>


 

The hash function stores passwords in the form of a hash instead of plain text, which humans can easily read. But if two different users enter the same password, then their hashes will be exactly the same. 

Hackers can perform a dictionary attack and if they crack one password, they can use the same password for gaining access to other accounts that use the same hash. 

To prevent this from happening, you must salt the passwords. A salt is a random value that is either appended or prepended to the password and makes it unique. So even if two different users use the same password, their hashes will not be the same. 


## How to Prevent Broken Authentication

The following are the ways of preventing broken authentication attacks:

1. Implement [multi-factor authentication (MFA) ](https://www.loginradius.com/blog/start-with-identity/2019/06/what-is-multi-factor-authentication/)to verify the consumer's identity. Examples include One-Time Password (OTP) messaged or emailed to the user. This step will prevent brute force attacks, credential stuffing, and stolen credential reuse attacks.

2. Use weak-password checks by forcing users to include a mix of small letters, capital letters, alphanumeric symbols, and special characters while creating passwords. It would be best to follow [NIST 800-63 B's guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html) in section 5.1.1 for memorized secrets.

3. Place a limit on failed login attempts to 3 or a maximum of 5. Alert the system admin if you detect an attack — brute force, credential stuffing, or any other attack.

4. Ensure that credential recovery, registration, and API pathways are not vulnerable to account enumeration attacks by using the same message for each outcome. 

5. Generating new random session IDs with high entropy after [login protects against hackers](https://www.loginradius.com/blog/start-with-identity/2020/12/login-security/). Remember, those session IDs should not be present in the URL and invalidated after logout.


## How LoginRadius Protects Against Broken Authentication 

LoginRadius has been at the forefront of offering a multilevel security web app environment. Here is how LoginRadius applications protect against broken authentication:



*   End-to-end SSL encryption for data in transit and ensures protection against unauthorized access. 
*   Multi-factor authentication to eliminate the risk of being exposed to attacks.
*   One-way hashing of passwords considerably improves consumer security.
*   Single sign-on (SSO) solution allows users to use the same profile to log in everywhere.


## Conclusion

Apart from the steps mentioned in this article, it's essential to train and educate your employees about broken authentication attacks. It would be best if you also employed [top-notch cybersecurity measures](https://www.loginradius.com/blog/start-with-identity/2019/10/cybersecurity-best-practices-for-enterprises/) to protect your company's database from session hijacking, credential stuffing, and other broken authentication attacks. 

[![LoginRadius Book a Demo](Book-a-demo.png)](https://www.loginradius.com/book-a-demo/)
