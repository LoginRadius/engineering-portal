---
title: "Write a highly efficient python Web Crawler"
date: "2015-07-14"
coverImage: "python-web-crawler.png"
author: Mark Duan
tags: ["Python","Coding"]
---

As my previous blog, I use the python web Crawler library to help crawl the static website. For the Scrapy, there can be customize download middle ware, which can deal with static content in the website like JavaScript.

However, the Scrapy already helps us with much of the underlying implementation, for example, it uses it own dispatcher and it has pipeline for dealing the parsing word after download.  One drawback for using such library is hard to deal with some strange bugs occurring because they run the paralleled jobs.

For this tutorial, I want to show the structure of a simple and efficient web crawler.

First of all, we need a scheduler, who can paralleled the job. Because the most of the time is on the requesting.  I use the  [gevent](http://www.gevent.org/) to schedule the jobs. Gevent uses the [libevent](http://libevent.org/) as its underlying library, which combines the multithreading and event-based techniques to parallel the job.

There is the sample code:

```python
import gevent
from gevent import Greenlet
from gevent import monkey
from selenium import webdriver
monkey.patch_socket()
class WebCrawler:
    def __init__(self,urls=[],num_worker = 1):
        self.url_queue = Queue()
        self.num_worker = num_worker
    def worker(self,pid):
        driver = self.initializeAnImegaDisabledDriver()  #initilize the webdirver
#TODO catch the exception
        while not self.url_queue.empty():
            url = self.url_queue.get()
            self.driver.get(url)
            elem = self.driver.find_elements_by_xpath("//script | //iframe | //img") # get such element from webpage
    def run(self):
        jobs = [gevent.spawn(self.worker,i) for i in xrange(self.num_worker)]
```
  
The next part is the headless browser part. I use the phantomjs with `--webdriver=4444 --disk-cache=true --ignore-ssl-errors=true --load-images=false --max-disk-cache-size=100000`. You can get the detailed option from their documents.

Phantomjs uses selenium webdriver as front-end to handle the request. However phantomjs is using the webkit and QT as its underlying browser and controller. It has memory leak bugs therefore the phantomjs will consume ton of memory and it only can use one core of your CPU but you can deploy many instances of the phantomjs on different ports. I wrote a daemon process to monitor the memory and its situation but later I realize I can use Perl script to get the status of process and when it exceeds the limits like 1G memory and send kill signal to the process.

To speed up the crawler, I choose to use static browser to verify the website first because the website is bad written, there might be deadlock occurring so just skip them.
