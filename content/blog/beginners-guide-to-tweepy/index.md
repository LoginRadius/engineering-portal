---
title: "Beginners Guide to Tweepy "
date: "2020-10-24"
coverImage: "coverimage.jpg"
author: "Sameer Mahajan"
tags: ["Twitter","Tweepy","Python"]
---

As we all know that Twitter is one of the most preffered microblogging website when it comes to putting your thoughts on the internet. Big organizations use this platform to advertise their product, government institutions even use it to provide prompt customer resolution, various groups use Twitter to run social awareness campaigns, media campaigns. Twitter has close to 330 million monthly active users worldwide out of which 17 millions hits are generated from India itself along with more than 1 billion downloads on Play Store. With all this in mind, Twitter allows access to Twitter API to developers to create some cool applications like bots, automation tools etc. This Twitter API gives developers access to almost all of Twitter's functionalities like likes, retweets, tweets, etc. Tweepy, a python package helps us in achieving all this.

Tweepy is a python package which very smoothly and transparently accesses the Twitter's endpoints made available for the developers. Without tweepy, the user would have to take care of various low-level details pertaining to HTTP requests, rate limiting, authentication, serialization, etc. Tweepy handles all this mess on the behalf of the user making the application prone from errors. 
In simple words, Tweepy is basically an open-source python package which provides a way to developers for communicating with the Twitter API. But keep in mind, twitter levies a rate limit on the number of requests that can be made to the Twitter API. To be precise, 900 requests/15 minutes are allowed, anything above that is fed an error by Twitter.

### Installation
Tweepy can installed by using Python package manager **pip**. A simple demonstration can be seen below:
![](installation.png)

Installation on Linux and MacOS should follow similar steps as well.


Twitter API uses OAuth for authentication, so initially you need to apply for authentication credentials from Twitter. These authentication credentials basically consists of 4 components namely : _consumer_key, consumer_secret_key, access_token, access_token_secret_ . These credentials from twitter are used to instantiate the API. **Each account gets a unique key so don't reuse someone else's keys.** 
For getting those credentials from twitter, apply for a developer account on the [Twitter Developers](https://developer.twitter.com/en) page.
![](twitterdev.png "Twitter Dev Dashboard")
This is what the account looks like. Here you will get detailed information about total no. of requests made, your API credentials and much more information. After creating an account, you need to create an app, wherein you will be asked to name your app alongwith a short description. You must be wondering what is an app? 
App is like a gateway which contains set of permissions and keys used to access the Twitter API. An app is needed for accessing the Twitter API as a part of Twitter's OAuth authentication. After creating an app, generate new authentication tokens for authorization purpose.
![](keys.png)

### Getting Started : Tweepy
There are 4 common basic steps in any tweepy application.
1. Importing tweepy package.
2. Setting the authentication credentials.
3. Instantiating the API.
4. Creating API object.
```python
import tweepy
# authenticating twitter api credentials
consumer_key = '2OsNoPKOYCpxxxxxxxxxxxxxxxxxxxxxx'
consumer_secret = 'Xw07uU51xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
access_token = '24621057xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
access_token_secret = 'pXt5xxxxxxxxxxxxxxxxxxxxxxxxxxxx'

# instantiating the api
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# creating API object
api = tweepy.API(auth,wait_on_rate_limit=True,wait_on_rate_limit_notify=True)

import tabulate
user = api.get_user("Cristiano")
print("User Details:")
print(tabulate([["Name","Description","Location"],[user.name,user.description,user.location]],headers="firstrow"))
```
###### _Note : Use your own credentials in the hidden keys above._ 
Objects created from the tweepy.API class helps us to access most of the Twitter's available functionality like tweets, retweets, likes,etc. In the code snippet we used api.get_user method for getting information of a certain user on Twitter. Likewise there can be several use cases of different methods(discussed below) made available by twitter to developers. You can find the link for this code [here.](https://colab.research.google.com/drive/1dN02ioXElOQPOktIzNBACCncyrI2eiBR?usp=sharing)

Now we will see different methods provided by Twitter. The API methods have been divided into groups based on their functionality. The detailed guide for the API methods can be found at official [API reference](https://tweepy.readthedocs.io/en/latest/api.html) documentation. 
* Timeline methods
* Status methods
* User methods
* Direct Message Methods
* Friendship Methods
* Favorite Methods
* Block Methods
* Search Methods
* Trends Methods
* Geo Methods

#### Timeline Methods
These methods handles the tweets, retweets, statuses on your/someone else's timeline as long as the account is public.
```python
tweets = api.home_timeline()
for tweet in tweets:
    print(f"{tweet.user.name} said {tweet.text}")
```
api.home_timeline() is a API method which returns the 20 most recent tweets on the user's timeline.

#### Status Methods
These methods deal with creating,fetching tweets, retweeting tweets.
```python
api.update_status("Hello World!")
```
api.update_status() is a  api method which is used to create a tweet on user's timeline. For each update request, it will check the user's recent tweets. If any duplication is found, then the request will be blocked by twitter as a user cannot post same tweet more than once.
#### User Methods
These methods help to find the user details using various paramaeter like name, location, description,friends, followers,etc. as long as the account is public. 
```python
user = api.get_user("ISRO")
print(user.name)
print(user.decscription)
print(user.followers)
print(user.location)
```
We have used get_user() previously to fetch user details of specific accounts.
#### Friendship Methods
These methods help user to follow,unfollow certain accounts, list the accounts user follows,etc.
```python
api.create_friendship("elonmusk")
```
create_friendship() will add @elonmusk to the list of accounts you follow.
#### Favorite Methods
Likes or unlikes(if already liked) the status specified in the ID parameter as the authenticating user.
```python
api.create_favorite(tweet.id)
```
create_favorite() will like a tweet based on the tweet id provided.
#### Block Methods
Used to block, unblock, list blocked accounts of the user.
```python
api.create_block(id/screen_name)
```
create_block() will block the specific user using the id/screen_name provided. 
#### Search Methods
These methods help the user to search specific tweet based upon the search query and parameters provided. But not all tweets will be indexed or made available through the search methods.
```python
for tweets in api.search(q="iphone", lang="en"):
    print(tweet.text)
```
search() will lookout for all the tweets available for the query keyword 'q' provided.
#### Trends Methods
It returns the trends going on at specific geographical location.
```python
api.trends_place(1)
```
trends_place() will show trends in the specific area. Here 1 stands for worldwide.
#### Geo Methods
It returns the geographical location like latitude, longitude of the place id provided.
```python
api.geo_id(id)
```
geo_id() returns more geographical information of the concerned place id.

### Conclusion
Tweepy allows the user to concentrate on the logic of the application by hiding many low level details thus making the application bug-free. You can use tweepy to make some cool projects like bots, automation, machine learning applications, etc. 
##### Ket Takeaways
* What is Tweepy?
* Installation
* Getting Started with Tweepy
* Various API methods

More information about tweepy can be found at [docs.](https://tweepy.readthedocs.io/en/latest/index.html) Make sure to have a look at the official documentation as it will provide you with the greater picture of the package. So what are you waiting for? Go ahead, use your imagination and get started with the side-project you've been always thinking of.









