---
title: "Introductions to Github actions for Android"
date: "2020-10-01"
author: "Akshita Gupta"
coverImage: "action1.jpg"
tags: ["Android", "Git", "Actions"]
---

## What is Github Actions?

It is a CI/CD tool to automate the software workflow very easily. There are several tools like Jenkins, CircleCI, TeamCity, TravisCI which help you to automate your workflow, but setting up Github Actions for your repository on Github is extremely easy.
A CI system allows you to run your tests every time you integrate a change in your codebase. Moreover, builds and tests are running in an isolated environment. This will exclude variability introduced by the local developer machine.

Advantages of Github Actions:

1) GitHub actions are very easy to debug. It is simply successive docker runs. It is possible to reproduce the built environment for container-based Travis, but quite difficult. On GitHub actions it’s only a docker assemble docker flee.

2) Every action in a workflow is separated as a matter of course. You can utilize an entirely different registration condition for, similar to, compilation and testing. Travis CI (or other “traditional” CI) would run all actions in the same computing environment. Once more, GitHub actions are a lot simpler to reason about and debug.

3) The main.workflow specification is open-source. The entire thing is wrapped into Docker in any case, so stage lock-in is apparently insignificant.

### Getting Started

When you open your repository on Github, you will now see a new tab called “Actions”. Since we don’t have any action setup as yet the page will look similar to this.

![action2](action2.png)


