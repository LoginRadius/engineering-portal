---
title: "Vim: A Level up 
date: "2021-01-03"
author: "Shubhankar Khare"
coverImage: "Vim.png"
tags: ["Vim", "Text Editor"]
description: "Vim is Vi's newest and most common reincarnation that is supported on every known platform, check out the article to learn about what is ViM, and how to make the most out of it."
---
# Vim : A Level up
As the title of the blog suggests, you **need to know the basics of VIM** beforehand. You may refer to my previous blog *Vim : Getting started* on LoginRadius.
In this tutorial we're going to explore the concept of

- **Macros**
- **Buffers and spliting**
- **global  command**

and a few other tips and tricks. I've seen folks using VIM for a long time not using these handy, very useful features

## Macros
Macros are something that you don't want to miss out on, if you want to level up your vim game. Vim macro is a powerful feature that allows you to record sequence of keys on the fly. It helps you to automate a lot of stuff. Macros are based on the concept of registers. If you don't know what registers are you can think of them as a bunch of spaces in memory that vim uses to store some text.
Macros are editable registers , which you can record ,store and edit whenever you want.
Here's the basic syntax of  macros:


    q<key you want to record your macro into><series of commands>q
Example :

    q1f;xq
Let me break it down for you .
q : Starts recording a macro
1 : The recorded macro will be stored on key 1
f;x : Find first occurrence of `;`in that line and delete `;`
q : stop recording the macro

That's it. Now you can use this macro by `@<your key>` i.e `@1`
If you want to repeat a macro n number of times then `n@1`is the syntax.

### Use case :
Not impressed yet ? Huhh! Let me show you a practical use case to demonstrate the power of a macro. I work in ReactJs a lot and I like to export all my components in one file. Let's try exporting 99 HeroBlocks in one go.
Our desired result is :
```
export {default as HeroBlock1 } from './HeroBlock1/HeroBlock1.js'
export {default as HeroBlock2 } from './HeroBlock1/HeroBlock2.js'
export {default as HeroBlock3 } from './HeroBlock1/HeroBlock3.js'
...
..
so on

```

    vim index.js
And write this line
```export {default as HeroBlock1 } from './HeroBlock1/HeroBlock1.js'```

Now follow along
```q1yyp4E ^A6e ^Aq```

Breaking it down :

q1 : Start recording macro in key 1
yy : yank the current line
p : paste the yanked line
4E : Get the cursor to 1 of Heroblock1 . ( *`f1` might be tempting but it will give you wrong results as not all lines will have 1 , they can have any number. Try making the macro very generalized* )
^A : this is `ctrl + a` .It increments the current version by one.
6e : Get the cursor to second number .
^A : increment the number by one
q : stop recording

Now to repeat your macro 99 times :
```99@1```

And that's all.

![macrodemo](vim-macro-demo.png)

## Buffers and splitting
In simple terms, a _buffer_ is a file that has been loaded into memory. Everything you do in VIM is in a buffer. You can list all the buffer's by `:Buffers` and then if you want to want to checkout a particular buffer use `:b n` where n is the buffer number. If you want to delete a buffer `:bd n` is the command.
To create a new buffer in the same view, that is creating a split in the current window` :sp filename`. For a vertical split `:vsp filename.`


 To be honest, using buffer numbers to switch buffers is not what I prefer to do. I prefer to switch based on what I see, like `ctrl-w` then `j`to focus on a buffer below , if I'm splitting the window. `:tabprevious` to move a tab on left if I'm using tabs.
 Here are some key bindings you might want to use for a smooth workflow.

```
nnoremap <C-t> :tabnew<Cr>
nnoremap <C-Left> :tabprevious<CR>
nnoremap <C-Right> :tabnext<CR>
nnoremap <C-J>  <C-W><C-J>
nnoremap <C-K>  <C-W><C-K>
nnoremap <C-L>  <C-W><C-L>
nnoremap <C-H>  <C-W><C-H>
```

## Global command
Global command in vim is very powerful and will solve a lot of your problems very easily.
The basic syntax goes something like:-
```
:[range]global/{pattern}/{command}
```
Let us go through some use cases to learn more about it.
```
:g/console/d
```
this will delete any line containing the word console in it in the entire file
```
:10,20g/console/d
```
this will delete any line between line 10-20 containing the word console in it.
You can even do the inverse of it by using `:g!`
```
:g!/console/d
```
this will delete any line **not** containing the word console in it in the entire file
You can even combine the two
```
:g/console/g!/Hello/d
```
this will delete any line containing *console*  and not containing *hello* in it in the entire file
Global command can work on any regular expression and that makes it even more powerful, provided you're creative enough..
```
:g/^#/d
```
Will delete any line starting with `#`i.e comments in python will be deleted in one go.

So far we've been using d as the command, but it can be anything else like `m` for move `t` for copy etc.
One of the very powerful command is `norm`. This command allows you to do anything that would have worked in normal mode.
```
:g/print/norm I#
```
This will comment out all the print statements in a python code in one go.

Global command can be coupled with macros using norm that means you can apply a macro to certain lines matching the regex given. This was enough to blow my mind and it made the time I spent reading about vim, worth it.
Here's the syntax for using macros with global command.
```
:g/const/normal @q
```
## You made it !!
Congratulations!! You made it this far. You now have leveled up your vim game. All these tips and tricks will eventually be useful to you. Here's a little something for reading this far https://pintovim.dev/. You can use this tool to make your own customized vim colorscheme.
Thanks for reading!
