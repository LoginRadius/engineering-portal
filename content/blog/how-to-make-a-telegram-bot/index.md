---
title: How to make a telegram bot
date: "2020-10-3"
coverImage: "bot.png"
author: "Rajan Puri"
tags: ["Telegram Bot", "Python"]
description: "What is a bot and How to make our own Telegram bot"
---


## What is Bot?

According to Wikipedia, It is a software application that runs automated tasks (scripts) over the Internet. In other terms, It is a program written to mimic 
human behavior in order to perform some tasks. Bots takes an input and does simple and repetitive tasks which is much faster than human. 

There are 2 types of bots:

* Good Bots: Bots that are  benificial to organisations as well as individuls such as ChatBots, Social Media bots etc
* Bad Bots: These are the bots that are used to perform malicious activities such as Scraping and Spamming.

In this, We will make Telegram Chatbot which would be send the copy of input which the user has sent.

## Making our own Telegram Chatbot

We will be using **Python language** to make the bot and will be using **Telegram package** for our bot.
You can know more about telegram package from [here](https://python-telegram-bot.readthedocs.io/en/stable/telegram.html)


Firstly, we will generate our telegram token. Here are the steps to follow to generate your own token.

1)  Search BotFather on Telegram.
2)  Type **/start** to get started.
3)  Type **/newbot** to get a bot.
4)  Enter your Bot name and unique Username which should end with bot.
5)  Then you would get your Bot Token.

After generating our token, we will make a python program to make a Telegram bot which will sends the Text, Emojis and Stickers similar to the users input.

- Importing libraries required.

```python
import logging
from telegram.ext import Updater,Filters, CommandHandler, MessageHandler
```


```python
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',     #take time,level,name
                    level=logging.INFO)
logger = logging.getLogger(__name__)
```
This script does basic configuration for the logging system. It takes time, level and name.



- Now, we will make a variable Token which will take  your Telegram token.

```python
TOKEN = "ENTER YOUR TOKEN"  
```

- After writing the token, we will make some functions which our bot will perform.

```python
def start(bot,update):
    name  = update.message.from_user.first_name  #first name of the user messaging
    reply = "Hi!! {}".format(name)
    bot.send_message(chat_id = update.message.chat_id, text = reply)      #sending message

def help(bot,update):
    reply = "How can I help You"
    bot.send_message(chat_id = update.message.chat_id, text = reply)  #sending message

def echo_text(bot,update):
    reply = update.message.text
    bot.send_message(chat_id = update.message.chat_id, text = reply)

def sticker(bot,update):
    reply = update.message.sticker.file_id
    bot.send_sticker(chat_id = update.message.chat_id, sticker = reply)

def error(bot,update):
    logger.error("Shit!! Update {} caused error {}".format(update,update.error))

```

**start** function would be taking the users input and would be sending, Hi with the user's name.

**helf** function will prompt the message how can I help you.

**echo_text** and **sticker** function will send the same message or the stickers which the user has sent.

**error** function would be printing the error message  on the command prompt.


- Finally, we will make a main function, which would be executed first on running the program. It will take the updates and handle the updates.

```python
def main():
    updater = Updater(TOKEN)  #take the updates
    dp = updater.dispatcher   #handle the updates

    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", help))
    dp.add_handler(MessageHandler(Filters.text, echo_text))   #if the user sends text
    dp.add_handler(MessageHandler(Filters.sticker, sticker))  #if the user sends sticker
    dp.add_error_handler(error)
    updater.start_polling()
    logger.info("Started...")
    updater.idle()

if __name__=="__main__":
    main()
```    


> Save the program and execute the program to check the working of the telegram bot on telegram.


You can get the source code to make the Telegram bot from this Github Repository. [Bot :robot:](https://github.com/rjn01/TelegramBot) or
You can also make some changes to the code to make bot do cool stuffs such as Getting News, Articles or Movies recommendations.
You can check this [github repository](https://github.com/rjn01/Wiki-Bot) for making changes to the program.

