---
title: "What is Broken Authentication Vulnerability and How to Prevent It?"
date: "2021-02-17"
coverImage: "broken-auth.jpg"
tags: ["broken authentication","mfa","data security"]
author: "Rakesh Soni"
description: "If a hacker successfully logs with stolen credentials, they can misuse your privileges and impact your company's sustainability. Authentication protects a consumer's identity by allowing only a verified user to enter into the system. But there are numerous ways through which a hacker can impersonate consumers and enter inside the system."
metatitle: "Understanding Broken Authentication: Risks & Prevention"
metadescription: "Discover the dangers of broken authentication & session management. Learn how to safeguard your accounts. Stay secure with expert prevention tips!"
---
## Introduction

No matter what online platforms or applications you use, you are never fully protected against cyberattacks.

Statistics provide testimony to this fact as the number of [data breaches rose by 37% in 2020 ](https://www.theweek.in/news/biz-tech/2020/11/17/india-sees-37-increase-in-data-breaches-cyber-attacks-this-year.html#:~:text=Data%20breaches%20have%20shown%20a,of%202020%20compared%20to%202019.&text=%E2%80%9CIn%20India%2C%20data%20breaches%20have,breaches%20are%20invariably%20not%20reported.)compared to 2019, and the trend is only increasing. 

The first step to protect your organization against such attacks is to have a comprehensive understanding of the issue.

Let us begin by figuring out what is broken authentication.

Very simply put, when the hacker gains access into the system admin's account by using the online platform's vulnerabilities, particularly in two areas: credential management and session management, it's referred to as broken authentication.

Authentication protects a consumer's identity by allowing only a verified user to enter into the system. But there are numerous ways through which the hacker impersonates the consumer and enters inside the system. 

The weaknesses inherent in the system, as mentioned above, can be divided into two different groups, namely poor credential management and poor session management.  

## What is Broken Authentication and Session Management?

Broken Authentication and Session Management is a security vulnerability that occurs when the authentication and session management mechanisms of a web application are flawed or improperly implemented.

Authentication refers to the process of verifying the identity of users, typically through usernames and passwords, while session management involves maintaining and controlling the user's session after authentication. 

When these mechanisms are compromised or misconfigured, attackers can exploit the vulnerabilities to gain unauthorized access to user accounts, impersonate other users, or hijack sessions. This can lead to severe security breaches and expose sensitive user information.

## What are the Risks of Broken Authentication?

The risks associated with broken authentication are profound and can have detrimental effects on individuals and organizations:

### Unauthorized Access to Sensitive Information

When attackers exploit broken authentication vulnerabilities, they can gain access to sensitive data such as personal information, financial details, or intellectual property. This unauthorized access can lead to data breaches and privacy violations.

### Manipulation or Deletion of User Data

Once inside the system, attackers can manipulate or delete user data, causing disruptions to services, loss of important information, and potential legal ramifications.

### Impersonation of Legitimate Users

By hijacking user sessions or impersonating legitimate users, attackers can carry out fraudulent activities on behalf of the compromised accounts. This could include fraudulent transactions, spreading misinformation, or performing actions that tarnish the reputation of the affected individuals or organizations.

### Escalation of Privileges

If the compromised account belongs to an administrator or privileged user, attackers can escalate their privileges within the application. This can lead to complete system compromise and greater control over critical functions.

### Financial Losses and Legal Consequences

The aftermath of a broken authentication attack can result in financial losses for businesses, especially if customer trust is compromised. Moreover, organizations may face legal consequences for failing to protect user data adequately.

## How to Prevent Broken Authentication?

Preventing broken authentication requires a multifaceted approach that addresses vulnerabilities at various stages of the authentication and session management processes. Here are some effective strategies:

### 1. Implement Multi-Factor Authentication (MFA)

* MFA adds an extra layer of security by requiring users to provide two or more forms of verification. This could include a one-time password (OTP) sent via email or SMS, a biometric scan, or a hardware token.

* MFA mitigates the risks of brute-force attacks, credential stuffing, and stolen credential reuse.

### 2. Enforce Strong Password Policies

* Require users to create strong passwords that include a mix of lowercase and uppercase letters, numbers, and special characters.

* Follow industry standards such as NIST 800-63 B's guidelines for memorized secrets.

* Regularly educate users on the importance of creating unique and robust passwords.

### 3. Limit Failed Login Attempts

* Implement a system that locks out user accounts after a specified number of failed login attempts (e.g., 3 or 5).

* Notify system administrators of potential brute-force attacks or suspicious login activity.

### 4. Secure Session Management

* Generate new, random session IDs with high entropy after each login.

* Ensure that session IDs are not exposed in URLs and are invalidated after users log out.

* Implement proper session expiration policies to prevent sessions from remaining active indefinitely.

### 5. Secure Credential Management

* Store user credentials securely using strong hashing algorithms such as bcrypt or Argon2.

* Avoid storing passwords in plain text or using weak encryption methods like base64.

* Implement salted hashing to make password cracking more challenging, even if multiple users have the same password.

### 6. Regular Security Audits and Updates

* Conduct regular security audits to identify and address vulnerabilities in the authentication process.

* Stay up-to-date with security patches and updates for the web application and underlying frameworks.

## What are Some Examples of Broken Authentication Vulnerability?

There are several examples of broken authentication vulnerability that highlight the potential risks. One common example is weak or easily guessable passwords, such as "123456" or "password," which can be exploited by attackers.

Another example is the lack of proper session expiration, where user sessions remain active even after a user logs out, allowing an attacker to reuse the session and gain unauthorized access. 

Additionally, if an application does not implement measures to prevent brute-force attacks, attackers can repeatedly guess usernames and passwords until they find a valid combination. Inadequate protection against account lockouts, session hijacking, or session fixation are also examples of broken authentication vulnerabilities.

## What Scenarios Can Cause Broken Authentication?

As mentioned earlier, the primary reasons for broken authentication. Let’s understand them one by one.

### 1. Poor credential management

Consumer credentials can be hijacked to gain access to the system. There are various ways that the hacker can steal critical information, such as the following:

*   **Weak passwords**: The consumer creates a weak password like '12345' or 'pass123'. The hacker can use various password cracking techniques like rainbow tables and dictionaries to gain access to the system.

*   **Weak cryptography**: Using weak encryption techniques like base64 and weak hashing algorithms like SHA1 and MD5 make credentials vulnerable. Which is why they must be stored using strong hashing algorithms that make password cracking challenging. 

### 2. Poor session management

Let’s assume you like playing online games. You log in to the application and make several interactions with the network. 

The application issues a session ID whenever you log in and records all your interactions. It is through this ID that the application communicates with you and responds to all your requests. 

The [OWASP broken authentication](https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication) recommendations state that this session ID is equivalent to your original login credentials. If hackers steal your session ID, they can sign in by impersonating your identity. This is known as session hijacking.  

The following points list the scenarios that can cause broken authentication.

* Weak usernames and passwords.
* Session fixation attacks.
* URL rewriting.
* Consumer identity details aren't protected when stored.
* Consumer identity details are transferred over unencrypted connections.

## What is the Impact of Broken Authentication and Session Management?

If a hacker successfully logs in by stealing your credentials using any of the above mentioned broken authentication techniques, they can misuse your privileges and impact your company's sustainability. 

Cybercriminals can have various intentions of [hijacking your web application](https://www.loginradius.com/blog/identity/2021/01/7-web-app-sec-threats/), such as:

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

### A Few Examples of Broken Authentication 

Here are a few examples of broken authentication.

#### Example 1: Credential Stuffing

Suppose you run a departmental store and sell groceries. To grow your business rapidly, you implement a CRM system that stores critical customer data, such as name, phone number, username, and password. 

Hackers make their way inside the CRM system and steal all the data. They then use the same credentials — usernames and passwords — to hack into the central bank's database. 

In this case, hackers are trying to successfully log in to the central bank's database by hoping that a handful of consumers must be using the same credentials at both places. Such kinds of broken authentication attacks are called [credential stuffing](https://www.loginradius.com/blog/identity/2019/09/prevent-credential-stuffing-attacks/).

#### Example 2: Application session timeouts aren't set properly.
Suppose you go to a cyber cafe and login your Gmail account. After sending the email, you close the browser tab and return home. 

Sometime later, the hacker opens your Gmail account and gains access to your crucial information. It happens because your credentials — username and password — haven't been invalidated adequately during logout. 

Thus, if the application session timeouts aren't set properly, hackers can execute a broken authentication attack.

[![buyer-guide-to-multi-factor-authentication-ebook](buyer-guide-to-multi-factor-authentication-ebook.png)](https://www.loginradius.com/resource/buyers-guide-to-multi-factor-authentication/)

#### Example 3: Passwords are not properly hashed and salted.

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

## How to Prevent Broken Authentication?

The following are the ways of preventing broken authentication attacks:

1. Implement [multi-factor authentication (MFA) ](https://www.loginradius.com/blog/identity/2019/06/what-is-multi-factor-authentication/)to verify the consumer's identity. Examples include One-Time Password (OTP) messaged or emailed to the user. This step will prevent brute force attacks, credential stuffing, and stolen credential reuse attacks.

2. Use weak-password checks by forcing users to include a mix of small letters, capital letters, alphanumeric symbols, and special characters while creating passwords. It would be best to follow [NIST 800-63 B's guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html) in section 5.1.1 for memorized secrets.

3. Place a limit on failed login attempts to 3 or a maximum of 5. Alert the system admin if you detect an attack — brute force, credential stuffing, or any other attack.

4. Ensure that credential recovery, registration, and API pathways are not vulnerable to account enumeration attacks by using the same message for each outcome. 

5. Generating new random session IDs with high entropy after [login protects against hackers](https://www.loginradius.com/blog/identity/2020/12/login-security/). Remember, those session IDs should not be present in the URL and invalidated after logout.

## Impact of Broken Authentication

The impact of broken authentication can be severe and far-reaching. When attackers successfully exploit these vulnerabilities, they can gain unauthorized access to user accounts, leading to various consequences. 

This may include unauthorized access to sensitive information, such as personal data, financial details, or intellectual property. Attackers can also manipulate or delete user data, impersonate legitimate users, perform fraudulent transactions, or even escalate their privileges within the application.

Furthermore, if the compromised account belongs to an administrator or privileged user, the impact can be even more significant, potentially compromising the entire system or network. Broken authentication vulnerabilities can tarnish an organization's reputation, result in financial losses, and expose users to identity theft and other cybercrimes.

## How LoginRadius Protects Against Broken Authentication? 

LoginRadius has been at the forefront of offering a multilevel security web app environment. Here is how LoginRadius applications protect against broken authentication:

*   End-to-end SSL encryption for data in transit and ensures protection against unauthorized access. 

*   Multi-factor authentication to eliminate the risk of being exposed to attacks.

*   One-way hashing of passwords considerably improves consumer security.

*   Single sign-on (SSO) solution allows users to use the same profile to log in everywhere.

## Conclusion

Apart from the steps mentioned in this article, it's essential to train and educate your employees about broken authentication attacks. It would be best if you also employed [top-notch cybersecurity measures](https://www.loginradius.com/blog/identity/2019/10/cybersecurity-best-practices-for-enterprises/) to protect your company's database from session hijacking, credential stuffing, and other broken authentication attacks. 

## Frequently Asked Questions (FAQs)

**1. What are the solutions for broken authentication?**

 Solutions include implementing Multi-Factor Authentication (MFA), enforcing strong password policies, limiting failed login attempts, securing session management, and regular security audits.

**2.  What is broken access authentication?**

 Broken access authentication refers to vulnerabilities in the authentication process that allow unauthorized access to user accounts, often due to flawed or improperly implemented authentication mechanisms.

**3. What can prevent authentication failures?**

Preventative measures include MFA implementation, enforcing strong password policies, limiting failed login attempts, securing session management, and using secure hashing algorithms.

**4. What is a broken authentication guessable password?**

It refers to weak or easily guessed passwords like "123456" or "password," which are vulnerable to exploitation by attackers, leading to compromised accounts.

**5. What are the risks of broken authentication?**

Risks include unauthorized access to sensitive data, manipulation or deletion of user data, impersonation of legitimate users, escalation of privileges, financial losses, and legal consequences.

**6. What are the effects of broken authentication attacks?**

Effects include data breaches, privacy violations, fraudulent activities on compromised accounts, tarnished reputation for individuals or organizations, financial losses, and potential legal ramifications.

[![LoginRadius Book a Demo](../../assets/book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)