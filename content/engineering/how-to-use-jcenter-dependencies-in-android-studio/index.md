---
title: "jCenter Dependencies in Android Studio"
date: "2017-07-11"
coverImage: "jCenter.png"
author: "Hitesh Pamnani"
tags: ["JCenter", "Android"]
description: "Learn how to make use of jCenter dependencies in Android Studio."
---

jCenter is the public repository hosted at [bintray](https://bintray.com/) that is free to use for open source library publishers. It is the largest repository in the world for Java and Android OSS libraries, packages and components. All the content in JCenter is served over a CDN, with a secure HTTPS connection. In this article, we’ll discuss how to make use of jCenter dependencies in Android Studio.

Prerequisites

- Android Studio
- Existing project in Android Studio
- Active internet connection

If you don’t have Android Studio installed, you can download from the following link:

[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)

After successfully installing Android Studio, you can open an existing project or create a new project to start with.

**Usage**

After opening or creating a new project, you can find two files named “build.gradle” under Gradle Scripts section in the left pane. The first one will be suffixed with “Project” and another with “Module”. We’ll start with the “Project” one.

Add jCenter repository in project’s build.gradle file as shown below and sync your project:

```
allprojects {
   repositories {
       jcenter()
	   . . .
   }
}
```

On successful sync, you’re now able to add any Android dependency hosted on jCenter repository. The dependency will be added to “Module” build.gradle. It’s also known as app’s build.gradle.

For example, if you want to add LoginRadius dependency/library, you can add in app’s build.gradle as follows and sync your project:

```
compile 'com.loginradius.android:androidsdk:3.3.1'
```

If all the steps are followed successfully, you’re now able to add a jCenter dependency in Android Studio.
