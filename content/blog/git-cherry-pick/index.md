---
title: Git Cherry Pick
date: "2020-11-11"
coverImage: "cherrypck.jpg"
author: "Abhimanyu Singh Rathore"
description: "introduction about Git Cherry pick and its usages"
---

![cherry](cherrypck.jpg)

# Git Cherry Pick
------------


## WHAT it is

git cherry-pick is a powerful command that allows any specific Git commits to be selected by reference and appended to the current working HEAD. The act of picking a commit from a branch and adding it to another is **cherry picking**. For undoing modifications, `git cherry-pick` can be useful. Say , for example, that a commit is made to the wrong branch unintentionally. You may turn to the right branch and select the commit to where it is supposed to belong. 


## HOW to use
To showcase this, let us assume we have a repository with the following branches:

    alpha - beta - gama - delta   `Master`
         \
           x - neutron - Ultraviolet `Feature`


`git cherry-pick commitSha`

In this example, commitSha is a reference to commit. By using git log, you can locate a commit reference.d lets assume we wanted to use commit 'neutron' in master in this example. We make sure that we working on the master branch first.

`git checkout master`

`git cherry-pick neutron`

Once executed our Git history will look like:

    alpha - beta - gama - delta - neutron  `Master`
         \
           x - neutron - Ultraviolet `Feature`
		   
The neutron commit has been successfully picked into the feature branch



## WHEN to use

git cherry-pick is a useful tool but isn't best practise always. Cherry picking can trigger duplicate commits, and traditional merges are preferred instead in many situations where cherry picking would work. Git cherry-pick is a helpful option for a few situations 

#### Collaboration
A team will often find individual members working in or around the same code sometimes. Perhaps there is a backend and frontend component of a new product feature. There may be some shared code between two sectors of the product. Perhaps the developer of the backend produces a data structure that will also need to be used by the frontend. In order to select the commit in which this hypothetical data structure was created, the frontend developer could use git cherry-pick. This selection would allow the developer of the front end to continue progress on their project side.

####  Quick fixes
When a bug is discovered it is important to fix that quickly as possible. For an example, lets say a developer has started work on a new feature. while development of new feature they find a existing bug. The developer creates an explicit commit to fix this bug. This new patch commit can be cherry-picked directly to the master branch to quick fix the bug.

####  Undo and restore commits
A feature branch can often go stale and not be merged into a master. Often, without merging, a pull request might be closed. Git never sacrifices those commits, and they can be identified and cherry picked back to life by commands such as git log and git reflog.





## Other options


**-edit**
Passing the -edit option causes git to trigger a commit message before the cherry-pick process is introduced.

**—no-commit**
The —no-commit option executes the cherry pick, but it transfers the contents of the target commit into the working directory of the current branch instead of making a new commit.

**—the-signoff**
The —signoff option adds the signature line 'signoff' to the end of the cherry-pick commit message at the end.

 git cherry-pick also accepts merge strategy options and conflict resolution as well. please check git merge strategies documentation.
