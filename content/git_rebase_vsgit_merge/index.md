---
title: Git Merge vs Git Rebase
date: "2021-01-21"
coverImage: "merge.png"
author: "Abhimanyu Singh Rathore"
description: "Differnce between Git Merge and Git Rebase"
---

![merge](merge.png)

Git Merge Vs Git Rebase
------------

### What it is

Git Merge and Git Rebase are both used to combine the changes of branches but in a distinct way.


####Merge
Combine multiple branches histories together.


      A---B---C feature
     /
	D---E---F---G master 

if we are merging feature and master branch then it would be

      A---B---C feature
     /               \
    D---E---F---G---H master

**Commands** for merging feature and master branch

`git checkout feature`
`git merge master`

**Note:**
- merge executes only one new commit
- if the feature branch is having completly different development 
- If you get conflict while merging 
`resolve conflicts `
`git add (changes)`
`git merge --continue`



#### Rebase
Reapply commits on top of base branch


       A---B---C feature
	 /
	D---E---F---G master

if we are rebasing feature branch onto master branch then it would be

		   A'--B'--C' feature
		 /
		D---E---F---G master


**Commands** for merging feature and master branch

`git checkout feature`
`git rebase master`


**Note:** 
-  rebase typically executes multiple (number of commits in current branch).
- If you get conflict while rebasing 
`resolve conflicts `
`git add (changes)`
`git rebase --continue`


## When to use

When to use Rebase or  Merge

### Choose Merge
- whenever we want to add changes of a feature  branch back into the base branch.
- if you want to keep same history rather then rewrite it.
- if you want to revert the changes quickly

### Choose Rebase
-  whenever we want to add changes of a base branch back to a feature  branch.
- squash multiple commits
- reiterate each commit and update the changes
- reverting rebase would be very difficut


