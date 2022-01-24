---
title: "Maven Dependency in Eclipse"
date: "2017-07-11"
coverImage: "maven.png"
author: "Giriraj Yadav"
tags: ["Java", "Maven", "Eclipse"]
description: "Learn step by step setting up and resolution of maven dependency using eclipse IDE."
---

Maven is a project build management software, it means it Let's you define your project dependencies, features, and behaviors. To do this, Maven downloads plugins and dependencies for various online repositories. People who want to share their libraries, develop using Maven and upload the binaries in a repository. In this article, we’ll discuss how to configure and use Maven dependency.

Prerequisites:

- Eclipse IDE
- Active internet connection

**Install the Maven support for Eclipse (m2e)**

Most Eclipse downloads include the Maven tooling already. If it is missing in your installation, you can install it via the main update of your release via Help > Install New Software. The following listing contains the update site for the Neon release and an update site maintained by the m2e project.

- Neon update site:  
    http://download.eclipse.org/releases/neon
- Update site provided by m2e project:  
    http://download.eclipse.org/technology/m2e/releases

For the usage of Maven for Java projects, you only need the m2e component. For Java web development you also want the m2e-wtp entry.

**Download the Maven index**

By default, the Maven tooling does not download the Maven index for the Eclipse IDE. Via the Maven index, you can search for dependencies, select them and add them to your pom file. To download the index, select Windows > Preferences > Maven and enable the _Download repository index updates on startup_ option.

After changing this setting, restart Eclipse. This triggers the download of the Maven index. You may want to remove this flag after restarting to avoid network traffic at every start of Eclipse.

**Create Maven project**

Create a new Maven project via File > New > Other… > Maven > Maven Project.

On the first wizard page, you can select if you want to create a simple project.

After creating the Maven project, a pom.xml is generated. You can find the file in Project Explorer. A Project Object Model or POM is the fundamental unit of work in Maven. It is an XML file that contains information about the project and configuration details used by Maven to build the project. It contains default values for most projects.

Now, you can add a dependency in pom.xml. For example, if you want to add LoginRadius for Java library/dependency, you can add as follows:

```
<dependencies>
    <dependency>
        <groupId>com.loginradius.sdk</groupId>
        <artifactId>java-sdk</artifactId>
        <version>11.0.0</version>
    </dependency>
    ......
</dependencies>
```

You should now be able to quickly import any libraries that you want o use in your project via Maven.
