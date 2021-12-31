---
type: async
title: "Cocoapods : What It Is And How To Install?"
date: "2017-09-06"
coverImage: "cocoapods-orange-on-grey.jpg"
author: Thompson Sanjoto
tags: ["Swift","Objective-C","xcode"]
---

Cocoapod is a package dependency manager for Objective-C and Swift projects with XCode. Those Languages are used to make applications that run iOS, macOS, watchOS and tvOS. Cocoapods also acts as a coding hub to share your code with other people. That way we as a community of coders don’t have to “re-invent the wheel” to tackle problems that have already been solved.

#### Installing Cocoapods

Cocoapods is built on top of Ruby, so you would need to install that in your system before using Cocoapods.  
Then, you can install using this command:  
`sudo gem install cocoapods`

#### Using Cocoapods

Open Terminal and go to your XCode project directory.  
Afterwards, run this command:  
`pod init`

Then a Podfile is generated, configure the file, like so:  
```
platform :ios, '8.0'  
use_frameworks!  
target 'MyApp' do  
 pod 'AFNetworking', '~> 2.6'   pod 'ORStackView', '~> 3.0'  
 pod 'SwiftyJSON', '~> 2.3'
end
 ```

Where ‘MyApp’ is your application project and the ‘pod’ inside it are the libraries that you want to use! If you need to control which version of those libraries you can manipulate it on the right side of the config.

#### Updating Cocoapods

If you want to keep up to date with the codes shared in cocoapods you can run the command:  
`pod update`

That way any latest bug fixes, enhancement and features on the new version will be downloaded!  
To see which Libraries that you want to utilize, head over to [https://cocoapods.org/](https://cocoapods.org/) and search over there!

#### Personal favorites pods

Realm: [https://cocoapods.org/pods/Realm  
](https://cocoapods.org/pods/Realm)For Managing Databases in iOS application

Alamofire: [https://cocoapods.org/pods/Alamofire  
](https://cocoapods.org/pods/Alamofire)For All of your Networking Needs

Eureka: [https://github.com/xmartlabs/Eureka  
](https://github.com/xmartlabs/Eureka)For Simplified UI and Forms

And of course our:  
LoginRadiusSDK: [https://github.com/LoginRadius/ios-sdk  
](https://github.com/LoginRadius/ios-sdk)For our API Calls to Manage your Login System
