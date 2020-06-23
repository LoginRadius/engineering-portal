---
title: "GUID Query Through Mongo Shell"
date: "2015-02-23"
coverImage: "mongo-db-guid.png"
author: "Govind Malviya"
tags: ["Engineering","GUID","Mongo"]
---

If you have stored a GUID through the C# driver to mongoDB and now you want to run a query by GUID, you can't query directly because mongoDB doesn't recognize GUID so when we query through mongo shell no result will be returned. To use the power of mongo shell for querying data on mongo by GUID, you should follow these steps.

**1. Convert GUID data to Base64**

Convert you GUID data to base64 , you can use any online tool for this. I use this [http://guid-convert.appspot.com/](http://guid-convert.appspot.com/)

So suppose your GUID is: 00112233-4455-6677-8899-aabbccddeeff

Then the base 64 version will be: MyIRAFVEd2aImaq7zN3u/w==

**2. Query by BinData object in mongo shell**
```
db.Users.find({"useUniqueId": new BinData(3,"MyIRAFVEd2aImaq7zN3u/w==")}).limit(1)
```
Actually BinData constructor takes 2 parameters:

New BinData(subtype,data)

- Subtype: represent subdata type like we pass 3 for UUID or GUID
- Data: base64 encoded string data

mongoDB's C# driver stores data to mongo by converting it into binary data rather than string.
