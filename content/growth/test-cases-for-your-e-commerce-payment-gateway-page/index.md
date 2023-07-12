---
title: "Test Cases For Your E-commerce Payment Gateway Page"
date: "2017-07-21"
coverImage: "Test-Cases-for-your-Ecommerce-Payment-Gateway-Page.png"
tags: ["payment gateway", "technology", "ecommerce"]
author: "Sudhanshu Agarwal"
description: "Trying to make test cases to build a flawless payment gateway page for your ecommerce website? Here are some factors you need to take seriously before creating test cases for payment gateway page."
metatitle: "Test Cases For Your E-commerce Payment Gateway Page"
metadescription: "Trying to make test cases to build a flawless payment gateway page for your ecommerce website? Here are some factors you need to take seriously before creating test cases for payment gateway page."
---

Preparing accurate test cases for payment gateway is a general task for a tester working in a service industry. In this post, I have discussed some important scenarios that are inevitable while performing payment gateway testing. Also, I have discussed about the important points one should keep in mind while writing test cases for payment gateway.

**_Note_**_:- Also, if you want to know how to write the best test cases for a perfect UI for your website, go through this_ [_article_](https://www.loginradius.com/blog/fuel/2017/07/test-cases-for-your-e-commerce-payment-gateway-page/)_._

### **What Is A Payment Gateway?**

A payment gateway is a processing unit that approves online payments (debit cards, credit cards, e-wallets, netbanking) for online purchases. The gateways protect highly sensitive details like account holder details, card details, and so on. The data is transferred securely between the two groups: merchant site and customer.

### **Different Kinds Of Payment Gateways**

There are two types of payment gateways. They are as follows:-

- **Shared Gateway:-** In this type of gateway, the payment is processed while keeping customer on the merchant site page. As soon as the detail is filled by the customer, a transaction is processed. Shared gateway is the most preferable gateway as it provides the convenience of staying in the merchant site. Some of the examples are _Authorize.net CIM and Stripe._

- **Hosted Gateway:-** Hosted Gateway is the payment process where the customer is directed to the payment gateway website. Afterwards, when the transaction is completed, he or she is redirected to the merchant site.Example:- _Setcom, Paypal Standard, Payza_

As you have known the basics about payment gateway, let me tell you what aspects you should keep in mind while creating test cases for check out page:-

- **Functionality:-** You have to make sure that your payment gateway functions the way it is supposed to do. Check your page rigorously to find the flaws in the functionality.

- **Integration:-** You have to check the integration of card and other banking services with the payment gateway. Though, integration is a part of functionality, it requires an exclusive check. The payment gateway should perform the task with high precision whether it bills or pays back.

- **Security:-**   It is one of the most important aspects while testing a payment gateway. Other than buffer overruns, one needs to take care of other troubling security threats. Some of the resources you can take help from while testing security on payment gateway are [OWASP Top 10](https://www.owasp.org/index.php/Top_10_2013-Top_10), [Web Blog by Michael Howard](https://blogs.msdn.microsoft.com/michael_howard/) and [Google Online Security Blog](https://security.googleblog.com/).

- **Performance:-** Performance is another KPI for your payment gateway. Hence, you should make sure about things like number of users your payment gateway page can handle, number of users who are simultaneously using your page. Some of the resources you can refer are [Smartbear’s Performance Testing Resource](https://smartbear.com/learn/performance-testing/) and [guru99](https://www.guru99.com/performance-testing.html) articles.

### **Checklists While Preparing Test Cases For Payment Gateway**

- You should perform tests and collect data from dummy cards from different card issuers like Master card, Visa and Maestro and payment gateways like PayPal and Google Wallet.
- Research about all the error codes related to payment gateways and keep them handy for reference.
- Keep a good understanding about payment gateways workflow.
- Also understand payment gateway’s settings like currency format.

### **Areas Where Payment Gateway Are Used**

1. Ecommerce
2. Travelling websites
3. Others sites like government sites accepting taxes, sites containing paid application forms etc.

Here, let’s discuss the example of an E-commerce website’s payment gateway page.

### **Test cases for An Ecommerce Site’s Payment Gateway**

**Test Cases**

**Process**

**Steps To Execute**

**Expected Results**

TC-001

Adding to Cart

1\. Select Items 2. Click on Add to cart

1\. Selected Items should be displayed on checkout page 2. Total amount should be calculated

TC-002

Adding to Cart

1\. Select Items 2. Select quantity 3. Click on Add to cart

1\. Selected items should be displayed with its quantity 2. Total amount should be calculated accordingly

TC-003

Adding Coupon code

1\. Select item 2. Apply coupon code 3. Click on Add to cart

Applying a valid coupon code will deduct the amount accordingly

TC-004

Adding Invalid Coupon code

1\. Select item 2. Apply coupon code 3. Click on Add to cart

Applying an invalid coupon code will give an error message- "Invalid Coupon" and will not deduct the amount

TC-005

Keeping the site idle for sometime after adding products to cart

1\. Select Items 2. Click on Add to Cart 3. leave the site for sometime

After coming back, items should be still visible in the cart

TC-006

Check that Checkout Address Page consist of all the details of product such as Name, Quantity, Amount, etc.

1\. Select Items 2. Click on Add to Cart

All the information should show on cart page

TC-007

Check the Name, Street Address, City, State, Country, Postal code are mandatory field in the Checkout Address page.

1\. Select Items 2. Click on Add to cart 3. Check the Address field

All the fields should required

TC-008

Remove items from the cart

1\. Select 2-3 Items 2. Click on Add to Cart 3. On cart page remove one item

After removing one item payment should update

TC-009

Check Cancel Button

1\. Select 2-3 Items 2. Click on Add to Cart 3. Click on cancel button

1\. It should not redirect to payment 2. Item should not remove from cart

TC-010

Check the Name on Card, Card Number,Expiration date, CVV are mandatory fields in the

1\. Select the card type 2. Do not fill any information 3. Click on Submit button

It should show the validation message for all the required fields

TC-011

Check the error message when enter invalid input for mandatory fields

1\. Select the card type 2. Enter invalid card number \[Check for CVV, Expiration date\] 3. Click on submit button

It should show error message for invalid details

TC-012

Check the redirection after successful payment

1\. Select the card type 2. Enter valid details 3. Click on submit button

1\. Payment should done successfully. 2. It should redirect to site home page with proper details. 3. It should show order no on thank you page.
