---
title: How To Send Transactional Emails Using Lambda And Amazon SES?
date: "2021-10-05"
coverImage: "coverImage.jpg"
author: "Mohit Saxena"
tags: ["Amazon SES", "IAM","Lambda"]
description: "This blog will cover concepts such as Amazon SES, Amazon IAM, and AWS Lambda and it will also cover how you can send transactional emails using Lambda and Amazon SES."
---

##What is Amazon SES?

Amazon Simple Email Service (SES) is an email service provided by Amazon which is 
cost-effective, flexible, and scalable that enables developers to send mails such as 
transactional emails, marketing emails, or even mass email communications from within an
application.

Amazon SES provides features such as flexible IP deployment and email 
authentication which promote higher deliverability, protect sender reputation, and sends 
analytics measure to figure out the impact of each email. 

###Benefits of Amazon SES

####Easy Integration

Amazon SES can be integrated in three ways: using console, APIs, or SMTP, which all three
can be configured within minutes. you can configure email sending in 
minutes.

####Optimizable Deliverables

Amazon SES provides a reputation dashboard, which includes performance insights and 
anti-spam feedback. You also have flexible deployment options such as: shared, dedicated, 
and customer-owned IPs. Amazon SES also has tie-ups with industry experts like M3AAWG 
which helps it implement industry best practices.

####Low Failure Rate

Amazon SES Dashboard shows you email statistics, deliveries, bounces, email open or 
click-through, and feedback loop results which helps you measure the effectiveness of 
each email's outreach. 

####Secure

Amazon SES provides some rich features which helps bullet-proof your connections such as 
Sender Policy Framework (SPF) and DomainKeys Identified Mail (DKIM) which confirms your 
right to send on behalf of your domain, Virtual Private Cloud (VPC), HIPAA eligibility, 
in-region compliance (C5, IRAP) and global certifications (Fed-Ramp, ISO, GDPR).

##What is Amazon's Identity And Access Management (IAM)?

AWS Identity and Access Management (IAM) enables access management for AWS services 
securely. You can create and manage AWS users and groups, and set permissions to allow and 
deny access to AWS resources.

Moreover, IAM feature is completely free!

###Use Cases Of IAM

1. Granular control to AWS resources

IAM enables you to add some specific conditions such as how a user can use AWS, their 
originating IP address, whether they are using SSL or not, or whether they have authenticated 
using an MFA device or not.

2. Multi-factor authentication (MFA)

AWS MFA is a security feature that augments the actual username and password. MFA 
requires users to prove physical possession of an actual MFA-enabled mobile device by 
providing a valid MFA code. The codes are dynamic and keeps expiring and regenerating at
regular intervals. MFA feature of IAM is also provided at no extra cost.

3. Access Control

Access control helps Your security teams and admins to quickly validate the policies. 
This not only helps your refine your policies but also helps you to better adhere to the 
principle of least privilege.

4. Integration With Your Corporate's Existing Active Directory System

IAM can be used to grant your employees federated access to the AWS Management Console 
and AWS service APIs. Moreover, it can even be integrated with your existing identity systems 
such as Microsoft Active Directory. Not only MS Active Directory but any identity management 
solution that supports SAML 2.0 can be used.

##What is AWS Lambda?

AWS Lambda is one of the compute services provided by AWS that lets you run code. However, what 
makes it special is the serverless configuration. You can run your Lambda code without any 
provisioning, and it lets you do the following:

- Managing servers
- Creating workload-aware cluster scaling logic
- Maintaining event integrations or managing runtimes. 

To use Lambda, all you need to do is upload your code as a ZIP file or container image, and 
Lambda will automatically allocate the required compute execution power and will run your 
code with the added advantage of orchestration. 

The best part is, you can write your Lambda function in any language of your choice!

##How To Send Transactional Emails Using Amazon SES And IAM?

In a nutshell, you need to follow the following 3 steps:

1. Create an AWS IAM policy and execution role for Lambda.
2. Verify your Amazon SES identity.
3. Create a Lambda function that includes logic for sending email through Amazon SES.

Now, let's discuss the above steps in detail:

###Creating an IAM policy and execution role for Lambda

1. Create an IAM policy using the JSON policy editor and paste the following code:

```
{
"Version": "2012-10-17",
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "ses:SendEmail",
            "ses:SendRawEmail"
        ],
        "Resource": "*"
        }
    ]
}
```

2. Attach the IAM policy to an IAM role.

###Verifying your Amazon SES identity

####Verifying domain

Follow these steps to verify your domain:

1. Go to the verified domain list in the Amazon SES console.

2. Choose **Verify a New Domain**.

3. In the **Verify a New Domain** dialog box, enter your domain.

4. Choose **Verify This Domain**.

5. In the **Verify a New Domain** dialog box, add a TXT record with the displayed Name 
and Value to your domain's DNS server. 

####Verifying Email

Follow these steps to verify your email:

1. Open the Amazon SES console.

2. In the region selector, choose your desired AWS Region.

3. Under **Identity Management**, choose **Email Addresses**.

4. Choose **Verify a New Email Address**.

5. In the **Verify a New Email Address** dialog box, type your email address and verify.

6. Check the inbox and verify.

###Creating a Lambda function

1. Create a Lambda function. You can do this by using the Lambda console or by building and 
uploading a deployment package.

2. In the Lambda console, Choose Functions.

3. Choose the name of your function.

4. On the Configuration tab, in the Permissions pane, look at the function's Execution 
Role. Verify that the IAM role with Amazon SES permissions that you created earlier is 
listed. If the correct IAM role isn't listed, assign the correct role to the function.

5. Under Function code, in the editor pane, paste the following code:

```
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-west-2" });
exports.handler = async function (event) {
var params = {
Destination: {
ToAddresses: ["RecipientEmailAddress", ...],
},
Message: {
Body: {
Text: { Data: "Test" },
},

      Subject: { Data: "Test Email" },
    },
    Source: "SourceEmailAddress",
};

return ses.sendEmail(params).promise()
};
```

6. Deploy.

##Conclusion

If you were able to follow along till now then you have your transactional emails setup ready! 
We hope this article helped you understand the concepts of Amazon SES, Amazon IAM, and Lambda.