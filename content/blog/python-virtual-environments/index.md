---
title: Using Virtual Environment In Python
date: "2020-10-16"
coverImage: "python.jpg"
author: "Ashish Maharjan"
tags: ["python"]
description: "To work in python virtual environment."
---

Data Science, Deep Learning, Machine Learning, and Artificial Intelligence are the current trending topics in the field of computer technology. Day by day, the progress in these fields is increasing due to which it made our lives easier and more machine-dependent. To master these fields(Data Science or AI), programming is a must, and this is where Python has been doing a great job. Except in these fields, it also has a high range of popularity in web development, operating systems, mobile application development, video games, etc. For this blog, we move our attention toward using a virtual environment in Python for our projects.

## What is a virtual environment?

A virtual environment is simply a tool that separates the dependencies of different projects by creating a separate isolated environment for each project. These are simply the directories so that unlimited virtual environments can be created. This is one of the popular tools used by most of the Python developers.

## Why do we need a virtual environment?

Python has various modules and packages for different applications. During our project, it may require a third-party library, which we install it. Another project also uses the same directory for retrieval and storage but doesn't require any other third-party packages. So, the virtual environment can come into play and make a separate isolated environment for both projects, and each project can store and retrieve packages from their specific environment.

Also, let us consider another case where we are creating a web application using Django. Suppose you are working on two projects project1 and project2. If project1 uses Django-2.2 and project2 uses Django-3.2, they would be stored in the same directory with the same name, and the error may occur. Then, in such cases, virtual environments can be really helpful for you to maintain the dependencies of both the projects.

## Working with a Virtual environment

To create a virtual environment, we need a module named [virtualenv](https://pypi.org/project/virtualenv/). It creates a folder with all the necessary executables to run Python projects. Make sure **pip** is installed on your computer. If not, then use the following command:

<img src="pip.png" alt="Pip" /><br>

### Install virtualenv:

Open the terminal and paste the following command to install a virtualenv:

<img src="install.png" alt="Install" /><br>

### Check your version of virtualenv:

If you want to confirm whether it is installed or not, paste the command below in your terminal:

<img src="check.png" alt="Check" /><br>

### Create a virtual environment:

After successful installation of virtualenv, now you can create a virtual environment with your desired name using following command:

<img src="name.png" alt="Check" /><br>

Here, I created `venv` as the name of my virtual environment. You can name it whatever you desire. The folder with the name `venv` is created that contains all the necessary executables to run the Python project. This is the folder where all your python packages will run.

To specify the Python interpreter of your choice, you can do it easily by specifying Python{version-name}.
Eg: To create python2.7 virtual environment, we use following command:

<img src="version.png" alt="Version" /><br>

After successfully creating the virtual environment, you need to activate it to enter into that particular isolated environment. Always remember to activate the required virtual environment before working on the project. To activate it, we move to the location where the name of your desired virtual environment is located and follow the command below:

<img src="activate.png" alt="Activate" /><br>

**Note:** Instead of `venv`, you write the name of your virtual environment you created.<br>

#### In Windows,

<img src="windows.png" alt="Windows" /><br>

After activating the virtual environment, you can see your name of the virtual environment on the terminal's left side. It confirms the activation of your virtual environment and is currently active. 

<img src="activated.png" alt="Activated" /><br>

Finally, you successfully created and activated your virtual environment. Now, you can install the dependencies and requirements your project asks for without interfering with other projects.
Once you completed your work, then you can return to the system default environment by just using the **deactivate** command as shown below:

<img src="deactivate.png" alt="Deactivate" />
