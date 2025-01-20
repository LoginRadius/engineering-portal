---
title: "Sonarqube: What it is and why to use it?"
date: "2020-07-11"
coverImage: "sonarqube.png"
author: "Kheenvraj Lomror"
tags: ["Code Quality", "SonarQube"]
description: "SonarQube is a universal tool for static code analysis that has become more or less the industry standard. Keeping code clean, simple, and easy to read is also a lot easier with SonarQube."
---

Have you ever heard of SonarQube? Would you like to know What it is? And how to use it? And its benefits to the production phase of software development. Then you are at the right place; in this tutorial of SonarQube, I will give you a walkthrough of every aspect of SonarQube.

Let's dive in!!!

## What is SonarQube?

SonarQube is an open-source platform developed by SonarSource for continuous inspection of code quality. Sonar does static code analysis, which provides a detailed report of bugs, code smells, vulnerabilities, code duplications. 

It supports 25+ major programming languages through built-in rulesets and can also be extended with various plugins.

## Benefits of SonarQube
1. **Sustainability** - Reduces complexity, possible vulnerabilities, and code duplications, optimising the life of applications.
2. **Increase productivity** - Reduces the scale, cost of maintenance, and risk of the application; as such, it removes the need to spend more time changing the code
3. **Quality code** - Code quality control is an inseparable part of the process of software development.
4. **Detect Errors** - Detects errors in the code and alerts developers to fix them automatically before submitting them for output.
5. **Increase consistency** - Determines where the code criteria are breached and enhances the quality
6. **Business scaling** - No restriction on the number of projects to be evaluated
7. **Enhance developer skills** - Regular feedback on quality problems helps developers to improve their coding skills

## Why SonarQube?

Developers [working with hard deadlines](/agile-development-team/) to deliver the required functionality to the customer. It is so important for developers that many times they compromise with the code quality, potential bugs, code duplications, and bad distribution of complexity.

Additionally, they tend to leave unused variables, methods, etc. In this scenario, the code would work in the desired way.

Do you think this is a proper way to deliver functionality? 

The answer is NO.

To avoid these issues in code, developers should always follow the good coding practice, but sometimes it is not possible to follow the rules and maintain the good quality as there may be many reasons.

In order to achieve continuous code integration and deployment, developers need a tool that not only works once to check and tell them the problems in the code but also to track and control the code to check continuous code quality. To satisfy all these requirements, here comes SonarQube in the picture.


## How to setup and use the sonarqube plugin

This section will explain the steps or procedures to configure the sonarqube plugin for all the major programming languages.

### Prerequisites:

The only prerequisite for running SonarQube is to have Java (Oracle JRE 11 or OpenJDK 11) installed on your machine. [[details](https://docs.sonarsource.com/sonarqube-server/latest/setup-and-upgrade/installation-requirements/server-host/)]

Set the PATH system variable: (https://www.java.com/en/download/help/path.xml)[https://www.java.com/en/download/help/path.xml]

> Note: In order to analyze JavaScript code, you need to have Node.js >= 8 installed on the machine running the scan. If a standard node is not available, you have to set the property `sonar.nodejs.executable` to an absolute path to Node.js executable. [[details](https://docs.sonarqube.org/latest/analysis/languages/javascript/)]

### Downloads Sonarqube and Sonar Scanner:

* LTS version of sonarqube (https://www.sonarqube.org/downloads)
* Download sonar-scanner based on your platform (https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
After the above process, Add the sonar scanner path to environment variables.

### Run Sonarqube server:

* To start the sonar server open cmd or terminal and set sonarqube bin folder path and choose the platform and run the following command. Examples :
    ```
    #For Windows(cmd):
    C:\sonarqube\bin\windows-x86-64>StartSonar.bat
    #For other OS (terminal): 
    C:\sonarqube\bin\[OS]>sonar.sh
    ```
 Once the sonar server up successfully, then Log in to `http://localhost:9000` with System Administrator credentials (login=admin, password=admin).

### Creating and Analysing a Project:

* Go to create a new project and enter the project key, and display name details. (+ sign on the top right side).
* Provide a token by either generating a token or using an existing token (find existing token on  `http://localhost:9000/account/security` page).
* Run analysis on the project by selecting the programming language used in the repository and your system OS. 
* As we already downloaded and set up the sonar-scanner path, No need to download it again.
* Now copy the displaying command and Go to your project path and Run the copied command. It looks like below:
    ```
    sonar-scanner.bat -D"sonar.projectKey=rtetre" -D"sonar.sources=."-D"sonar.host.url=http://localhost:9000" -D"sonar.login=e932dxxxxx9a8e5c7903xxxxxx96928xxxxxxx"
    ```

After the analysis is done, you can either browse the provided link to see the sonar report directly [Ex.: `http://localhost:9000/dashboard?id=`] or go to the project section to see the newly generated sonar report of your project. 

If you want to exclude some files from analysis(like test files), then go to the administration section and navigate to the General setting, select the programming language used, and set a list of file path patterns to be excluded from the analysis.

Now re-run the analysis command given above for an updated sonar report.

## Conclusion

The goal of SonarQube is to empower developers first and to grow an open community around the quality and security of code. I hope with this quick tutorial of sonarqube you have the basic idea of the functionalities, and If you believe so, drop a comment and show your support.