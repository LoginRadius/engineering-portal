---
title: "React Security Vulnerabilities and How to Fix/Prevent them"
date: "2021-12-21"
coverImage: "react-security.png"
author: "Gaurav Kr. Roy"
tags: ["React", "vulnerability", "prevent", "security"]
description: "React security vulnerabilities are difficult to detect with naked eyes. However, it can be disastrous for progressive web apps if developers don't know how to fix them."
---

All React developers love to leverage the benefits React caters to in developing web applications. But developers need to keep in mind the security postures while creating React web apps. React applications face a vast attack surface and are prone to different vulnerabilities. This article is a checklist of React security best practices that every developer should know before diving into PWA (progressive web application) development. 
If you are new to progressive web applications and React, let's get familiar with these terminologies first.

## What are Progressive Web Applications (PWA)?
Progressive Web Apps (PWA) are apps built using web technologies like HTML, CSS, and JavaScript (JS). But these apps deliver the experience, feel, and functionality of a native app. PWA combines new technologies and integrations to build a reliable, engaging, accessible, and secure application. Developers mostly use React on top of HTML and JavaScript to build a progressive web app.

## What is React?
React is popular among progressive web app developers. This open-source, robust JavaScript library helps in building user interfaces based on UI components. React gains popularity in the software development industry because it allows developers to create lightweight apps with additional facilities: security, push notification, app-like look and feel, etc. Some popular companies that have become the early adopters of React are Instagram, Netflix, Airbnb, Uber Eats, Discord, the New York Times, etc. 

## Security Vulnerabilities in React and how to prevent them –
React helps developers build a reliable, robust, and secure progressive web app, but these apps face certain security pitfalls also. Developers need to give prior attention to security vulnerabilities, which are often ignored due to faster app development cycles or more focus on product features.
With the arrival of each new update in React having more features, the security flaws are getting unnoticed. Such unnoticed actions are increasing security concerns. Here is a list of top React security vulnerabilities that every React developer must address before delivering or deploying their apps.

## SQL Injection
SQL Injection (SQLi) is a widely known web application attack. The cybercriminal intends to perform database manipulation logically to access sensitive information that is not supposed to be displayed. Attackers try to sneak into that sensitive information to collect phone numbers, payment details, addresses, passwords, and other credentials.
This technique allows the attackers to manage access to the server, pull the data, and manipulate the values in the database. Apart from data modification, hackers can also delete the data. 
Let us take an example. Here is a code concerning the current username and searches for login matching the item name, where the owner is the current user.
```
string query = "SELECT * FROM login WHERE owner = "'"
+ userName + "' AND itemName = '"
+ ItemName.Text + "'";
```
Once you combine the username and item name, the following query gets generated.
```
SELECT * FROM login
WHERE owner =
AND itemName = ;
```
The issue that pops here is that the original code leverages the concept of concatenation to combine data. The attacker can use a string like <code> 'name' OR 'x'='x' </code> as the item name. <code> 'x'='x' </code> is a condition that will always evaluate as True. Therefore, the statement returns True for all values within the table. So, the following query becomes:
```
SELECT * FROM login
WHERE owner = 'karlos'
AND itemName = 'name' OR 'x'='x';
```

There are three major categories of SQL injection based on how attackers gain access to the backend data.

*  **In-band SQL Injection:** The attacker usually initiates the attack and gathers sensitive credentials through one single channel. Such SQL attacks are simple, and hence, it is one of the most commonly performed SQLi attacks on React apps. It comes with two sub-categories –
    * **Error-based SQLi:** The attacker performs a fake mimicking of the admin's credentials. Such an action provokes the database to generate an error. This error message reflects how the database schema and its structure got designed.
    * **Union-based SQLi:** The attacker uses the UNION operator of SQL to perform this attack. Using UNION, the attacker fuses multiple SELECT statements and triggers them from the web app for an HTTP response. If that single response comes with some sensitive data stored in the database, UNION-based SQLi becomes successful.
  
 * **Inferential/Blind SQL Injection:** The attacker pushes payloads targeting the server. Then they observe the behavior and keep track of the server response to know more about the database structure. Here, the attacker cannot witness the data reverting through the attack in-band, hence the name "Blind." There are two sub-categories of blind SQLi.
    * **Boolean:** The attacker sends a malicious query to the target database provoking the app to respond. Based on the True or False value, the attacker can frame other SQL queries to extract data. The result of the query is either True or False and hence the name.
    * **Time-based:** Here, the attacker sends a SQL query through the web app and waits for the response. The attacker notes down the time taken by the database to respond and checks the server response (True or False). Based on these two response parameters, the attacker re-launches another query. If the message sent through the SQL query successfully slows down the response, SQL injection is possible on that application.

 * **Out-of-Band SQL Injection:** Such attacks are more likely when the attacker senses some particular feature enabled in the server used by the React web application. This attack happens when the attacker cannot use the same channel to launch the attack and fetch data. They use such attack vectors when the server is unstable or unable to respond promptly.
 
 ### Checklist to Fix SQLi Vulnerability in React apps –
 
* A developer must follow the principle of rendering the least privilege to all accounts that will connect through a SQL query to the database.

* It is always necessary to filter all sorts of user input by following a strict whitelist. Even when an internal user provides any SQL query as input, the React app should filter those incoming SQL queries.

* A progressive web app becomes a victim of SQLi when a developer gives its database connection access to privileges like INSERT, UPDATE, or DELETE. So, developers should follow the best practice by assigning accurate database roles to separate account types.

* There could be some external factors (such as an external library, API, or software) that might drag your React application to a vulnerable position. To protect your React app from such vulnerability, the development team should scan the app periodically through any vulnerability scanner like Nessus or Acunetix.

* APIs connected to the React app can pose a threat to a significant level. Thus, a robust approach to avoid SQLi on React apps is to verify all API functions associated with their API schemas.

* Developers can place a REST API between the front-end (React code) and the back-end (database). It will create an extra layer of security that will not allow the front-end users to execute any SQL query directly. It prevents the React app from SQL injection attacks.

## Cross-Site Scripting (XSS) Vulnerabilities
The comprehensive rendering feature of React makes it a preferable choice over other JavaScript libraries and frameworks. But this rendering feature also drags React-based apps to the most widely exploited vulnerability, cross-site scripting (XSS). Cross-site scripting leverages malicious client-side scripts by injecting them into web applications. When the users trigger those scripts, the attackers gain control over the app and steal sensitive information from the web application. 

Injecting malicious scripts into the react app will make the app release some internal app data. Therefore, React developers should prevent the application from running the script. Here is a typical example of cross-site scripting where the attacker can place and execute a malicious script within the application like this:

<strong> <code> &lt;input type="search" value="PWA"/>
Now, executing malicious script will make the search look like:
&lt;input type="search" value="Attacker "/> <script&gt; StealCredentials() &lt;/script>" /&gt;
</strong> </code>

Here, StealCredentials() is a function that contains malicious scripts to steal user information.
Let us now take a look at the types of XSS.

* Reflected (Non-persistent) XSS: In this common type of XSS invasion, the attacker pushes phishing emails, malicious links or uses different hacking techniques to outwit victims to send malicious requests to the server. So, if the application is not leveraging a decent escaping method to user-provided data, the reflected XSS payload gets executed to the user's browser.

* Stored (Persistent) XSS: It is the most damaging XSS attack form that stores the payload somewhere on the server-side. The attacker uses that payload or malicious script (mostly a JavaScript code) into the target React application. If the application does not render any input validation, the malicious code gets stored permanently (persistent) within the database. Popular web application areas where attackers try this attack are in the blog comment box or a forum post.

* DOM-based XSS: Attackers can implement such XSS invasion when the web application follows the Document Object Model (DOM) structure. A progressive web app leveraging the principle of DOM stores the data on the client-side. The browser has to read and display the output from that stored data. In DOM-based XSS, the attacker injects the malicious code or payload in the DOM and hence the name. The attack mechanism executes the injected payload when users read the data back from the DOM.

### Checklist to Fix XSS Vulnerability in React apps –
This attack gains popularity, not simply because of its potential to harm the target users through the application but because such attacks need more creative and intellectual hackers. But, to prevent such attacks, developers need to become even more creative.

* The easiest way of securing any React app from multiple XSS attacks is to employ WAF (Web Application Firewall) with the code. WAF leverages a concept called signature-based filtering to restrict cross-site scripting attacks. Developers can integrate WAF into their React code to prevent the app from running malicious scripts.

* Another effective way of blocking attackers from implementing XSS attacks on your React application is disabling the markups that carry code execution abilities. Some popular HTML elements that allow a web application to run scripts are <script>, <link>, <object>, and <embed>.

* Another defense mechanism that works with textContent to protect against XSS is to use the {} for default data binding. Implementing this in your React app will allow the framework to escape values automatically.

* Various programming languages offer libraries that can enable parsing HTML formatted text. Developers can use those libraries to sanitize HTML markup easily against XSS attacks. OWASP has also listed a range of such libraries such as Java HTML Sanitizer, HtmlSanitizer, etc.

* Conducting blacklist validation along with URL parsing can also prevent React applications from XSS attacks.

* Modern and updated browsers (like Google Chrome) come with XSS detection and will not allow attackers to run any malicious script that is not coming from the original server or source.

* React developers can also prevent XSS by adding one security check by leveraging [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). They have to use it in the code header and assign it 'True'. It uses the browser's same-origin policy and blocks reading a resource originating from a different origin. Using CORS, developers can stop a malicious site from reading another site's data.

* You can also use content security policies as the last line of defense against XSS. If all other XSS prevention fails, CSP allows developers to control various things, such as loading external scripts and executing inline scripts. To deploy CSP, developers need to include an HTTP response header called Content-Security-Policy with a value carrying the policy.
  An example for including CSP is as follows:
```
default-src 'self'; script-src 'self'; object-src 'none'; frame-src 'none'; base-uri 'none';
```

## Broken Authentication
Poorly implemented session management and authentication can lead to broken authentication in progressive web apps. This vulnerability helps the attacker take over one or more user accounts, letting the attacker possess the same privileges and access control as the target user. 

Attackers usually exploit such a React security vulnerability by detecting the authentication solution or bypassing them. The security team labels the authentication as broken when the cybercriminal can compromise users' passwords, session tokens, digital identities, or account information from the React app. Examples of some common reasons for this attack are:

* Unencrypted network sending session IDs, passwords, and other credentials
* Unprotected authentication credentials
* Session values without a specific time-out
* Predictable login credentials
* Exposed session IDs in URLs (For Example, http://anything.com/username/shoppingitems;jsessionid=2P0OC2JSNDLPSKHCJUN2JV?dest=Hawaii)
* Improper hashing and salting of passwords

Let us take a situation where the attacker could detect the hashes for the following names.

*Sue    4420d1918bbcf7686defdf9560bb5087d20076de5f77b7cb4c3b40bf46ec428b
Karlos    4420d1918bbcf7686defdf9560bb5087d20076de5f77b7cb4c3b40bf46ec428b
Rob    77b177de23f81d37b5b4495046b227befa4546db63cfe6fe541fc4c3cd216eb9*

The hash function will store the password in a hashed form rather than plain text. But then, humans can easily read the hash. Now, if two different users enter the same password, then these passwords will generate the same hash. Hackers can perform a dictionary attack, and if they crack one password, they can use the same password to gain access to other accounts that use the same hash.

### Checklist to Fix React PWAs from Broken authentication Vulnerability –
* The React applications should enforce password checks, whether the password is strong or weak. Also, adding criteria like eight characters (minimum) having uppercase, lowercase, numbers, and symbols can prevent users from such attacks.

* Employing multi-factor authentication (MFA) can prevent users from compromised credential reuse and credential stuffing.

* Another common React security best practice is to generate the message or notification email, keeping the email format or template the same. Such a practice prevents React app users from account enumeration attacks.

* Not exposing the session ID in the URL also comes under the best practice.

* For every React app, the session ID time-out is a must. Developers can secure progressive web apps by implementing a server-side session manager. It will produce a new session every time the user tries to log in.

* Proper hashing and salting of passwords are mandatory to prevent broken authentication attacks.

## XML External Entities (XXE)
Attackers can perform XML External Entities attacks on React web applications that parse XML input. Here the outdated XML parsers of your React app become vulnerable. Such vulnerability can lead an attacker to perform denial of service, port scanning, server-side request forgery, etc. Such attacks occur when an XML input gets referred to an external entity but has a weakly configured XML parser. Here are some examples where attackers are attempting XEE on React web applications that parse XML input.

* The attacker might attempt to extract data from the server.
```
<?xml version="1.0" encoding="ISO-8859-1"?> <!DOCTYPE foo [
<!ELEMENT foo ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]> <foo> &xxe; </foo>
```
* Another example where the attacker probes the server's private network by changing the above ENTITY line:
```
<!ENTITY xxe SYSTEM "https://192.168.1.1/private" >]>
```
* It is another example where the attacker is attempting for Denial of Service (DoS) attack by including a potentially endless file:
```
<!ENTITY xxe SYSTEM "file:///dev/random" >]>
```

### Checklist to Fix XXE Vulnerability in React apps –
* Developers need to keep all the XML libraries and processors fully updated or patched.
* It is a good practice to disable all XML external entities and DTD processing.
* React developers should adopt simpler data formats like JSON instead of XML. It will help avoid the serialization of sensitive data.
* Various Static Application Security Testing (SAST) tools help identify malicious XXE in the code.
* Developers should also perform filtering and server-side input validation to limit injecting unfriendly data input in XML documents or headers. Modern and updated browsers do not allow attackers to run malicious XML scripts as they come with built-in input validation.

## Zip Slip
It is another popular React app vulnerability where the malicious actor exploits the app by submitting zip files having malicious or arbitrary code within them. React developers enable adding zip files to decrease the file size while they get uploaded. When the app unzips the archive, its malicious file(s) can overwrite other files or perform arbitrary code execution. Attackers can either harm the files existing in the target system or gain remote access to the system.

Here is a Zip slip code example demonstrating a ZipEntry path merges to a destination directory without validating that path. Researchers and security professionals have found similar codes in different repositories across many apps.
```
Enumeration<ZipEntry> entry = zip.getEntries();
 while (entry.hasMoreElements()) {
ZipEntry ez = entry.nextElement();
File fil = new File(destinationDir, ez.getName());
InputStream input = zip.getInputStream(ez);
IOUtils.copy(input, write(fil));
 }
```
Here is a [link](https://github.com/snyk/zip-slip-vulnerability) to the repository containing libraries and APIs infected by zip slip.

### Checklist to Fix Zip Slip Vulnerability in React apps –
* React developers can search through the project for vulnerable codes. Developers can integrate validation code to the original application's code to check for directory traversal.
* Another way to prevent Zip Slip attacks in React apps is to include the Zip Slip Security Testing solution in the build pipeline of the app.
* Do not allow uploading files having special characters.
* Renaming all the zip files is another best practice to prevent zip slip attacks. Developers should generate new file names for each file before the application leverages them.
* Node.js uses npm libraries as the dependency. React internally uses node.js, and hence any vulnerable library can pose a threat to the React app. It is a good practice to create your own dependencies and libraries rather than using 3rd-party libraries.

## Cross-site Request Forgery (CSRF or XSRF)
CSRF is another React web application vulnerability allowing attackers to persuade users to perform unintentional actions without their direct consent. It does not steal the identity of the legitimate user but acts against their will. For rendering such attacks, the attacker sends an email or a web link convincing the victim to achieve a state-changing request in the application.

Before going through the checklist on fixing CSRF vulnerabilities, here is a quick example of how the CSRF GET request will be once the attacker tweaks it.
A standard GET request for a $250 transfer from person1 to person2 might look like this:

*GET http://anybank.in/transfer.do?acct=Person2&amount=$250 HTTP/1.1*

When the attacker induces the user to perform some unintended action or runs a malicious script, the $250 gets transferred to the attacker's account. This malicious request might look something like this:

*GET http://anybank.com/transfer.do?acct=Attacker&amount=$250 HTTP/1.1*

Some attackers can also put innocent-looking hyperlinks embedding the request.

*&lt;a href="http://anybank.com/transfer.do?acct=Attacker&amount=$250"> Check out the transfer! </a&gt;*

### Checklist to Fix React PWAs from CSRF Vulnerability 
* The progressive React web app should not deliver CSRF tokens using Cookies.
* An alternate defense mechanism against CSRF is to leverage a double submit cookie technique.
* Another robust way of preventing an application from a CSRF attack is to add a relevant CSRF token tied to user sessions and strictly validate every case before executing any appropriate action.
* It is always a good choice to shift from HTTP/1.1 to HTTP/2 or HTTP/3. HTTP/2 and 3 are fast, more secure than HTTP/1.1, and almost all modern browsers support them.

## Vulnerability in Packages and Dependencies
It might happen that you have pushed a React app's code to GitHub. Now an email/notification is popping up saying, "One of your dependencies has a security vulnerability." That is another method where attackers seek the help of malicious packages to gain access to your React applications. Such malicious packages collect valuable app details and user information and send it to a third party. 

These packages can also execute malicious code during the package installation phase. These attackers use the concept of typosquatting to make their attacks seamless. Typosquatting is a method of naming the packages based on their original counterparts. It outwits the developers into downloading these malicious packages that can wreak havoc on the React app.

### Checklist to Fix Malicious Package Vulnerability in React apps –
* One way to detect and remove this vulnerability is to recognize the vulnerable package and find an alternative React package. It is a good practice to analyze your app against malicious package vulnerability.
* Developers can also use SAST tools to detect exploitable code in a React application. SAST tools can scan and inspect all the application's source code, byte code, dependencies, packages, and binaries to uncover security vulnerabilities.
* Since Node uses npm libraries and dependencies and React uses Node, developers should make a checklist of vulnerable libraries like [unzipper](https://github.com/ZJONSSON/node-unzipper), [adm-zip](https://github.com/cthackers/adm-zip), and [other vulnerability release lists](https://snyk.io/vuln/npm:npm) for better precaution while developing React applications. 

	
## Wrapping Up –
Developers should know how crucial application security is for both the business and its users. As the React components and features are increasing, there is an equal delay in the number of days taken by the React community to fix any React security issues. So, developers and product managers should cautiously handle all security-related aspects of a React project.
