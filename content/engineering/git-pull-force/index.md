---
title: "How to Perform a Git Force Pull"
date: "2020-12-03"
coverImage: "pull.jpg"
author: "Abhimanyu Singh Rathore"
tags: ["git"]
description: "How to Overwrite Local Changes With Git Force Pull"
---

It is fine when you and the rest of your team are working on different files. But sometimes, multiple people simultaneously work on the same files, and that's where the problems arise.

Just a Note: `git pull = git fetch + git merge`

In this scenario, when you have local changes in your system and you pull the latest contribution, you got this error.

`error: your local changes to the following files would be overwritten by merge: readme.md`
`please commit your changes or stash them before you merge. `
`Aborting...`


## Now you have 2 major choices

### Choice 1: you want to keep local changes

`git stash`  (stash the local changes clean the workspace)
`git pull` (pull the latest changes from remote )
`git stash apply` (apply the latest stash)

-----------(or)---------------

`git fetch` (fetch the local machine folder)
`git stash` (stash the local changes clean the workspace)
`git merge '@{u}'` (merge the changes from local folder to workspace folder)
`git stash pop` (apply the latest stash )

By default, the stash changes will become staged. If you want to unstage them, use `git restore --staged` (git ver > 2.25.0).

### Choice 2: you do not want the local changes

`git reset --hard HEAD` (reset to the head means remove all local changes)
`git pull ` (get the latest changes)

-----------(or)---------------

`git fetch` (fetch the local machine folder)
`git reset --hard HEAD` (reset to the head means remove all local changes)
`git merge '@{u}'`  (merge the changes from the local folder to workspace folder)


## git pull --force 

Now you must be thinking, what is `git pull --force` then?

it feels like it would help to overwrite local changes. instead, it fetches forcefully but does not merge forcefully (`git pull --force` = `git fetch --force` + `git merge`).

Like git push, git fetch allows us to specify which local and remote branch we want to work on. `git fetch origin/ft-1:my-ft` means the changes in the `ft-1` branch from the remote repository will end up visible on the local branch `my-ft`. When such kind of operation modifies the existing history, it is not allowed by the Git without an explicit --force parameter.
