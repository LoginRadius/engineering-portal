---
title: "How to Fetch a Remote Branch using Git"
date: "2020-12-11"
coverImage: "cover.png"
author: "Versha Gupta"
tags: ["Git"]
description: The Git remote branch is a way to access the independent work of a co-worker. Find out how to fetch a remote branch using git in this article.
---

We, as developers, also work with Git. Developers need to understand how [to work with Git](https://www.loginradius.com/blog/async/github-api/) and the different possibilities of working with repositories and code in Git (such as managing the size of your reports, etc.). Along those lines, testing out a remote branch is one thing you'll be doing at least regularly, so we put together a short guide to cover the ins and outs of dealing with small branches in Git.

## Git: How to Fetch a Remote Branch

When working in the team, You will need to fetch the branch from a remote repository using Git.
You Simply  need to do:

```
git fetch <remote-repository>
```

This fetch command will fetch all remote branches and also store all references/objects. Once all branches are loaded successfully, you can checkout to the branch you are interested in, giving you a local working copy. Now you can inspect and play with code.

Run this command

```
git checkout -b <local-branch> <remote-repository>/<remote-branch>
```

or

```
git branch <local-branch> <remote-repository>/<remote-branch>
```

If you have a single remote repository, then you can omit all arguments. just need to run `git fetch`, which will retrieve all branches and updates, and after that, run `git checkout <branch>`
which will create a local copy of the branch because all branches are already loaded in your system.

> Note: `git pull = git fetch + git merge`

When you run a pull command, it will fetch changes from remote branches and merge into your local changes, but if you want to get the latest changes and don't want to merge into the local branch, you need to run `git fetch` command.

Fetch command will retrieve all changes from the remote branch which do not exist in the local branch. FETCH_HEAD ref track can be used for fetched changes from remote branches. 

This is a good option `--track` in this command through which you can track the local branch with the remote one. It helps pull and push the changes.
Run this command

```
git checkout --track <remote-repository>/<remote-branch>
```

The above command will create a local branch with the same name as the remote branch. But if you want to create a different local branch, then include the `-b` option to create a new local branch.

```
git checkout --track -b <local-branch> <remote-repo>/<remote-branch>
```

To verify what tracking branches you have set up, you can use the `-vv` option with `git branch`. This will list out your local branches with more information on what each branch is tracking and if your local branch is behind, ahead.

```
git branch -vv
```

### Conclusion

For software developers, Git is a way to track their code for different modifications. It stores all the various models in a unique database. Git enables several developers to work concurrently on the same principle. A programmer will also need to access the independent job, or "branch," of a coworker. This is made possible by the git remote branch operation.

If you want to learn more about GIT here is a quick guide on, [how to use git cherry pick](/git-cherry-pick/). If you like the tutorial, then leave a comment below and let's talk.
