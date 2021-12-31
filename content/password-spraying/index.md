---
title: "Password Spraying: What is it and how to prevent it?"
date: "2021-04-07"
coverImage: "password-spraying-cover.jpg"
category: ["all", "Security"]
featured: false
author: "Srishti Singh"
description: "Password spraying is not a targeted attack, it is just one malicious actor acquiring a list of email accounts or gaining access to an active directory and attempting to sign in to all the accounts using a list of the most likely, popular, or common passwords until they get a hit. In this article, we detail what is password spraying, how to not be vulnerable to password spraying."
metatitle: "What is Password Spraying and How to Prevent it?"
metadescription: "What is password spraying, how to prevent password spraying, and what to do if you suspect that your organization has been affected by a password spraying attack."
type: "start-with-identity"
---

While cyber breaches generally make for breaking news in the digital world, sometimes the attack tactics themselves claim much media attention for their uniqueness. From ransomware to phishing attacks, we have heard them all.

But the one hacking tactic that is generating a lot of attention is password spraying, an attack in which hackers literally "spray" a number of passwords at many usernames to gain access to accounts.

A [2020 Data Breach Investigations Report](https://enterprise.verizon.com/resources/reports/dbir/) revealed that over 80 percent of hacking-related data breaches involve stolen or lost credentials and employ brute force attacks, which makes password spraying a legitimate security concern.

While such attacks cannot be prevented, they can be detected and even stopped mid-attack. In this article, we detail what is password spraying, how to not be vulnerable to password spraying, and what to do if you suspect that your organization has been affected by a password spraying attack.

We've also listed how LoginRadius can help mitigate losses from password spraying using our robust CIAM platform.

## What is Password Spraying

Password spraying is identified as a high-volume attack tactic in which hackers test multiple user accounts using many common passwords to gain access. Trying a single password against several user accounts before attempting a different password on the same account allows hackers to circumvent the usual account lockout protocols, enabling them to keep trying more and more passwords.

Hackers can go after specific users and cycles using as many passwords as possible from either a dictionary or an edited list of common passwords. Password spraying is not a targeted attack, it is just one malicious actor acquiring a list of email accounts or gaining access to an active directory and attempting to sign in to all the accounts using a list of the most likely, popular, or common passwords until they get a hit.

The key takeaway from password spraying is that user accounts with old or common passwords form the weak link hackers can exploit to gain access to the network. Unfortunately, password spraying attacks are frequently successful because so many account users fail to follow the best password protection practices or choose convenience over security.

The [most common passwords](https://www.loginradius.com/blog/start-with-identity/2019/12/worst-passwords-list-2019/) of compromised accounts in 2019 included obvious and simple number combinations, first names, and ironically, the word "password" itself. Any hacker armed with a large bank of common passwords can ably hack into accounts and cause devastating data breaches.

If that isn't scary enough by itself, today's tech-savvy hackers have adopted more precise approaches, focusing on single sign-on (SSO) authentication and guessing credentials to gain access to multiple applications and systems.

Cloud-based applications are also very susceptible to password spraying, as are any applications using federated authentication. This particular approach can enable bad actors to move laterally, taking advantage of internal network vulnerabilities to access sensitive data and critical applications.

Some of the common TTP (tactics, techniques, and procedures) employed in password spraying include the following:

- Conducting online research and employing social engineering tactics to target specific organizations and user accounts.
- Using easily guessable, common passwords to launch password spray attack.
- Using compromised accounts to gain access to more email lists to go after more accounts.
- Expanding laterally within networks to steal valuable data.

## How to Prevent Password Spraying Attacks

Now that we know what password spraying is, we move on to the most crucial topic: how to avoid becoming a victim.

Here we list out a few tips that can help safeguard your company against password spray password list attacks:

---

**Enable multi-factor authentication (MFA)**

One of the best ways to prevent any kind of hacking attempt is to [enable multi-factor authentication](https://www.loginradius.com/resource/buyers-guide-to-multi-factor-authentication/) across an organization. That way, users will have to provide two or more verification factors to sign in or gain access to applications and accounts, thereby reducing the risk of password spraying.

**Enforce the use of strong passwords**

A strong password is the best protection against any attack. Conduct awareness programs for employees on the risks of hacking and data loss and enforce strong passwords beyond first names, obvious passwords, and easy number sequences.

**Review passport management programs**

Conduct regular reviews of passport management programs and software in organizations. Invest in password management software to effectively manage user accounts and add an extra layer of security.

**Create security awareness at workplaces**

Provide security awareness training for your employees to bring them up to speed on the latest threats and the importance of protecting themselves from malicious attacks. Employ and promote best practices, so the workforce knows how to protect their personal information and company data from hackers.

**Have procedures in place for password resets and user lockouts**

Password reset requests and user lockouts are common and frequent occurrences among organizations. Ensure that your service desk has detailed procedures in place to handle password resets and lockouts effectively.

## Password Spraying versus Credential Stuffing

While password spraying involves testing multiple passwords against a user account, credential stuffing is a type of brute force attack that depends on automated tools to test massive volumes of stolen passwords and usernames across multiple sites till an account gives in. Both methods of cyberattacks are used to steal user credentials and facilitate account takeovers.

## What to do if You Suspect Your Organization Was Affected by a Password Spraying Attack

As we mentioned earlier, password spraying attacks cannot be prevented but definitely detected and stopped before further damage can be done. If you suspect that your organization has been affected by a password spraying attack, here's what you can do:

- In the absence of MFA, immediately reset passwords for privileged and administrative domain accounts.
- Configure your [security logging platform](https://www.loginradius.com/blog/start-with-identity/2020/12/login-security/) to identify failed login attempts across the office's various systems and launch an immediate response and investigation into suspicious activities.
- Engage an Endpoint Detection and Response (EDR) technology or Deception Technology on endpoints to view the malicious activity and block hackers from moving laterally.
- Review incident response plans and appropriate alert members as a further precaution.
- Hire a security firm with digital forensic and incident response capabilities to identify compromised accounts, investigate for potential data loss, and for additional support.

## Mitigating Password Spraying Attacks With the LoginRadius' CIAM Platform

LoginRadius introduces seamless registration and authentication for your valued users with passwordless login. LoginRadius Identity Platform is a unique CIAM platform that is fully customizable to fit your company's needs.

[![passwordless-login](passwordless-login.png)](https://www.loginradius.com/resource/loginradius-ciam-passwordless-login/)

The Consumer Identity and Access Management (CIAM) platform has also proved valuable to the retail and e-commerce industry, offering seamless and scalable identity management solutions that identify and protect consumer data.

LoginRadius offers the following security benefits for enterprises.

- **Password security**: The platform is equipped with features like setting password validation (minimum/maximum length, at least one special character, alphanumeric, etc.), enforcing password lifetime, password history, and password visibility.
- **Security against brute force attack**: A [Brute Force Attack](https://www.loginradius.com/blog/start-with-identity/2021/02/brute-force-lockout/) is a common practice of hackers trying various passwords until they find the right password. When it happens, you have the option to suspend your consumer's account for a set period of time, prompt the captcha option, ask security questions, or block the account entirely.
- **Risk-based authentication (RBA)**: RBA is an authentication system in which a new layer of protection is activated if there is a minor change in consumer conduct, such as a changed IP address, suspected search history, or some other act that seems suspicious and dangerous. LoginRadius is the ideal RBA solution for enterprises of all sizes offering authentication protocols like biometrics, push notifications, OTP, and tokens.
- **Multi-factor Authentication (MFA)**: MFA requires consumers to pass through multiple layers of authentication during login.

## Conclusion

As technology advances, so must we. There's no longer any benefit to sticking to traditional methods, and as far as identity management is concerned. Going passwordless just might be what your company needs to protect itself from not just password spraying, but from a host of other equally malicious cyber-attacks.

[![book-a-demo-loginradius](book-a-demo-loginradius.png)](https://www.loginradius.com/book-a-demo/)
