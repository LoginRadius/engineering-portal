---
title: Git with Visual Studio Code
date: "2020-10-24"
coverImage: "Coverphotoforblog.png"
author: "Roshan Jha"
tags: ["tutorial","git-github", "time-saviour","visual-studio-code","useful-for-all"]
description: "Learn to integrate Git with your Visual Studio Code."
---

# Use Git with Visual Studio Code

In this tutorial, you will learn about using **git** inside **VSCode**.

Visual Studio Code[more popularly known as VS Code] is a very powerful and easy-to-use code editor. 
It comes with broad programming language support, is highly customizable with various extensions and it is for free - a great package for beginners and more advanced programmers 
in my opinion.

If you are someone who is already familiar with using git in the traditional manner from the terminal/git bash, 
do stick around and you might find some tricks to save a lot of time in your workflow.But if you are someone who does not like to work with the terminal a lot and would just go 
for a UI flow, then this is going to turn out **very useful** for you.

## Prerequisites

1. [Visual Studio Code](https://code.visualstudio.com/download) and [Git](https://git-scm.com/downloads) installed on your system.
2. Basic knowledge of git and github.[This [course](https://youtu.be/SWYqp7iY_Tc) can help you with that.]
3. Open up your project folder in Visual Studio Code.

> **Note:** If you have already performed any step (like initialising the git repo) from VS Code you can just skip to the next step as Visual Studio Code keeps a track of your entire 
Git History.

> **Extras:** If you prefer keyboard shortcuts over clicking around with your mouse, do check out Step 6 👀.

### Step 1: Initialise a git repo

- Search for the source control icon in the sidebar and click on it.

    ![](https://img.techpowerup.org/201022/njx720mk8wjx2avn91dj.jpg)
    
- You should see some text that says something like this folder does not have a git repo. Click on the button that says "Initialise repository"
  
### Step 2: Add files to staging area

- Now we can see all our files listed down under a section titled **Changes**.
- When you hover over any file, you would see three options. Click the third one which is a plus(+) icon. This would add that particular file to the staging area.
     
     ![](https://img.techpowerup.org/201022/w4l8lkz54zel29eln13o.png)

- To add all the files to the staging area, (similar to the command `git add .`) hover over the **Changes** title and click on the plus(+) icon there.   
     ![](https://img.techpowerup.org/201022/1ea7n227itjwk8q9ggjx.png)

### Step 3: Commit the changes
      
  -  Our staged files would be now be in the appropriately named **Staged Changes** section
  -  To commit the changes look for a ✔ in the **Source Control** pane.
  
      ![](https://img.techpowerup.org/201022/aw302zw6o75qmc6xsxn5.png)
  
  -  A prompt will ask you for a commit message, enter a relevant message and hit enter. The changes are now committed.
  -  If you only work in local repositories, then this is it. Head over to Step 6 for some time saving tricks.
  
### Step 4: Add a remote
- Head over to Github, create a new repository and get the url (ending with 'yourusername/repositoryname.git') that you would otherwise use in the `git remote add` command.
- Now back in VS Code click the three dots for more options in the **Source Control Pane** (see image in Step 3) and then select **Remote>Add Remote**
- Enter the url that you got earlier and after that enter a name for the remote repo.

### Step 5: Push your code to Github

- For the first push, open the options in the **Source Control Pane** and select **Branch>Publish Branch...** You might be asked to login to github, do that.
- In a few seconds, the code will be available in your Github repository.
- For subsequent pushes, going to **Options>Push** will push the code to Github.

### Step 6 [Optional] :

  One under-rated feature of Visual Studio Code is the ability to add a keyboard shortcut for almost anything inside the editor. 
  Personally I have never used it but have seen several developers use it to ease their workflow with git/github.
  
  - Open the command palette with Ctrl+Shift+P, search for 'Open keyboard shortcuts' and open it.
    
    ![](https://img.techpowerup.org/201022/omzrvu8q0lrah1mj7mqu.png)
  
  - Now search for 'git' in the search bar and you can choose any action and assign it to any unused key combination.
  
    ![](https://img.techpowerup.org/201022/xa85zdv9fprqzej6mj28.png)
    
  - For example, I have made the following combinations for staging all files, committing all files and pushing the changes.
  
     ![](https://img.techpowerup.org/201022/fvvhapvcc1otr2icu3bb.png)
  
  
## CONCLUSION:

There are a lot of git features baked into Visual Studio Code, these were basic actions to get you started. I hope you found this tutorial helpful.
Also feel free to share any of your productivity tips. Would love to see what you all are using.
