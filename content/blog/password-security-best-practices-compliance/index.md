---
title: "Password Security Best Practices & Compliance"
date: "2020-11-12"
coverImage: "password-security.png"
author: "Vijay Singh Shekhawat"
tags: ["Security", "Password","Compliance","Passowrd Policy"]
---

Application Security is one of the primary concerns for a software developer. People trust your application and share sensitive or personal information. As a software developer, you need to take care of your application user information security. Authentication and authorization both play critical roles in application security. They confirm the identity of the user and grant access to your website or application.

The process in which confirm the user's identity and provides access to sensitive information is called authentication. Generally, authentication is done through the email/username/password. Authentication using the password is the older and common way, so passwords are a critical component of user's identity security. Password policy is the front line of defense to protect user identity. However, weak passwords may violate compliance standards. A simple or common password could be reversed engineered back to plaintext and sold on the dark web, or result in a costly data breach if compromised.

### Why We needed Password Policy & Compliance 
Password policies and compliance are rules and methods that enforce the user for using a secure and robust password. A billion credentials were stolen last year from multiple data breaches. According to [Verizon's Data Breach Report](https://enterprise.verizon.com/resources/reports/2017_dbir.pdf), 81% of data breaches are caused by compromised, weak, and reused passwords. According to [National Cyber Security Centre (NCSC)](https://www.bbc.com/news/technology-47974583) recent analysis, millions of peoples are using easy to guess passwords like ` 123456`. Recently a security researcher [claimed](https://techcrunch.com/2020/10/22/dutch-hacker-trump-twitter-account-password/) he hacked President Trump's tweeter account by guessing his password ` maga2020!` so now we can understand the need for Password Policy & Compliance. You can check the top worst passwords list [here](loginradius.com/blog/2019/12/worst-passwords-list-2019/).


#### 1. Minimum Password Age policy
The Minimum password age policy is to decide how many days minimum users must keep a password before changing it. This password policy.

#### 2. Enforce Password History policy

The "Enforce password history" policy is used to make sure the number of unique passwords a user must set before reusing an old password. This is an important policy because password reuse is a common issue – the user feels more comfortable with the old passwords. Using the same password for a long duration for a particular account, it will create a strong chance for the password compromised in some way, such as in a brute force attack. Password age policy shouldn't be efficient until the password history policy. Users must change their password, but they can reuse an old password; the effectiveness of a password age policy is greatly reduced.

#### 3. Minimum Password Length policy

The Minimum Password Length policy decides the minimum number of characters needed to create a password. Minimum Password Length should be at least eight characters or more. Longer passwords are generally more secure and harder to crack than short ones. For even greater security, you could set the minimum password length to 14 characters.

#### 4. Passwords Must Meet Complexity Requirements policy

The Passwords Complexity Requirements policy make sure user shouldn't use basic passwords. Passwords should be a combination of uppercase, lowercase, and numbers also include some special characters. We can set the following policies in the password Complexity Requirements.

* The Passwords shouldn’t contain the user name or name and basic profile fields, such as their first name.
* The Password must use following characters combinations 
  - Uppercase letters 
  - Lowercase letters 
  - Non-alphanumeric characters 
  - (special characters): (~!@#$%^&*_-+=`|\(){}[]:;"'<>,.?/) 
  - Numberaic characters

#### 5. Common Password Protection
The users shouldn't use the common passwords, so Restrict the use of common passwords. You can refer to this [document](https://www.loginradius.com/docs/authentication/concepts/common-password/) for a common password list maintained by LoginRadius and this list is dynamic, and it gets updated from time to time.

#### 6. Dictionary Password Prevention
A Password dictionary is a file that contains a list of potential passwords. This feature prevents your user's from setting a password available in the dynamic password dictionary. We are using this dynamic [Password Dictionary](https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt) in the LoginRadius to prevent the use of dictionary passwords.

#### 7. Password Audit policy

Enabling the Password Audit policy allows you to track all password changes. By monitoring the modifications that are made, it is easier to track potential security problems. This helps to ensure user accountability and provides evidence in the event of a security breach.


#### Password Compliance
Password compliance is a set of rules to enhance user's data security by encouraging users to use strong passwords and use them properly.

#### 1. FDA (U.S. Food and Drug Administration)

The FDA regulates the set of rules for the food, drugs, biologics, medical devices, electronic products, cosmetics, veterinary products, and tobacco products Industries.

Passwords for FDA Industry Systems accounts must meet ALL of the following requirements:

* It should be at least 8, but no more than 32 characters.
* It should contain one UPPERCASE letter.
* It should contain one lowercase letter.
* It should contain at least one special character: ~ ! @ # $ % ^ * ( ) _ - + = { } [ ] | : ; " , ?. Do not use <> & or '.
* It should contain one number digit (numbers).

#### 2. HIPAA (Health Insurance Portability and Accountability Act)

The Health Insurance Portability and Accountability Act (HIPAA) enforce a set of rules for sensitive patient data protection. Companies that deal with protected health information (PHI) must ensure HIPAA compliance.

* It should contain both upper and lower case characters (e.g., a-z, A-Z);
* It should contain digits (numbers) and other non-letter characters such as `!@#$%^&*()_+|~-=\'{}[]:";<>?,./ `;
* It should be at least 8 characters long;
* It should not be a word in any language, slang, dialect, jargon, etc.; and
* It should not be easily ascertained from the research of publicly available information, such as names of family members, school names, addresses, etc.

#### 3. PCI DSS (Payment Card Industry Data Security Standard)

PCI is the set of rules or guidelines for the businesses that are dealing with payment card data.

* It should be at least eight characters long.
* It should contain both numeric and alphabetic characters.
* Users should change passwords once every 90 days.
* used to make the sure number of unique passwords a user must set before reusing an old password Password parameter are set to require that new passwords cannot be the same as the four previously used passwords.
* First-time passwords for new users and reset passwords for existing users are set to a unique value for each user and changed after first use
* User accounts are temporarily locked-out after not more than six invalid access attempts.
* Once a user account is locked out, it remains locked for a minimum of 30 minutes or until a system administrator resets the account.
* System/session idle time out features have been set to 15 minutes or less.* Passwords are protected with strong cryptography during transmission and storage.

#### 4. NIST (National Institute for Standards and Technology)
NIST creates a set of rules or guidelines for the businesses that are providing services to the federal government. These guidelines to help federal agencies meet the requirements of the FISMA; however, other organizations reference NIST for strong security standards. 

* It should be a minimum of eight characters and a maximum length of at least 64 characters 
* It may use all special characters but no special requirement to use them
* It should restrict sequential and repetitive characters (e.g., 12345 or aaaaaa)
* It should Restrict context-specific passwords (e.g., the name of the site, etc.)
* It should Restrict commonly used passwords (e.g., p@ssw0rd, etc.) and dictionary wordsRestrict passwords obtained from previous breach corpuses


### Summary
I have explained why we needed a strong password policy & compliance. It doesn't matter how strong a password you are using, but bad guys are using new methods or technologies for exposing the user data.
Most of the data breaches are happing because of Common or weak passwords. MFA, passwordless, or one-time password are providing additional security for a user account.  

### Source

https://www.fda.gov/food/online-registration-food-facilities/random-password-generator-fda-industry-systems#:~:text=Passwords%20for%20FDA%20Industry%20Systems,At%20least%20one%20lowercase%20letter.

https://uwm.edu/hipaa/security-guidelines/#password

https://pcipolicyportal.com/blog/pci-compliance-password-requirements-best-practices-know/

https://spycloud.com/new-nist-guidelines/
