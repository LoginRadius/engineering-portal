---
title: Different ways to send an email with Golang
date: "2020-08-03"
coverImage: "email_cover.jpg"
author: "Puneet Singh"
tags: ["Go","Email"]
description: "In this blog, we’ll look at different methods to send an email with Go, First we will explore inbuilt **smtp package**, then we will move to use a popular package **Gomail** and finally we will send **HTML emails** using custom templates."
---

## Before You Get Started
This tutorial assumes you have:

*   A basic understanding of Go Language
*   Latest GoLang version installed on your system
*   A few minutes of your time.

In this blog, we’ll look at different methods to send an email with Go, First, we will explore inbuilt **[smtp package](https://golang.org/pkg/net/smtp/)**, then we will move to use a popular package **[Gomail](https://github.com/go-gomail/gomail)** and finally, we will send **HTML emails** using custom templates.

## Package smtp

**smtp** is an inbuilt package provided with Golang. It implements the Simple Mail Transfer Protocol and has multiple functionalities related to it. Here to send the email we will be using only two functions **PlainAuth** and *SendMail* from the package.

 - **PlainAuth**: It uses the given username and password to authenticate to host and return an identity

 - **SendMail**: It connects to the server at address, switches to TLS if possible, authenticates with the optional mechanism an if possible, and then sends an email to the sender.

Below is the complete code to send a plain text email with smtp package in golang.


```go
package main

import (
  "fmt"
  "net/smtp"
)

func main() {

  // Sender data.
  from := "from@gmail.com"
  password := "<Email Password>"

  // Receiver email address.
  to := []string{
    "sender@example.com",
  }

  // smtp server configuration.
  smtpHost := "smtp.gmail.com"
  smtpPort := "587"

  // Message.
  message := []byte("This is a test email message.")
  
  // Authentication.
  auth := smtp.PlainAuth("", from, password, smtpHost)
  
  // Sending email.
  err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, message)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println("Email Sent Successfully!")
}
```
> In the above code example we have used smtp details of a Gmail account, you should update the smtp detail according to your email provider.

> Just to explain things easily, In the above snippet, we have written all the smtp and email credentials in the main function, Though in a production app you should always use env variables for configurations. You can check [Viper](https://github.com/spf13/viper) to manage configurations in production apps.

## Package Gomail

Below is the complete code to send a plain text email with Gomail package in golang.

```go
package main

import (
  "crypto/tls"
  "fmt"

  gomail "gopkg.in/mail.v2"
)

func main() {
  m := gomail.NewMessage()

  // Set E-Mail sender
  m.SetHeader("From", "from@gmail.com")

  // Set E-Mail receivers
  m.SetHeader("To", "to@example.com")

  // Set E-Mail subject
  m.SetHeader("Subject", "Gomail test subject")

  // Set E-Mail body. You can set plain text or html with text/html
  m.SetBody("text/plain", "This is Gomail test body")

  // Settings for SMTP server
  d := gomail.NewDialer("smtp.gmail.com", 587, "from@gmail.com", "<email_password>")

  // This is only needed when SSL/TLS certificate is not valid on server.
  // In production this should be set to false.
  d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

  // Now send E-Mail
  if err := d.DialAndSend(m); err != nil {
    fmt.Println(err)
    panic(err)
  }

  return
}
```

## Custom HTML Templates

Now, let's send an HTML email with smtp package, for this, we need to create two files in the root folder.

 - main.go: go code to parse HTML template and send it in email
 - template.html : HTML template for emails

```html
<!-- template.html -->
<!DOCTYPE html>
<html>
<body>
    <h3>Name:</h3><span>{{.Name}}</span><br/><br/>
    <h3>Email:</h3><span>{{.Message}}</span><br/>
</body>
</html>
```

We are using [text/template](https://golang.org/pkg/text/template/) package to parse HTML files and use it in smtp SendMail function.

```go
package main

import (
  "bytes"
  "fmt"
  "net/smtp"
  "text/template"
)

func main() {

  // Sender data.
  from := "from@gmail.com"
  password := "<Email Password>"

  // Receiver email address.
  to := []string{
    "sender@example.com",
  }

  // smtp server configuration.
  smtpHost := "smtp.gmail.com"
  smtpPort := "587"

  // Authentication.
  auth := smtp.PlainAuth("", from, password, smtpHost)

  t, _ := template.ParseFiles("template.html")

  var body bytes.Buffer

  mimeHeaders := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
  body.Write([]byte(fmt.Sprintf("Subject: This is a test subject \n%s\n\n", mimeHeaders)))

  t.Execute(&body, struct {
    Name    string
    Message string
  }{
    Name:    "Puneet Singh",
    Message: "This is a test message in a HTML template",
  })

  // Sending email.
  err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, body.Bytes())
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println("Email Sent!")
}
```
Once done you need to run below command to send the emails

```
go run main.go
```

> If you don't want to create your custom HTML emails, [Hermes](https://github.com/matcornic/hermes) is a package that generates clean, responsive HTML e-mails for sending transactional e-mails.

Now you can send beautiful emails to the customer by your golang application, You can found the complete code used in this blog on our [Github Repo](https://github.com/LoginRadius/engineering-blog-samples/tree/master/GoLang/DifferentWaysToSendEmail)