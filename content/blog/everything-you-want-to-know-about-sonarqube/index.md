---
title: "Everything you want to know about SonarQube"
date: "2020-07-11"
coverImage: "sonarqube.png"
author: "Kheenvraj Lomror"
tags: ["Code Quality", "SonarQube"]
description: "SonarQube is a very universal tool for static code analysis that has become more or less the industry standard. Keeping code clean, simple and easy to read is also a lot easier with SonarQube."
---
### Why SonarQube
Developers working with hard deadlines to deliver the required functionality to the customer. It is so important for developers that many times they compromise with the code quality, potential bugs, code duplications, and bad distribution of complexity. Additionally they tend to leave unused variables, methods, etc. In this scenario, code would work in the desired way but do you think this is a proper way to deliver the functionality? No. 
To avoid these issues in code developers should always follow good coding practice but sometimes it is not possible to follow the rules and maintain the good quality as there may be many reasons. So developers need a tool that not only works once to check and tell them the issues in code but also track and monitor the code to check continuous code quality in order to achieve continuous code integration and deployment. Here comes SonarQube in the picture to fulfill all these requirements.

### What is SonarQube
SonarQube is an open-source platform developed by SonarSource for continuous inspection of code quality. Sonar does static code analysis which provides a detailed report of bugs, code smells, vulnerabilities, code duplications. It supports almost 27 major programming languages through built-in rulesets and can also be extended with various plugins.

### How setup and use sonarqube plugin
In this section, we will describe steps or procedures to configure and use the sonarqube plugin for all the major programming languages.

#### Prerequisites:
The only prerequisite for running SonarQube is to have Java (Oracle JRE 11 or OpenJDK 11) installed on your machine. [[details](https://docs.sonarqube.org/latest/requirements/requirements/)]

Set the PATH system variable: (https://www.java.com/en/download/help/path.xml)[https://www.java.com/en/download/help/path.xml]

> Note: In order to analyze JavaScript code, you need to have Node.js >= 8 installed on the machine running the scan. If a standard node is not available, you have to set property `sonar.nodejs.executable` to an absolute path to Node.js executable. [[details](https://docs.sonarqube.org/latest/analysis/languages/javascript/)]

#### Downloads Sonarqube and Sonar Scanner:
* LTS version of sonarqube (https://www.sonarqube.org/downloads)
* Download sonar-scanner based on your platform (https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
After the above process, Add the sonar scanner path to environment variables.

#### Run Sonarqube server:
* To start the sonar server open cmd or terminal and set sonarqube bin folder path and choose the platform and run the following command. Examples :
    ```
    #For Windows(cmd):
    C:\sonarqube\bin\windows-x86-64>StartSonar.bat
    #For other OS (terminal): 
    C:\sonarqube\bin\[OS]>sonar.sh
    ```
 Once sonar server up successfully then Log in to http://localhost:9000 with System Administrator credentials (login=admin, password=admin).

#### Creating and Analysing a Project:
* Go to create a new project and enter the project key and display name details. (+ sign on the top right side).
* Provide a token by either generating a token or using an existing token (find existing token on  http://localhost:9000/account/security page).
* Run analysis on the project by selecting the programming language used in the repository and your system OS. 
* As we already downloaded and set up the sonar-scanner path, No need to download it again.
* Now copy the displaying command and Go to your project path and Run copied command. It looks like below:
    ```
    sonar-scanner.bat -D"sonar.projectKey=rtetre" -D"sonar.sources=."-D"sonar.host.url=http://localhost:9000" -D"sonar.login=e932dxxxxx9a8e5c7903xxxxxx96928xxxxxxx"
    ```

After the analysis is done, either you can browse the provided link to see the sonar report directly [Ex.: http://localhost:9000/dashboard?id=] or you can go to the project section to see the newly generated sonar report of your project. 

If you want to exclude some files from analysis(like test files) then go to the administration section and navigate to the General setting, select the programming language used, and set a List of file path patterns to be excluded from the analysis.

Now re-run the analysis command given above for an updated sonar report.