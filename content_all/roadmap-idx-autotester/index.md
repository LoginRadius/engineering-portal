---
type: async
title: "Roadmap of idx-auto-tester"
date: "2020-06-30"
coverImage: "roadmap_idx_auto_tester.png"
author: "Rakesh Pareek"
tags: ["Automation", "idx", "roadmap"]
---

# Roadmap of IDX-auto-tester

We're delightfully Announcing the upcoming releases of LoginRadius Identity-Experience-Framework Open-Source Automation

These full-version releases will include more test coverage and major changes with several improvements & code optimizations, the details have been given below.  
The below changes are planned to go live in multiple scheduled major releases starting with mid of June 2020.

## Release Roadmap:

### July 2020:

#### Test Cases:

- **Improving the ratio of Good Test Cases in Test repository:** We will be adding more test cases in Registration and Login flow to cover as much as possible Use Cases.

- **Increasing Negative Test Case Coverage:** We are also focusing on negative test cases that are the most important part of the Test Coverage in Testing Life Cycle.

- **Delivering Manual Test Cases**: We know that understanding of the test steps or mining the test cases by reading the code is not so easy for everyone, so we will also deliver the written Test Cases with the expected outcomes.

> _CI/CD pipelines for automation is to make everyday development tasks simple that can save time and reduce human intervention to check them every single code commit._

### August 2020:

#### Usability Improvements:

- Adding Command-line parameters for parallel run.
- Improving the naming conventions of functions for better readability.
- Better Error and Exception Handling for failed assertions.
- Adding detailed descriptive comments to functions, custom-commands, and test cases for better understanding.

#### Documentations:

- Improved Installation & usage guide
- More about different nightwatch configurations.
- More about working with `headless` mode

> _We are not just delivering automation we deliver values to our customers, some useful tips "to working with selenium and nightwatch" can be expected with this release_

### September 2020:

#### Code Level Improvements and Optimizations:

- Applying Page Object Model for application pages instead of static CSS-selector class.
- Applying async functioning in Test Cases and Custom-Commands to overcome the callback.
- Updating the Custom-Command as per the latest version of nightwatch.
- Browser Compatibility Testing.

#### Better Reporting:

- More detailed, readable and graphical-representation of html reports will be added.

> _Although current configuration does not support different browsers, still you can run on any browser by making few changes in nightwatch.json detailed guide is [here](https://nightwatchjs.org/guide/running-tests/)_

### October 2020:

#### Overcoming the Limitations:

- The build will be coming up with testing support of IEF feature `optional` and `disabled` email verification flows.
- Test Cases for `multifactor-authentication`

It is agreed that we are committed to delivering you a seamless experience in automation, but still, if you face any issue or need any enhancements, please report us [here ](https://github.com/LoginRadius/idx-auto-tester/issues)

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjY2MTYyNjE4LDE5MDkzNjIxNjIsLTIyNT
gwODM3OSwtNDI4ODY2Mjk2LDk1NTk3ODQ4NSwtMTU4Mjc5MDcy
OF19
-->
