---
title: "How to Fetch a Remote Branch using Git"
date: "2020-04-12"
coverImage: "cover.png"
author: "Versha Gupta"
tags: ["Git", "fetch"]
---

## Git: Fetch a Remote Branch

When you are working in the team, You will need to fetch the branch from remote repository using Git.
You Simply  need to do:

    git fetch <remote-repository>

This fetch command will fetch all remote branches and also stored all references/objects. Once all branches is loaded successfully, you can checkout the branch you are interested in, giving you a local working copy. Now you can inspect and play with code.

Run this command

    git checkout -b <local-branch> <remote-repository>/<remote-branch>

    or

    git branch <local-branch> <remote-repository>/<remote-branch>

If you have a single remote repository then you can omit all arguments. just need to run `git fetch`  which will retrieve all branches and updates and after that run `git checkout <branch>`
which will create local copy of branch because all branches already loaded in your system.

Note: `git pull = git fetch + git merge`

when you run a pull command, it will fetch changes from remote branches and merge into your local changes but if you want to get the latest changes and don't want to merge into local branch so you just need to run `git fetch` command.

Fetch command will retrieve all changes from remote branch which do not exist in local branch. FETCH_HEAD ref track can used for fetched changes from remote branches. 

These is good option `--track` in this command through which you can track local branche with remote one. its helpful for pulling and pushing the changes.
Run this command

    git checkout --track <remote-repository>/<remote-branch>

Above command will create a local branch with same name as the remote branch. But if you want to create different  local branch then include `-b` option to create new local branch.

    git checkout --track -b <local-branch> <remote-repo>/<remote-branch>

To verify what tracking branches you have set up, you can use `-vv`option with `git branch`. This will list out your local branches with more information what each branches is tracking and if your local branch is behind, ahead.

    git branch -vv

