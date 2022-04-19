---
title: 35+ Git Commands List Every Programmer Should Know
date: "2021-02-17"
coverImage: "git.png"
author: "Abhimanyu Singh Rathore"
description: "In this article, I will talk about the Git Commands that you will be using often when you are working with Git."
tags: ["GIT"]
---

Git is an important part of daily programming and is commonly used in the software industry. Since you can use a lot of different commands, mastering Git needs time. But some commands are more commonly used. So I'm going to share the most useful Git commands in this post that every developer should know.

But first you need to know the [fundamentals of Git](https://www.loginradius.com/blog/async/github-api/) to understand this article.

Useful Git Commands List
================

| Command | Description |
| ------- | ----------- |
| `git init` | Initialize a local Git repository |
| `git clone repo_url` | Clone public repository |
| `git clone ssh://git@github.com/[username]/[repository-name].git` | Clone private repository |
| `git status` | Check status |
| `git add [file-name]` | Add a file to the staging area |
| `git add -A` | Add all new and changed files to the staging area |
| `git commit -m "[commit message]"` | Commit changes |
| `git rm -r [file-name.txt]` | Remove a file (or folder) |
| `git branch` | List of branches (the asterisk denotes the current branch) |
| `git branch -a` | List all branches (local and remote) |
| `git branch [branch name]` | Create a new branch |
| `git branch -d [branch name]` | Delete a branch |
| `git branch -D [branch name]` | Delete a branch forcefully |
| `git push origin --delete [branch name]` | Delete a remote branch |
| `git checkout -b [branch name]` | Create a new branch and switch to it |
| `git checkout -b [branch name] origin/[branch name]` | Clone a remote branch and switch to it |
| `git branch -m [old branch name] [new branch name]` | Rename a local branch |
| `git checkout [branch name]` | Switch to a branch |
| `git checkout -` | Switch to the branch last checked out |
| `git checkout -- [file-name.txt]` | Discard changes to a file |
| `git merge [branch name]` | Merge a branch into the active branch |
| `git merge [source branch] [target branch]` | Merge a branch into a target branch |
| `git stash` | Stash changes in a dirty working directory |
| `git stash clear` | Remove all stashed entries |
| `git push origin [branch name]` | Push a branch to your remote repository |
| `git push -u origin [branch name]` | Push changes to remote repository (and remember the branch) |
| `git push` | Push changes to remote repository (remembered branch) |
| `git push origin --delete [branch name]` | Delete a remote branch |
| `git pull` | Update local repository to the newest commit |
| `git pull origin [branch name]` | Pull changes from remote repository |
| `git remote add origin ssh://git@github.com/[username]/[repository-name].git` | Add a remote repository |
| `git remote set-url origin ssh://git@github.com/[username]/[repository-name].git` | Set a repository's origin branch to SSH |
| `git log` | View changes |
| `git log --summary` | View changes (detailed) |
| `git log --oneline` | View changes (briefly) |
| `git diff [source branch] [target branch]` | Preview changes before merging |
| `git revert commitid` | Revert commit changes |
| `git config --global user.name "your_username"` | Set globally Username |
| `git config --global user.email "your_email_address@example.com"` | Set globally Email id |
| `git config --global --list` | Get global config |

So these are the most helpful git commands I find in my everyday programming. There are several more things to learn about Git, I will explain them in a separate post.
