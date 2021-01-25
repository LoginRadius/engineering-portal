---
title: Git Merge vs Git Rebase
date: "2021-01-25"
coverImage: "merge.png"
author: "Abhimanyu Singh Rathore"
description: "Difference between Git Merge and Git Rebase"
---

## What are Git Merge and Git Rebase?

Git Merge and Git Rebase are both used to combine the changes of branches but in a distinct way.


### Git Merge
Combine multiple branch histories together.


      A---B---C feature
     /
	D---E---F---G master 

if we are merging feature and master branch, then it would be

      A---B---C feature
     /               \
    D---E---F---G---H master

**Commands** for merging feature and master branch

`git checkout feature`
`git merge master`

**Note:**
- merge executes only one new commit
- if the feature branch has a completely different development 
- If you get conflict while merging 
`resolve conflicts `
`git add (changes)`
`git merge --continue`



### Git Rebase
Reapply commits on top of the base branch


       A---B---C feature
	 /
	D---E---F---G master

if we are rebasing the feature branch onto the master branch, then it would be

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


## When to use Git Rebase or Git Merge
### Choose Merge
- whenever we want to add changes of a feature branch back into the base branch.
- if you want to keep the same history rather than rewrite it.
- if you want to revert the changes quickly

### Choose Rebase
-  whenever we want to add changes of a base branch back to a feature branch.
- squash multiple commits
- reiterate each commit and update the changes
- reverting rebase would be very difficult


