---
type: async
title: "IAM, CIAM, and IDaaS - know the difference and terms used for them"
date: "2020-07-24"
coverImage: "triplets.jpg"
author: "Archna Yadav"
tags: ["IAM", "CIAM", "IDaaS", "Identity"]
description: "Over time, organizations are using many terminologies for IAM, CIAM, and IDaaS platforms. This article clarifies the use of these terms, key features, and common use cases of IAM, CIAM, and IDaaS platforms."
---

Digital Identity and IAM Domain have been the talk of the technology town for decades. There has been plenty of research, innovation, and information around these two, which led to many terminologies for the platforms providing the relevant features. Some of these terminologies are specific to the characteristics of the platform, while others are used interchangeably.

In this article, let’s discuss the following commonly used terminologies for the platforms providing the relevant features:

- Identity and Access Management (IAM)
- Consumer Identity and Access Management (CIAM)
- Customer Identity and Access Management (CIAM)
- Identity Platform
- Identity Management (IdM)
- Identity as a Service (IDaaS)
- SaaS-delivered IAM

These terminologies revolve around the IAM, CIAM, and IDaaS platforms. The infographic below categorizes these terminologies within these platforms:

![IAM CIAM and IDAAS Comparison](iam_ciam_idaas.png)

## Know the definition

**IAM** defines and manages the roles and access privileges of network users and the cases in which users are granted or denied them. The primary purpose of IAM systems is one digital identity per individual. The established digital identity is then maintained, modified, and monitored throughout users' access lifecycles.

**CIAM** is a subset of the broader concept of identity access management (IAM). It explicitly focuses on managing customers' identities who need access to websites, web portals, and mobile apps.

**IDaaS** is an authentication infrastructure that is built, hosted, and managed by a third-party service provider. IDaaS companies supply cloud-based authentication or identity management to enterprises who subscribe. It allows enterprises to use single sign-on, authentication, and access controls to provide secure access to their growing number of software and SaaS applications.

## IAM Features and Use Case

IAM is used for employee/internal-facing identity and access management solutions. The following explains a typical example of the IAM implementation within an organization:

John, a new employee, joins the organization, and the application allows provisioning of his organizational identity. John can then login to his organization's portal, and based on the access configuration, he is either authorized or denied access to information or a resource.

Besides, the organization has multiple portals, and John is allowed to access these portals using the same credentials. Throughout the job tenure, John's profile is maintained or updated from time to time. Eventually, when John decides to move on, deleting John's account from one portal revokes his access to all other portals.

**IAM** has the following four components:

- **Authentication**: A user provides credentials to gain initial access to an application or a particular resource. Upon user authentication, a session is created and referred during the interaction between user and application until the user logs off or session terminates.

- **Authorization**: It is performed by checking the resource access request against authorization policies that are stored in an IAM policy store. It is the core area that implements the access controls based on data, including user attributes, user roles, business rules, etc.

- **User Management**: It comprises Role Management, User Profile Management, User Activity Monitoring, User Provisioning, and deprovisioning.

- **Central User Repository**: It stores and delivers identity information to other services. It usually comes with a data synchronization service to keep the data in synchronization with other identity sources.

> Organizations earlier used on-premises IAM software for identity and access management. Now the identity management process is getting more complicated as organizations add more cloud services to their environments. Thus, as a logical step, the organizations adopt cloud-based Identity-as-a-Service (IDaaS) and cloud IAM solutions.

## CIAM Features and Use Case

CIAM is used for customer-facing solutions. The capabilities of IAM are followed in the CIAM solutions; however, the use cases and requirements vary. Common features of CIAM include:

- Self-registration for customers, usually via social network registration
- Consent mechanisms for users to control the use of their data
- Single Sign-On (SSO) across all digital properties
- Multiple authentications options for customers, depending on risks and policies
- Customer profile storage
- SaaS application integration
- Fine-grained access control to resources and data

The following explains a typical example of the CIAM implementation in a customer-facing application:

Sarah, a new customer registers on the application. If applicable, the application should request for Sarah’s consent on business privacy policies and get her social profile data. The application must ensure the security and privacy of the captured data during registration, social login, or activities performed during her life cycle. Besides, Sarah should be allowed to manage access to her profile data and delete her account from the application. On the other hand, the business should be allowed to get insights on their customer to understand and deliver their needs.

The core components of IAM remain the same across areas like authentication, authorization, user management, and central user repository. Thus, the need for Single Sign-On, Authentication Protocols, Access Management, Centralized and Universal Directories, User Lifecycle Management and Authorization, etc remains the same.

> It is a common misconception that the technology required for CIAM is the same for IAM. CIAM is far more challenging irrespective of the similarities with the IAM, and it is recommended to have a CIAM solution in place for your customers.

## IDaaS Features and Use Case

The enterprises typically use IDaaS to extend their existing IAM infrastructure. Thus, enterprise IDaaS providers must deploy solutions that can:

- Connect with existing user directories (like AD) for authentication.
- Provide role management to grant permissions and resource access to users.
- Enhance security by providing ways of defining security for critical applications.

The following are the critical features of IDaaS:

- **Cloud-Based and Multitenant Architecture**: To support the immediate issuing of updates, security fixes, and performance improvements to every enterprise customer.

- **Provisioning**: To sync user data with web and enterprise applications through SCIM (system for cross-domain identity management) support and integration with on-premises provisioning.

- **Authentication**: To incorporate necessary means of authentication such as multi-factor authentication via passwords, digital access cards, or biometrics.

- **Single Sign-On (SSO) and Federation**: SSO capability to allow users to authenticate themselves across multiple applications using the same credentials.

  Similarly, the federation capability allows the organizations to manage secure authentication for third-party cloud services accessed beyond the control of internal IT departments.

- **Directory Service**: To integrate IDaaS with enterprise existing user stores or a cloud directory.

- **Intelligence**: To facilitate identity access log monitoring and reporting.

> The enterprises use several applications, mostly cloud-based services, while some of the applications hosted on-premise. Managing the credentials and access to each of those applications has become hectic.

> Since IDaaS provides a single point of user and access management for all the applications, granting or revoking access to users becomes very easy. Besides, it enables SSO to avoid managing separate login credentials for different service providers.

If you are looking for information on more terminology around the platforms mentioned in this article, add your request in the comments below. I will either address them here or write another article dedicated to your requests and questions!
