---
type: async
title: How Git Local Repository Works
date: "2021-04-12"
coverImage: "git.png"
author: "Abhimanyu Singh Rathore"
description: "In this article, I will talk about how Git Local Repository Works"
tags: ["GIT"]
---

# How Git Local Repository Works

Let's understand how git set up a local repository
Once we initialize or clone any git project that will set up a local project environment.

that whole environment will look like the below picture 

![git-local-environment](localrepository.png)

**Project Folder**: The main folder consists of a workspace and local repository

**Work Directory**: Inside Project Folder where we actually work,  we keep all files and perform many operations like addition, update, deletion of files

**Local Repository**: Here we don't actually change anything, this is handled automatically by git. this consists **staging area**, **commit history**, **stash area** etc.



Let's get into it step by step and see how we perform command or action and behind the scene, git do its own activity. 

- Step 1. Git clone and project:
  ![3](3.png)

  ![4](4.png)
- Step 2. Explore what we got in repository
  ![5](5.png)

  ![6](6.png)
- Step 3. Do some modification in a files
  ![7](7.png)

  ![8](8.png)
- Step 4. Add this file in to staging (ready for commit)
  ![9](9.png)

  ![10](10.png)
- Step 5. Commit the file 
  ![11](11.png)

  ![12](12.png)
- Step 6. Push the changes
  ![13](13.png)

  ![14](14.png)


Hope this makes clear how git handling things at the local repository.