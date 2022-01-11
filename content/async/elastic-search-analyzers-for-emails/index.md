---
title: "ElasticSearch Analyzers for Emails"
date: "2015-10-15"
coverImage: "elastic-search.png"
author: "Lucius Yu"
tags: ["Elastic Search", "Analyzers"]
---

So last week while I was setting the analyzers on ElasticSearch settings for Email field, it took me some good time to find the perfect custom analyzer for my purpose, so I feel it might be useful to share this with someone who needs it.


> When a document is indexed, its individual fields are subject to the analyzing and tokenizing filters that can transform and normalize the data in the fields. For example — removing blank spaces, removing html code, stemming, removing a particular character and replacing it with another. At indexing time as well as at query time you may need to do some of the above or similiar operations. For example, you might perform a Soundex transformation (a type of phonic hashing) on a string to enable a search based upon the word and upon its 'sound-alikes'.

Let me briefly explain what I am trying to do with my Email field. The email addresses will be stored as a comma separated string with potentially multiple email addresses, and what I am expecting is after the to search to retrieve the matching results. Besides the exact match like search for `"john.doe@gmail.com"`, I also want to be able to search for `"john.doe"` or `"gmail.com"` to retrieve the relative information.

Here is the full schema for it:

   1. {"email": "john.doe@gmail.com"}
   2. {"email": "john.doe@gmail.com, john.doe@outlook.com"}
   3. {"email": "hello-john.doe@outlook.com"}
   4. {"email": "john.doe@outlook.com"}
   5. {"email": "john@yahoo.com"}

And the search schema is:  
\[Search > Response\]  
"john.doe@gmail.com" > 1,2  
"john.doe@outlook.com" > 2,4  
"john@yahoo.com" > 5  
"john.doe" > 1,2,3,4  
"john" > 1,2,3,4,5  
"gmail.com" > 1,2  
"outlook.com" > 2,3,4

If you decide to keep reading, then it means you have the same needs as I did so I hope the following solution can actually help.  
So... In the official documentation they did have a good solution but it was not easy to find, at least for me, by using regular expression:

```js
{
   "settings" : {
      "analysis" : {
         "filter" : {
            "email" : {
               "type" : "pattern_capture",
               "preserve_original" : 1,
               "patterns" : [
                  "([^@]+)",
                  "(\p{L}+)",
                  "(\d+)",
                  "@(.+)"
               ]
            }
         },
         "analyzer" : {
            "email" : {
               "tokenizer" : "uax_url_email",
               "filter" : [ "email", "lowercase",  "unique" ]
            }
         }
      }
   }
}
```

  
This setting will perfectly address the issues from above, and do not generate way to much tokens in your ES cluster.  
At the end I want to share two good gadgets that I found very helpful with ES analyzers and regular expression.

1. **Inquisitor:**  
    This Elastic Search tool allows you to quickly apply different analyzers, tokenizers and filters to your input, fork it here:  
    [https://github.com/polyfractal/elasticsearch-inquisitor](https://github.com/polyfractal/elasticsearch-inquisitor)
2. **regex 101:** 
    To quickly test out your regular expression, try this link: [https://regex101.com/](https://regex101.com/)
