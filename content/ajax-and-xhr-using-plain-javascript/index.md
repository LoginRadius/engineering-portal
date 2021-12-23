---
title: "Ajax and XHR using plain JS"
date: "2020-09-22"
coverImage: "index.png"
author: "Apeksha Gupta"
tags: ["XHR", "JavaScript", "AJAX"]
description: "Learn the concept of AJAX and XHR in JavaScript, the benefits of AJAX, and how easy it is to implement the AJAX into our web application."
type: "async"
---

## What are Ajax and XHR?

**Ajax** stands for Asynchronous Javascript and XML. Ajax is a programming technique that allows us to create dynamic, complex, and asynchronous web applications. Ajax allows us to send and receive data from the webserver asynchronously without interfering with the current state or behavior of the web page or application.

**XHR** is the XMLHttpRequest Object which interacts with the server. Ajax technique in the nutshell leverages the XHR request to send and receive data from the webserver. This object is provided by the browser’s javascript environment. It transfers the data between the web browser and server.

![Ajax Call](ajax.png)

#### Key technologies for incorporating AJAX -

- HTML DOM(document object model)
- JSON/XML
- XMLHttpRequest
- Javascript

### Why AJAX- benefits of AJAX

Dynamic content modification of web page: Using Ajax reloading of a web page is not required. The content of a web page can be modified dynamically by calling the XHR request in the background and changing the content using DOM Modification.

### Sending an XHR request

To send and receive data from the server and implement the Ajax simple steps are explained below:

- Create a XMLHttpRequest object.
- Send the request to retrieve data from the server.
- Receive the response and display information to the end-user.

#### Create a XMLHttpRequest object :

```JavaScript
var xhrobj = new XMLHttpRequest();
```

#### Send the request :

```JavaScript
xhrobj.open('GET','example.com/get');
xhrobj.send();
```

|                                                |                                                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| open(method, url[, async[, user[, password]]]) | It initializes the request.                                                                 |
| `method`                                       | request type such as GET,POST etc                                                           |
| `url`                                          | Request URL                                                                                 |
| `Async`                                        | true or false                                                                               |
| `user`                                         | Username for basic authentication                                                           |
| `password`                                     | Password for basic authentication                                                           |
| send(body)                                     | It sends the request to the server body : it is optional to send body of data with request. |

In case of sending POST request :

```JavaScript
  xhrobj.open("POST", 'example.com/post', true);
  xhrobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhrobj.send("username=john");
```

|                                  |                                          |
| -------------------------------- | ---------------------------------------- |
| `setRequestHeader(header,value)` | It sets the header for the HTTP request. |
| `header`                         | name of header parameter                 |
| `Value`                          | value of the parameter                   |

#### Receiving the response :

On completion of the request, the server sends the response to the request.

```JavaScript
xhrobj.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("response").innerHTML = xhrobj.responseText;
  }
}
```

|                                   |                                                                            |
| --------------------------------- | -------------------------------------------------------------------------- |
| `onreadystatechange = callback()` | It is a EventHandler called when the readyState attribute changes.         |
| `readyState` attribute            | It is an attribute that returns the current state of XMLHttpRequest object |
| `status` attribute                | It is an attribute that returns the status code to the HTTP XHR request.   |
| `responseText` attribute          | It is an attribute that returns the DOMstring response as the text.        |

### Conclusion

Implementing the Ajax technique by using the XHR in javascript instead of going with using other javascript library functions like jQuery.ajax has advantages as well. For example, it gives you the freedom to embed your application or script with other applications or platform even if the particular library is not used by other applications. Thus it also helps in code reusability.
