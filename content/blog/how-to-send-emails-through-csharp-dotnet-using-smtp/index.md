---
title: "How to send emails in C#/.NET using SMTP"
date: "2020-11-19"
coverImage: "coverimage.jpg"
author: "Hemant Manwani"
description: " In this article, we will learn how to send emails in .NET/C# using SMTP"
tags: [".NET","C#","SMTP"]
---
## Introduction
 
Hello Everyone, In this article, we will learn how to send emails in .NET/C# using SMTP. As sometimes, it is required to send emails to the users of the application. Email communication is considered a good way to communicate with the users of the application. There are different ways to send emails in .NET, but here we will talk about SMTP.
 
## What is SMTP?
 
SMTP stands for Simple Mail Transfer Protocol. It is a communication protocol for electronic mail transmission. Mail servers and other message transfer agents use SMTP to send and receive mail messages. The Key Features of SMTP are it is considered a reliable server for sending emails, and it delivers the email more easily and quickly as it is developed from a simple platform.
 
## Prerequisites
* Basic knowledge about the C#/.NET and it's application IDE
 
## Let's start
In the implementation part, we will first create a .NET Core class library, and then we will use that library in the .NET Core console app.
 
**Step 1** - Create a .NET Core Console App project in IDE.
 
**Step 2** - Add a .NET Core class library in the created solution.
 
**Step 3** - Create a new class file in the class library and name it as MailArguments.cs. Add the arguments fields in this file, which will be used in sending the email.
 
```c#
 public string MailTo { get; set; }
 public string Bcc { get; set; }
 public string Name { get; set; }
 public string Subject { get; set; }
 public string Message { get; set; }
 public string SmtpHost { get; set; }
 public string Password { get; set; }
 public int Port { get; set; }
 public string MailFrom { get; set; }
```
 
**Step 4** - Create a new class file in the class library; name it ExtensionMethods.cs. Here we will add the extension methods, which will be helpful to put the validation while sending the emails.
 
```c#
 public static bool IsNotNullOrEmpty<T>(this IEnumerable<T> value)
 {
     return value != null && value.Any(); // This will return true if the value is not null and not empty
 }
 public static bool IsNotNullOrEmptyOrWhiteSpace(this string value)
 {
     return !(string.IsNullOrEmpty(value) || string.IsNullOrWhiteSpace(value)); // This will return true if the string value is not null, not empty and not contains any white space
 }
 public static bool IsNotNull(this object value)
 {
     return value != null; // This will return true if the object value is not null
 }
```
Resolve missing references.
 
**Step 5** - Create a new static class file in the class library name it as Mail.cs. In this class add a static method with try and catch block.
```c#
 public static Tuple<bool, string> SendEMail(MailArguments mailArgs, List<Attachment> attachments, bool isSsl, Dictionary<string, string> headers){
 try{

 }
 catch (Exception ex){
     var msg = ex.Message;
     return Tuple.Create(false, msg);
 }
 }
```
Resolve missing references.
 
In this method, we are returning the Tuple<bool, string> which returns the status of the email sent and a message from the method in case of failure and success.
 
**Step 7** - Add below lines of code which will help create the NetworkCredentials for SMTP in the created method SendEmail.
 
```c#
 var networkCredential = new NetworkCredential
 {
     Password = mailArgs.Password,
     UserName = mailArgs.MailFrom
 };
```
Here we are using NetworkCredential class to set the UserName and Password.
 
**Step 8** - Add below lines of code, which will be used to initiate a message, subject, and IsBodyHtml.
 
```c#
 var mailMsg = new MailMessage
 {
     Body = mailArgs.Message,
     Subject = mailArgs.Subject,
     IsBodyHtml = true // This indicates that message body contains the HTML part as well.
 };
 mailMsg.To.Add(mailArgs.MailTo);
```
* IsBodyHtml Indicates the message body contains the HTML part or not. If it’s true means, the HTML body contains in the message body.
 
**Step 9** - Add the below lines of code to check and add the Headers, BCC, and Attachments. Here we have used the earlier created extension methods to add the validation.
 
```c#
 if (headers.IsNotNullOrEmpty() )
 {
     foreach (var header in headers)
     {
         mailMsg.Headers.Add(header.Key, header.Value);
     }
 }
 if (mailArgs.Bcc.IsNotNullOrEmptyOrWhiteSpace())
 {
     string[] bccIds = mailArgs.Bcc.Split(',');
     if (bccIds.IsNotNullOrEmpty())
     {
         foreach (var bcc in bccIds)
         {
             mailMsg.Bcc.Add(bcc);
         }
     }
 }
 if (attachments.IsNotNull())
 {
     foreach (var attachment in attachments)
     {
         if (attachment.IsNotNull())
         {
             mailMsg.Attachments.Add(attachment);
         }
     }
 }
```
**Step 10** - Add below the line of code to create a new email address using the From and Name fields of MailArguments class.
 
```c#
 mailMsg.From = new MailAddress(mailArgs.MailFrom, mailArgs.Name);
```
 
**Step 11** - Add below lines of code to create a new SMTP client and use the send method of that client. When the email is successfully sent then we are creating a new tuple for sending the success message with a true flag that will indicate mail is sent.
```c#
 var smtpClient = new SmtpClient(mailArgs.SmtpHost)
 {
     Port = Convert.ToInt32(mailArgs.Port),
     EnableSsl = isSsl,
     DeliveryMethod = SmtpDeliveryMethod.Network,
     UseDefaultCredentials = false,
     Credentials = networkCredential
 };
 smtpClient.Send(mailMsg);
 return Tuple.Create(true, "Email Sent Successfully.");
```
Here we are initializing the below variables for the SMTP client.
 
* Port - Port of the SMTP client.
 
* EnableSSL - SSL stands for Secure Sockets Layer. SSL is commonly used for encrypting communications over the internet.
 
* DeliveryMethod - Delivery Method are 3 types. Here we have used the Network type.
 
    * Network: The message is sent via the network to the SMTP server.
    * PickupDirectoryFromIis: The message is copied to the default mail directory of the Internet Information Services (IIS).
    * SpecifiedPickupDirectory: The message is copied to the directory specified by the property PickupDirectoryLocation.
 
* UseDefaultCredentials - true if the default credentials are used; otherwise false. Here we are not using default credentials. We are passing the credentials in the Credentials property.
 
* Credentials - The credentials which we have initialized above.
 
**Step 12** - In the Program.cs, which will be in the console app project, we will initialize and add the Mail arguments which are required to send an email.
 
**Step 13** - Before that add the reference of the class library which we have created above in your console app by doing the below steps
 
```
Right-click on the console app project->Click on Add->Click on Reference->Select the created class library project.
```
 
**Step 14** - In the main method, add the below lines to initialize the arguments. Here I am using Gmail's SMTP server port and host address.
 
```c#
 var mailArgs = new MailArguments
 {
     MailFrom = "<--From mail address from where mail should be sent-->",  
     Password = "<--From mail address password-->",  
     Name = "<--From mail address name-->",
     MailTo = "<--To mail address to where mail should be received-->", 
     Subject = "<--Subject of the email-->",                             
     Message = "<--Message body of the email can contains HTML as well-->",                                           
     Port = 587,                                                         
     SmtpHost = "smtp.gmail.com",                                                                     
     Bcc = "<--BCC email id's separated by semicolon (;)-->"             
 };
 List<Attachment> lstAttachments=new List<Attachment>
 {
     new Attachment("<--Path of the attachment-->>",MediaTypeNames.Image.Gif) //MediaType and Path of the attachment here I have selected Gif Image we have MediaTypeNames Application/Image/Text
 };

 Dictionary<string, string> dictHeaders = new Dictionary<string, string>
 {
     { "<--Key of the header-->", "<--Values of the header-->" }
 };
```
Resolve missing references.
 
You have to initialize all the variables as described above. From and Password will be the Gmail's account email id and password respectively because we are using Gmail's SMTP server.
 
In the attachment, I have used the *MediaTypeNames.Image.Gif*, which is used for Gif Images. There are different constructors for the attachment class. For reference, you can read from here- [Attachment Class](https://docs.microsoft.com/en-us/dotnet/api/system.net.mail.attachment). Attachments are not necessary to be passed. You can pass null in the SendMail method below.
 
Headers are custom headers that will be sent with the email. It is not necessary to pass these headers. You can pass null in the SendMail method below.
 
**Step 15** - Add the below line of code to call the SendMail method of the class library.
 
```c#
 Console.WriteLine(Mail.SendEMail(mailArgs, lstAttachments, true, dictHeaders).Item2);
```
 
### Note
 
Here we have used Gmail's SMTP server to send emails (From Mail Address) so we have to enable the Less Secure Apps in our from mail address account by enabling [Allow less secure apps](https://www.google.com/settings/security/lesssecureapps) else we will get the error from Gmail's SMTP server (The SMTP server requires a secure connection or the client was not authenticated. The server response was: 5.7.0 Authentication Required.)
 
## Conclusion
 
In this article, we have learned about how to How to send emails through C#/.NET using SMTP. We have used the class library to initiate in the console app to send a mail to the particular emailId.The complete code for this blog can be found at [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/DotNet/SMTPSendEmail).
