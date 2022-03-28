---
title: "How to obtain iOS application logs without Mac"
date: "2020-07-22"
coverImage: "Log.png"
author: "Tanvi Jain"
tags: ["Logs","ios","xcode","iPhone","troubleshoot","Mac"]
---

Logs are very helpful in finding the root cause of the issues you may be experiencing in an app. It is an efficient way to resolve issues by knowing the exact reason after checking Logs.

Let's say we have developed an iOS app. As in many situations, we want to test our app on another's phone for many reasons. And probably that phone cannot be connected to the Mac. So, the console logs of the app can be sent directly from the app to the developer(us).

This blog will provide step-by-step instructions for mailing iOS app logs directly from the app. 

### Getting started

Here we are having a [project](https://github.com/tanvijn/TestLogs/tree/master) with a single ViewController. We may ask our users to install the app on their device, use it and at the end click on “Press for Logs” Button. By clicking IBAction pressForLogs function will get called which will open MailComposer and then the user can mail the Log file to us.

### Steps to do in your own project 

- Find AppDelegate.swift in your project. Define following var and function as global before any import statement.

```java
public var logFilePath:String!
 
//======================//
func print(_ items: Any..., separator: String = " ", terminator: String = "\n") {
    let output = items.map { "*\($0)"}.joined(separator: " ")
    //Swift.print(output, terminator: terminator)
    NSLog(output)
}
```
 Above function override any log calls in the app.

- Then define the following method in AppDelegate.Swift file. And call from `  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool function.`

```swift
func printTheDataAtLogFile() {
    logFilePath = NSTemporaryDirectory().appending(String.init(format: "%@.log",Bundle.main.object(forInfoDictionaryKey: "CFBundleName") as! String)) as String
       freopen((logFilePath as NSString).cString(using: String.Encoding(rawValue: String.Encoding.ascii.rawValue).rawValue)!, "a+", stderr)
   }
```
Above function will write all logs into a file instead of console.

- Open Viewcontroller.swift. Define below 2 functions in it. 
```swift
 func allOptions() {
    let alert = UIAlertController(title: "Please Select an Option", message: nil, preferredStyle: .actionSheet)
    
    alert.addAction(UIAlertAction(title: "Log Mail", style: .default , handler:{ (UIAlertAction)in
        self.shareDocument(documentPath: logFilePath)
    }))
    
    alert.addAction(UIAlertAction(title: "dismis", style: .cancel, handler:{ (UIAlertAction)in
        print("User click Dismiss button")
    }))
    
    self.present(alert, animated: true, completion: {
        print("completion block")
    })
  }
 
  //  ============================= //
 
    // this is to share file //
  func shareDocument(documentPath: String) {
    if FileManager.default.fileExists(atPath: documentPath){
      let fileURL = URL(fileURLWithPath: documentPath)
      let activityViewController: UIActivityViewController = UIActivityViewController(activityItems: [fileURL], applicationActivities: nil)
      activityViewController.popoverPresentationController?.sourceView=self.view
      present(activityViewController, animated: true, completion: nil)
    }
    else {
      print("Document was not found")
    }
  }
 ```
Call `allOptions()` from IBAction pressForLogs. Above functions will open ActivityViewContrrolle to let the user mail log file to you.

#### Voila!! :)

Thanks for visiting us! We hope you find this knowledge base useful! Our mission is to make mobile app development happy. We hope we’re living up to the mission with your project.

Please write to us for suggestions and for the contents we should come up with!

Thanks for reading the blog. For detailed information and execution example of this blog, please refer to the video below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/KTnFtIvoDiI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

