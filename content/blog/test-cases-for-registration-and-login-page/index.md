---
title: "HOW TO WRITE TEST CASES FOR REGISTRATION AND LOGIN PAGE"
date: "2020-08-19"
author: "Gaurav Bewal"
coverImage: "writing-good-test-cases.png"
tags: ["Test Cases", "Quality", "Login and Registration"]
description: "Here is a set of Use Cases for Login and Registration Pages to test and to make sure the quality."
---


Writing test cases (which is an important task for a tester in application testing) requires experience and a keen eye for detail in order to build scenarios. This means that an application tester needs to focus on creating a set of variables or conditions which will help him to determine whether the software meets requirements and functions lawlessly. To reduce that hassle, we have compiled a list of use cases that you need to test a signup or login page.
We hope they will help you to create more error-free Register/Login pages.



## Before We Start


You should gather all the customer requirements you can. The list of requirements which can be useful are:
1. FirstName
2. Confirm Password
3. LastName
4. Address
5. UserName
6. PhoneNumber
7. Email ID
8. Gender
9. Password

Required fields are:
1. Email ID 
2. UserName
3. Password
4. Confirm Password 


Validation for fields:
1. Email
2. Password: It should have alphanumeric, Length should be 8 to 32.
3. PhoneNumber: Phone Number should have only Numbers, Country code is required

After successful Verification email should send to the user
On Required fields * should show.
Now, let’s begin with our test cases. Although most testers use Bugzilla or other test management tools to maintain test cases, you can also use Excel or spreadsheets.
 


## Test Cases for Registration Page

Signup and login page by assuming some client requirements, such as:
• Username and password are mandatory fields
• There is cancel and reset button at the bottom of the form
• Radio buttons and checkboxes are placed correctly
• The limit of the Password should be 8-13 characters (alphanumeric).

| Sr No. | Test Cases | Feature | Description | Steps To Execute | Test Data / Input  | Expected Results  |
|--------|------------|---------|-------------|------------------|---------------------|-------------------|
| 1 | TC-001| User Interface  | Check all the text boxes,  radio buttons, buttons, etc   | 1. Click on Radio buttons, buttons and dropdowns | N/a | UI should be perfect |
| 2 | TC-002| Required fields | Check the required fields by not filling any data  | 1. Do not enter any value in the field. <br/> 2. Click on the Register button.    | N/a   | It should show a mandatory symbol  (*) on mandatory fields.  |
| 3 | TC-003| Required fields | Check user should  Register by filling all the required fields | 1. Enter valid values in the required fields. <br/> 2. Click the Register button.    | N/a   | 1. Users should be registered successfully.  <br/> 2. A successful registration message should show. <br/> 3. Mail should send to the user    |
| 4 | TC-004| Optional Fields | Check all the optional fields when do not fill data | 1. Do not enter any detail in optional fields <br/> 2. Enter valid data in required fields <br/> 3. Click on the Signup button | N/a   | 1. It should not ask to fill the optional fields  <br/> 2. User should be registered successfully <br/> 3. A successful registration message should show <br/> 4. Mail should send to the user |
| 5 | TC-005| Optional Fields | Check all the optional fields when filling data| 1. Enter valid data in  optional fields <br/> 2. Enter valid data in  required fields <br/> 3. Click on the Register button  | N/a   | 1. User should be registered successfully <br/> 2. A successful registration message  should show <br/> 3. Mail should send to the user   |
| 6 | TC-006| Email validation    | • Check the Email text field that has an Email address without @ symbol. • Check the Email text field that has a random string instead of a real email. • Check the Email text field that has @ symbol written in words. • Check the Email text field that has a missing dot in the email address. | 1. Enter Invalid Emails <br/> 2. Click on the Register Button.   | 1.testAtgmail.com <br/> 2.test@gmailcom <br/> 3.test@gmail <br/> 4.@gmail | It should show the validation  message for valid email |
| 7 | TC-007| Email validation    | Check all the valid emails    | 1. Enter valid Emails <br/> 2. Click on the Register Button.| 1.test.22@gmail.com <br/> 2.test@gmail.com  | It should not show any validation message |
| 8 | TC-008| Phone  Number validation | Check the phone number when passing alphanumeric data    | 1. Enter alphanumeric  data in phone field <br/> 2. Click on Register button| 1. dada5$7567#7    | It should show the validation message  8 for Phone Number |
| 9 | TC-009| Phone  Number validation | Check the phone number when not pass country code| 1. Enter valid phone number without country code <br/> 2.Click on Register button| 1. 9012078654 | It should show the validation message for country code is required |
|10 | TC-010| Phone  Number validation | Check the phone number when passing country code | 1. Enter valid phone number with country code <br/> 2.Click on Register button| 1. +9190112244| It should not show any validation  message|
|11 | TC-011| Password  Validation | Check the password limit when enter value less than min    | 1. Enter value which is alphanumeric but less than 8. <br/> 2.Click on Register button| 1. Password| It should show validation message    |
|12 | TC-012| Password  Validation | Check the password limit when enter value greater than max | 1. Enter alphanumeric value but more than 32. <br/> 2.Click on Register button    | Any Random string with numbers| It should show validation message    |
|13 | TC-013| Password  Validation | Check the password when passing only numbers | 1. Enter a value in numbers which is in between 8-32 <br/> 2.Click on Register button   | 1. 12345678| It should show validation message    |
|14 | TC-014| Password  Validation | Check the password when passing valid data   | 1. Enter value in alphanumeric which is in between 8-32  <br/> 2.Click on Register button   | 1. Pass123456 | It should not show any validation message |
|15 | TC-015| Required  Fields| Verify if blank spaces are  passed in required fields.  | 1. Go to the Site. <br/> 2. Passed blamk spaces in  required fields. <br/> 3. Click on the Register button  | N/a   | Those Blank spaces should trim and  Validation error message for required  fields should visible.|
|16 | TC-016| Required  Fields| Verify user can verify its Email ID| 1. Go to the Email. <br/> 2. Click on the verification link.| test22@gmail.com   | User should get a verification link and able to verify his/her Email ID.   |
|17 | TC-017| Phone  Number  Validation | Verify if the length of the phone number is incorrect i.e. less than 10.    | 1. Enter phone number less than 10 digits. <br/> 2.Enter all required fields. <br/> 3.Click on Register Button | 91901122   | It should show the validation error message for phone number length.  |
|18 | TC-018| Phone  Number  Validation | Verify if the length of the phone number is incorrect i.e. more than 10| 1. Enter phone number less than 10 digits. <br/> 2.Enter all required fields. <br/> 3.Click on Register Button | 91901122445566| It should show the validation error message for phone number length.  |
|19 | TC-019| Password  Validation | Verify if the password required rules are not satisfied in the password | 1. Enter the password which not satisfies the required rule. <br/> 2.Click on Register button| passw | It should display error with required rules for password value (like it should contain a special character, a small case,  a number)  |



## Test Cases for Login Page

| Sr No. | Test Cases | Feature|Description  | Steps To Execute| Expected Results |
|--------|------------|-----------|-------------|--------------------|------------------|
|1 | TC-01| User  Interface | Check all the text boxes and buttons| Check Page  | • UI should be perfect  • Text boxes and button should be aligned|
|2 | TC-02| Required Fields  | Check the required fields by not filling any data. | 1. Enter invalid username <br/> 2. Enter correct password <br/> 3. Click on Login Button | User should not log in and should show proper error message |
|3 | TC-03| User Login| Check When passing a correct username and invalid password| 1. Enter valid username <br/> 2. Enter incorrect password <br/> 3. Click on Login Button| User should not log in and should show proper error message |
|4 | TC-04| User Interface  | Check Keeping Password | 1. Enter valid username <br/> 2. Do not enter password <br/> 3. Click on Login Button  | User should not log in and should show proper error message |
|5 | TC-05| User Login| Check when pass correct email and password  | 1. Enter valid username <br/> 2. Enter valid password <br/>  3. Click on Login Button| User should log in |
|6 | TC-06| User Login | Check if the password is entered in encrypted | 1. Enter valid username <br/> 2. Enter password <br/> 3. Click on Login Button| Password is entered in encrypted form|
|7 | TC-07| Signup  Option for new users | Check whether the signup link for the new user is working| Click Signup link| Clicking signup link takes the user to signup page successfully |
|8 | TC-08| Forgot Password | Verify user should get an error message when he/she enters not registered email id.  | 1. Click on the Forgot password link. <br/>  2. Enter unregistered email id and click on the send button.| User should get an error message.|
|9 | TC-09| Reset Password  | Verify user should get an error message when he/she enters the previous password.| 1. Go to the reset password link. <br/> 2. Enter the previous password. <br/> 3. Click on the Reset Password button.| User should get an error message.|
|  10 | TC-10| Reset Password  | Verify user able to reset his/her password| 1. Go to the reset password link. <br/> 2. Enter a new password and a confirm password. <br/> 3. Click on the Reset Password button.| Users should get the success message and the password should get reset. |
|  11 | TC-11| Reset Password| Verify user should get an error message when password and confirm password not matches| 1. Go to the reset password link. <br/> 2. Enter a different new password and a confirm password. <br/> 3. Click on the Reset Password button.  | Users should get an error message. |
|  12 | TC-12| Reset Password  | Verify user should able to login with a new password.  | 1. Go to the reset password link. <br/> 2. Enter a new password and a confirm password. <br/>  3. Click on the Reset Password button. <br/> 4. Log in by using the new password. | User should able to login  |
|  13 | TC-13| Reset Password  | Verify if the user enters a new password that does not cover the basic requirements of password then the user should be displayed error message | 1. Go to the reset password link. <br/> 2. Enter a new password that does not cover the basic requirements. <br/> 3. Click on the Reset Password.| Users should get an error message.  |
|  14 | TC-14| Required  Fields| Verify if blank spaces are passed in required fields. | 1. Go to the Site. <br/> 2. Passed blank spaces in required fields. <br/> 3. Click on the Login button | Those Blank spaces should trim and Validation error message for required fields should visible. |
|  15 | TC-15| Welcome  Email  | Verify new users should get the welcome email once after the login. | 1. Go to the Email. <br/> 2. Enter Login Email.| Users should get a welcome email on his/her email id.  |
|  16 | TC-16| User  Login  | Verify when passing incorrect  Email and correct password | 1. Enter incorrect Email. <br/> 2. Enter the correct password. <br/> 3. Click on the Login Button.  | User should not be able to log in and the error message should be displayed.  |
|  17 | TC-17| User  Login  | Verify when passing both incorrect  Email and password | 1. Enter incorrect Email. <br/> 2. Enter the correct password. <br/> 3. Click on the Login Button| User should not be able to log in and the error message should be displayed.  |
|  18 | TC-18| User Forgot  Password.  | Verify Forgot Password sends a forgot password link.  | 1. Click on the Forgot Password link. <br/> 2. Enter Email and click on the send button. <br/> 3. Now go to mail7.io and enter the email id. | User should get the forgot password link on his/her email id. |


## Conclusion

You need to think like an end-user for writing the best test cases and getting different scenarios of what will happen in real circumstances. If you install this creativity and perceive the product with the eyes of an end-user, you will certainly be closer to creating an error-free application.

BE A PERFECTIONIST. HAPPY TESTING!
