---
title: "Top 11 Web App Authentication Vulnerabilities and How to Fix Them"
date: "2021-12-29"
coverImage: "cover-image.jpeg"
author: Ezekiel Lawson
tags: ["Authentication","Security", "Web Application"]
description: "This article will highlight those flaws as well as how to fix them."
---

Authentication is the process of confirming a user's or process's identity. When authentication is breached, attackers can gain access to the user's data or information, causing damage to your application. Authentication is one of the ways attackers can gain access to a user's data and your application.

Authentication security is an important aspect of web app development that is often overlooked while creating a product. However, if you intend to submit your application online, it is a top priority. In this article, I'm going to explain some of these mistakes and how to fix them.ion online, it is a top priority. In this article, I'm going to explain some of these mistakes and how to fix them.

When it comes to authentication, there are five common blunders to avoid:

1. Incorrect Login
2. Displaying Error Messages
3. Integrating Session IDs into a URL
4. Validation of the form is incorrect.
5. Low form sanitization
6. Weak password plan
7. Not using a Two-Factor Authentication (2FA)
8. Improper Password Reset
9. Insecure Logout
10. Brute Force Attack
11. Using weak Security Question

## Incorrect Login

An incorrect login can expose data, allowing attackers to wreak havoc on your web application. Many times i have seen people login with incorrect details.

## Displaying Error Messages

I see this mistake far too often: displaying error warnings that allow an attacker to guess a person's user name and password using an automated trial and error approach.

When authenticating a form on your web application, you must be very careful not to display just one error message when a user types in an invalid password: "Your password is incorrect". This may lead the attacker to believe that the email address or user id is real but the password is incorrect, allowing the attacker to suggest a password for that user. "Incorrect username or password" is the best method to display this problem.

**How to fix it**

* Never show an error message on the webpage, this allows the user to suggest missing data and hack the user's data in your application.
* Always display generic messages like "incorrect login details" instead of displaying a specific message of the login error "incorrect password"

## Integrating Session IDs into a URL

A session ID is a number that is assigned to a single user by a Web site's server for the duration of that user's visit (session)

The chance of an attacker obtaining and abusing a session token if it is placed directly in the URL is increased. Although the risk is lower when utilizing HTTPS to connect to the webserver, there is still a danger. HTTPS URLs are encrypted while in transit, although they are frequently kept in server logs.

**How to fix it**

* Validate the session ID on the server-side
* To create the token, make sure you're using a safe enough random generator.
* To remove the Session ID from a URL, use Filter.

## Validation of the Form is incorrect.

Injection attacks, memory leaks, and compromised systems can occur if data provided into a form input is not properly checked or formatted. Because a form can be submitted without the user filling out all of the needed information, validating your form is critical in your application. However, at this level, all fields are confirmed when the user attempts to submit the form. During transmission, however, they are frequently saved in the server.

**How to fix it**

* Make sure the email has email address formatting.
* Ensure the user has met the criteria for the form submission before submitting
* Validate the form from the backend and frontend using an updated library or framework

## Sanitization of Forms at a Low Level

The process of keeping your form input clean, filtered, and sanitized from a malicious agent is known as form sanitization. sanitizing your input is a must because it prevents injections flaws.

**How to fix it**

* It's considerably easier and safer to utilize a whitelist for well-defined inputs like numbers, dates, or postcodes. In that manner, you may explicitly state what values are allowed and what values are not.
* Use the predefined whitelisting logic in the built-in data type definitions with HTML5 form validation.

## Weak Password Plan

It's not unusual to come across a website that doesn't have a strong password plan in order. I recently tried an application that required a five-character minimum password length. As developers struggle to strike the right mix between security and usability, this vulnerability is becoming increasingly widespread.

**How to fix it**

* Let your password input requires a minimum of eight characters.
* Passwords incorporating usernames or corporate names should be avoided for the sake of security and usability.
* Upper and lowercase letters should be mixed.
* Use a library to calculate the password's strength, be cautious while selecting, and check for minimal dependencies and maintainability.
* When a person has a public profile, use a different display name and avoid using the user's email address as the display name because this invites spam.

## Not using a Two-Factor Authentication

The lack of extra security safeguards is another common vulnerability I see with web authentication mechanisms. Two-factor authentication is rarely used by developers, especially for top accounts.

**How to fix it**

* There are a variety of ways to use 2FA encryption, RSA tokens, code generators like Google Authenticator and Duo, and SMS text sending of one-time codes are all options for implementing 2FA technology.

## Improper Password Reset

This isn't that often, but now and then I test a web application that has this capability implemented incorrectly. This is frequently due to the password being provided to the end-user through email or the token being used for the reset being weak.

Sending the plaintext password back to the end-user is another issue that affects password resets.

This is terrible for a variety of reasons, one of which is that the password was sent by email, which is considered unsafe. This could mean that the password was stored in the database without sufficient blanching and hashing, or that it was stored in a reversible format like base64.

**How to fix it**

* Always encrypt user passwords before storing them, do not store them in their raw form.
* Only then send transactional emails after validating and verifying email addresses by checking for valid characters and sending a verification link with a token.

## Insecure Logout

This is another vulnerability that can cause great havoc to your application. To avoid session hijacking attempts, it's also critical to provide your users with a safe logout option.

If you're storing the session identifier on the server side, the logout method should invalidate it and erase the session cookie in the browser. This safeguards against attackers who try to intercept session cookies and use a stolen cookie to re-establish a session.

**How to fix  it**

* When logging out a user ensure to clear the session cookie in the browser, and invalidate the session identifier if you are storing it on the server-side
* During logout, user sessions and authentication tokens should be correctly invalidated.

## Brute Force Attack

Brute Force is a hacking technique used to find out the user credentials by trying various possible credentials. In this attack,

hackers try to guess passwords to get past the authentication for a single account. Using scripts that try a large number of regularly used passwords from a dictionary as well as millions of leaked passwords gathered from prior data breaches, these attempts have a better probability of succeeding.

**How to fix it**

* Limit login attempts to a defined IP address or range by blocking access to the authentication URL.
* Use no terms from dictionaries in any language. Rather than using words, it is preferable to use random character strings.
* Block malicious IP addresses with CAPTCHAS.
* I recommend keeping track of a user's failed login attempts and locking the account.

## Using weak Security Question

A security question or memorable word can also assist guard against automated attacks. I have encountered security questions that are weak and have predictable responses, which allows an attacker to suggest or guess answers and obtain access to the user's data.

**How to fix it**

* Do not rely on security questions as the sole mechanism to authenticate a user
* Always use security questions when logging in, and resetting a forgotten password
* Stored the answers using a secure hashing algorithm such as Bcrypt

With built-in advanced security capabilities and world-class protection for your application, user accounts, and data, LoginRadius helps enterprises to create a wonderful customer experience. For your application, they have the world's most secure, dependable, and easy-to-implement user authentication solution.

## Conclusion

These are the most typical authentication flaws I detect on online application penetration tests, as stated in the blog title. Other vulnerabilities affect web application authentication mechanisms, but in my experience, these are less widespread. Hopefully, this article has highlighted those flaws as well as how to fix them.