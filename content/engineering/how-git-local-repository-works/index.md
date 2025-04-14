---
title: How Git Local Repository Works
date: "2021-04-12"
coverImage: "git.webp"
author: "Abhimanyu Singh Rathore"
description: "In this article, I will talk about how Git Local Repository Works"
tags: ["GIT"]
---

# How Git Local Repository Works

Let's understand how git set up a local repository
Once we initialize or clone any git project that will set up a local project environment.

that whole environment will look like the below picture 

![git-local-environment](localrepository.webp)

**Project Folder**: The main folder consists of a workspace and local repository

**Work Directory**: Inside Project Folder where we actually work,  we keep all files and perform many operations like addition, update, deletion of files

**Local Repository**: Here we don't actually change anything, this is handled automatically by git. this consists **staging area**, **commit history**, **stash area** etc.



Let's get into it step by step and see how we perform command or action and behind the scene, git do its own activity. 

- Step 1. Git clone and project:
  ![3](3.webp)

  ![4](4.webp)
- Step 2. Explore what we got in repository
  ![5](5.webp)

  ![6](6.webp)
- Step 3. Do some modification in a files
  ![7](7.webp)

  ![8](8.webp)
- Step 4. Add this file in to staging (ready for commit)
  ![9](9.webp)

  ![10](10.webp)
- Step 5. Commit the file 
  ![11](11.webp)

  ![12](12.webp)
- Step 6. Push the changes
  ![13](13.webp)

  ![14](14.webp)


Hope this makes clear how git handling things at the local repository.

> Note: [Click here to learn how you can automate your Git workflows with Hooks](https://compile7.org/decompile/how-to-automate-workflows-with-git-hooks/)