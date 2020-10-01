---
title: HTML Email Concept
date: "2020-10-01"
coverImage: "email_picture.png"
author: "Nivedita Singh"
tags: ["html","email"]
description: "If you choose to code your HTML email by hand-code, there are many different things needs to use during creating HTML email"
---
When you create an email using a drag-and-drop or module-based tool, you're actually generating an HTML email.
HTML emails are easy to spot -- most of the styled, multimedia marketing emails in your inbox are HTML emails.

As we know so many tools are for rendering email, for desktop like AOL, Outlook and Thunderbird and web-based email services like Google, Hotmail and Yahoo! Mail. If you thought it was hard to ensure the cross-browser compatibility, be aware that this is a whole new game – each of these email software tools can display the same email in very different ways.

HTML emails are easy to spot -- most of the styled, multimedia marketing emails in your inbox are HTML emails.

**How to Create an HTML Email**

There's good news if you aren't an HTML expert: most tools that create and send email (like HubSpot) will offer pre-formatted, ready-to-go HTML templates that enable you to design emails without ever needing to access the actual code on the back-end.

As you make changes in the email editor, those changes will be automatically coded into the final product. Email building tools like this are an ideal option if you don't have an email designer on your team, but you still want to send professional-looking marketing emails. You can check out our complete list of email newsletter tools right here to find one that's right for your specific needs.

If you're comfortable with HTML and want more direct control over the code of your emails, most email tools will allow you to import HTML files directly for use as custom email templates. There are a wide variety of free HTML email templates available on the web (some of which we'll share below), and if you know your way around an HTML file, it's usually quite straightforward to adapt the template to the email building tool of your choice.

To create an HTML email completely from scratch, you'll need to have an advanced knowledge of HTML (or work with a developer who does). This guide offers a solid overview of coding a basic HTML email. Because the process of creating an HTML email from scratch can be quite involved, we recommend working with a developer or using a pre-made HTML email template.

**Developing an HTML email specifically for HubSpot?**

If you're developing an HTML email template specifically for use in HubSpot, you'll want to make sure you include the required HubL tokens (these ensure your emails can be customized and are compliant with CAN-SPAM laws). You can find a complete guide to coding HubSpot-specific HTML email templates here. Or alternatively, just use our simple what-you-see-is-what-you-get email editor.

**If you choose to code your HTML email by hand-code, there are following things needs to use during creating HTML email:**

1. Emails should be 600-700 max width.
2. Use basic, cross-platform font such Arial, Verdana, Georgia and Times New Roman.
3. Avoid the use of flash and JavaScript if design has animation then use .gif animated file.
4. Needs to use HTML tables to control the design layout and some presentation.
5. Needs to use inline CSS to control elements within your email such as background colors and fonts.
6. CSS style declarations needs to below the body tag, not before the </head> tags.
7. Do not use CSS shorthand code – Instead of using the shorthand style font: 12px/16px Arial, Helvetica, you needs to break this shorthand into individual properties like: font-family, font-size, and line-height.
8. Use “display: block” for every image tag for removing the gaps under images in Yahoo!, Hotmail and Gmail.
9. Use six digit hexadecimal code for color “#000000”, don’t use “#000” it may not work for all email client.
10. Use spacer image for spacing between column and row to maintain the cross-browser compatibility.
11. Needs to use “line-height and font-size” 1pixel under “<TD>” where you place the space images to maintain the same spacing under Outlook2013.
12. Need to use inline style for the text in each “<TD>” or other tags where the content is available.
13. Need to use Absolute images.
14. Must declare the cellpadding=”0” and cellspacing=”0” in main table tag.

**How to Create Email Template files for Outlook?**

1. Composing and email in outlook.
2. Add Recipients Email addresses, Subject and add the Newsletter in main body text.
3. Now in file menu click Save AS.
4. From Save As type list select Outlook Template (.otf) and give the template appropriate name then click the save on appropriate location.
5. When you open any time this template by double click it will show saved Newsletter with all specific detail which we have provided at the time of Save As then we can send this template to any other recipients by edit the previous recipients.

**You can check HTML Email Template here:**

https://github.com/designmodo/html-email-templates