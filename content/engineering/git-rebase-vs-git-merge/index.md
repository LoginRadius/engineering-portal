---
title: "Git merge vs. Git Rebase: What's the difference?"
date: "2021-01-27"
coverImage: "merge.png"
author: "Abhimanyu Singh Rathore"
tags: ["GIT"]
description: "In this post, I will give you a walkthrough on merge and rebase, comparing Git rebase vs. Git merge to find out the similarities and differences."
---

Many of us have to choose between Merge and Rebase as a Developer. Here I'll explain what merge and rebase are, why you should use them, and how to do so.

The same function is fulfilled by Git Merge and Git Rebase. They are built to incorporate adjustments into one from different divisions. Although the end objective is the same, it is done in various ways by those two approaches, and it is useful to know the difference as you become a better developer of software.

## What are Git Merge and Git Rebase?

*Git Merge and Git Rebase are both used to combine the changes of branches but in a distinct way.*

**Git Merge** - For developers using version control systems, merging is a prevalent method. Merging takes the contents of a source branch and combines them with a target branch, to be more precise. Only the [target branch is updated](https://medium.com/@loginradius/how-to-fetch-a-remote-branch-using-git-5c0f6d28264d) in this process. The history of the source branch remains similar.

**Git Rebase** - Another way to integrate modifications from one branch to another is by Rebase. Rebase compresses all the modifications into a single patch. The patch is then inserted into the target branch.


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

### Conclusion

I hope some perspectives on Git merge and Git rebase have been provided by this description. The strategy of merge vs rebase is still debatable. But maybe this article will help to dispel your doubts and encourage you to take an approach that works for your team. Here are few articles posted by me that will help you in learning few more things in Git:

1. [How to use Git Cherry Pick](https://www.loginradius.com/blog/engineering/git-cherry-pick/)
2. [How to Perform a Git Force Pull](https://www.loginradius.com/blog/engineering/git-pull-force/)

Do comment on the subjects that you would like me to write about in the coming weeks :)

