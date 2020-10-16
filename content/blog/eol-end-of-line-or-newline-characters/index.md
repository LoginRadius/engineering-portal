---
title: "EOL End of Line or Newline Characters"
date: "2017-09-06"
coverImage: "eol.png"
author: "Govind Malviya"
tags: ["Engineering", "EOL", "Linux", "Mac","Windows"]
---

Which character do you consider as the end of line or newline? Most developers will answer \\n (except for front-end developers, they would say: "\</br>tag" :) ). But this is not true, let's understand why.

**What is an End of Line character:**

It is a character in a string which represents a line break, which means that after this character, a new line will start. There are three basic new line characters:

**LF** (character : \\n, Unicode : U+000A, ASCII : 10, hex : 0x0a): This is simply the '\\n' character which we all know from our early programming days. This character is commonly known as the ‘Line Feed’ or ‘Newline Character’.

**CR** (character : \\r, Unicode : U+000D, ASCII : 13, hex : 0x0d) : This is simply the 'r' character. This character is commonly known as ‘Carriage Return’.
As matter of fact, \\r has also has a different meaning. In older printers, \\r meant moving the print head back to the start of line and \\n meant starting a new line.

**EOL** (character : \r\n, Unicode: 0x0D0A ) : This is the two ASCII characters and is a combination of the CR and LF characters. This character is know as ‘End Of Line’.This character is used as the new line character in most other non-Unix operating systems, including Microsoft Windows and Symbian OS.

**OS support**

Different platforms use different characters to signify a new line

Unix: Unix systems consider '\\n' as a line terminator. Unix considers \\r as going back to the start of the same line.

Mac (up to 9): Older Mac OSs consider '\\r' as a newline terminator but newer OS versions have been made to be more compliant with Unix systems to use '\\n' as the newline.

Windows: Windows has a different style of newline, Windows supports the combination of both CR and LF as the newline character - '\\r\\n'.

**How to check**  
There are lots ways to check this. I use Notepad++ as my text editor for this because it is easy to use and is widely used by developers.  
NPP show all characters

Open any text file and click on the pilcrow (¶) button. Notepad++ will show all of the characters with newline characters in either the CR and LF format. If it is a Windows EOL encoded file, the newline characters of CR LF will appear (\\r\\n). If the file is UNIX or Mac EOL encoded, then it will only show LF (\\n).

**NPP Extended search**

Press the key combination of Ctrl + Shift + F and select 'Extended' under the search mode. Now search '\\r\\n' - if you find this at end of every line, it means this is a Windows EOL encoded file. However, if it is '\\n' at the end of every line, then it is a Unix or Mac EOL encoded file.

**How to convert**

Let's stick with notepad++ for this, too. Open any file that you would like to convert, click on the Edit menu, scroll down to the EOL conversion option, and select the format that you would like to convert the file to.
