
**

## Login Screen - Tips and Ideas for Testing

**

A **login screen** is a web **page** or an entry **page** to a web/mobile application that requires user identification and authentication, regularly performed by entering a username and password combination. 
Login process is the most important feature for any system/application as it provide access to an entire **web-site / application** or part of it. So, testing of login screen need complete coverage. 

![Login Screen](Login-Page.png)

Mentioned below are few tips that can be referred for testing the login screen of any system/application.

**UI/UX:**

 - Tab Order - Is there a logical order to using the tab key
 - Username field focus - when arriving at the page is the cursor focused on the username field? 
 - Use of enter key - does selecting enter activate the Login button?
 - Accessibility - are the form fields correctly identified and labelled?
 - The look - does it look ok? Everything aligned ok
 - Content - is the content up to scratch? Any typos?
 - Links - are there any other existing links on the page? Are they valid?
 - Responsiveness - How responsive is the login screen?

**Security Checks:**

 - Password - is it shown or hidden (using asterisks)?
 - Password - can it be copied and pasted?
 - Password - is there a minimum complexity on the password?
 - Common Password Lookup - Is the login form performing a lookup in the list of the most common passwords ([CommonPasswordsList](https://en.wikipedia.org/wiki/List_of_the_most_common_passwords))
 - View Source - is valuable information given away in the HTML source code?
 - SQL Injection - is it vulnerable to SQL input?
 - Pages - can pages behind the wall be accessed without logging in?  
 - URL Manipulation - can the URLs be edited to gain access where it should not be allowed?
 - Multiple accounts - can different accounts be logged    in at the same time in the same browser?
 - Cookies - can they be edited? disabled?

**Functionality:**

 - Login - is it possible to login successfully? Unsuccessfully?
 - Logout - if user logs out, do they log out as expected?
 - Forgot password - does it exist? does the process work? Is it prone to security failure? URL manipulation?
 - Back and Forward buttons - how does the application cope when using the browser Back and Forward buttons?
 - Remember me - is there a “Remember me” option? Does it as standard? What if password is changed?
 - Compatibility - is there a need to test in other browsers?
 - Data - is there a minimum or maximum length of   characters? What are the boundaries? What are the allowed characters?
 - Error handling - how are errors handled and displayed?
 - Javascript-off test - is the login form still working when JavaScript is disabled?
 - 2FA Check - When two-factor authentication is being provide; then test with valid/invalid token, test with valid/invalid backup code, test lockout procedure, and test recovery process.

**Thanks for reading and happy testing!**

