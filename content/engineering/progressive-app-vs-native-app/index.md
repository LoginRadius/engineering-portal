---
title: "PWA vs Native App: Which one is Better for you?"
date: "2021-02-04"
coverImage: "index.png"
author: Nathan Nguyen
tags: ["Progressive App", "PWA", "JavaScript"]
description: "How do Native Apps compare to Progressive Web Apps, and which platform does your company use to communicate with your clients? read on!"
---

At the dawn of "smartphones" in late 2007, when Apple released the iPhone, there were native apps. Apple's app framework included a native app SDK that allows developers to take advantage of all the physical device features and topped it off with an app store that allows for distribution and monetization of the finished applications. When Google released Android in competition, they also embraced this approach with their app store and SDK, which also leveraged the entire Google platform and its services. 

Developers could tap into Google's search and maps services, as well as email, etc. Native applications served their purpose superbly and became the primo factor that propelled Android and iOS as the big two phone operating systems at the time, until the present day.

Native smartphone applications were so common that Apple coined the tagline "There is an app for that" and copyrighted it in 2009. 

However, come the 2010s. Web technologies saw increasingly rapid growth. Server-side rendered web pages allow for the creation of full-fledged web applications that could offer business values beyond static information. The responsive design movement also enhances accessibility for these web apps across all platforms. It was also during this time that mobile applications became stagnant. Your phone started to have _too_ many applications, and not all of them were equally useful. Some are thin clients to web services, which you could access using your mobile web browser instead. 

Recognizing this, Progressive Web Applications, or PWA, came in to bridge the gap between native and web applications.

## What are Progressive Web Apps (PWAs)?

First and foremost, PWAs are web applications. They run in web browsers, but also usually in webviews on smartphones. Compared to traditional websites that you would visit with a conventional web browser, progressive apps tend to be a little more low key. 

You may see one through a direct URL, but more commonly through a desktop/home screen icon on your phone, which takes you to a webview hosting the application. By extension, PWAs are now also distributed through app stores, standing alongside native apps.

The webview itself may also be without or with minimal menu bars to provide an impression close to navigating a native application. Furthermore, progressive applications usually come with some offline viewing capabilities, allowing you to interact with the app even when you are offline or in limited network availability. This is implemented using service workers that stand in between network requests and the user and handle caching as well as push notifications, providing a user experience similar to native app caching.

With that in mind, the idea behind [PWA is to create applications](/build-pwa-using-vanilla-javascript/) that would be most accessible, through the web, that also offers an experience as close to native applications as possible.

## Why Progressive App?

### Ease of development and distribution

Suppose you are a new company looking to create a mobile application for your product. If you would like to distribute your app on all major mobile platforms - namely both iOS and Android - you would then have to go through the development and distribution process for both. First off, you will need to learn the language to develop Android applications (Java, Kotlin) and then iOS (Objective-C, Swift), have the correct hardware to test and develop. 

This process will have you relearn everything about one platform on the other. Once you finish the initial product, you will have to maintain both codebases moving forward to complete this.

With a progressive app, the process becomes a lot simpler. Your application lives within a browser, and hence only needs to be supported by the browser standards. As of now, support for PWAs is available across major browsers: Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, and Firefox (for Android). 

Your language is the language of the web: JavaScript. The choice is also yours to leverage the JavaScript platform you are most familiar with, be it React, Angular, or something completely different. The JavaScript codebase will then become the only codebase you need to maintain for the app.

Alongside this, you also gain the advantage in the availability of the application. With PWA, your app will be available on the web, accessible by users across many platforms, including all mobile devices that have browser support.

### Portability

PWAs live on the web; this means you do not need to download and store many executables and assets on your device, saving you precious storage space if you are using the app on your phone. This is especially useful when the native version of the application is simply a portal to a web service, which serves to make API calls and present data based on the user data on the server only, without performing any device-specific actions. The functionality of these applications is not inhibited by the browser's sandbox and thus make for perfect PWA candidates.

### User Experience

PWAs are designed to be responsive. Even though this depends largely on the individual developer of the application, a well designed and developed PWA should, in theory, provide a consistent experience across devices. With native apps, a lot of effort will be required to ensure that the user experience is uniform across multiple platforms. And even then, certain platforms will impose their own set of requirements on the UI look-and-feel, as well as the functionality of the app.

## So, why not Progressive App?

Progressive apps are a creative solution to smooth out the differences between a native app and the web, but not necessarily replace native apps. While it inherits all the advantages and features of the web, there are still certain disadvantages that need to be considered when deciding between a progressive app or a traditional native app.

### Leveraging device-specific features

For one thing, progressive apps are designed to be uniform across devices. This means it is not the technology's focus to make use of specialized features that are available only on select devices. Its feature set will be the lowest common denominator of the range of devices that it supports. With how diverse the feature sets are on modern devices like smartphones and tablets, with high-resolution cameras or fingerprint sensors, to name a few, it would be amiss for applications not to take advantage of these features. It follows that progressive apps are not ideal for specialized workflows, while their strength is in general purpose applications.

### Browser compatibility

Compatibility is another big-ticket item. At a baseline level, PWA should be supported by all major browsers. However, platform differences still exist, where specific features are supported by one browser but not another, which will cause inconsistencies in behavior when the user switches from one device/platform to another. A prominent example of this being push notification support on iOS, which requires jumping through some hoops to make it work, as Apple does not support this directly. With that in mind, the subtle differences between browser support become a limitation similar to the difference between native app platforms itself.

### Distribution

For applications to reach the hands of the users, it needs a distribution platform. For native applications, the answer to this is straightforward: Apps are distributed through the native app store, be it Google Play Store or iOS App Store. However, for PWAs, it is more complicated. Distribution can be as simplistic as passing around the application's URL, and anyone who knows the link can access the app. This method has the added advantage due to Google and other search engines/web crawlers naturally picking up the app URL and returning it as a search result. 

However, this method is passive and requires the user to know the application beforehand. Developers might prefer the more traditional way of having the app listed in an app store, which is possible but requires them to jump through the same hoops as native applications, following all of the distributor guidelines, which removes its advantage compared to traditional apps.

## To PWA, or not to PWA

So with everything considered, should you go the route of the progressive app? We do not aim to give a concrete answer, but instead a suggestion: If your application can be made a PWA, it is a good idea to do so. At the current moment, progressive apps are an evolution of web apps. Compared to the feature set that users are already familiar with in native apps, progressive apps still trail behind. 

This means that if the scope of the application is complex enough, PWA may not provide you with enough tools to do the job. With that said, if your application can be fully implemented with the set of tools that PWA provides, then going this route may net you added benefits that are unique to progressive apps. Are progressive apps the future? It definitely has the potential, but a large part of that answer depends on whether we can leverage its platform to build productive solutions with it today.
