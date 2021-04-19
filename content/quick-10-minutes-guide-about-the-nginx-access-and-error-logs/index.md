---
title: "Nginx - Everything you want to know about the Nginx logs in 10 minutes"
date: "2021-04-20"
coverImage: "quick-10-minutes-guide-about-the-nginx-access-and-error-logs.png"
author: "Vijay Singh Shekhawat"
tags: ["Nginx", "Logs","Access Log", "Error Log"]
---

NGINX is an open-source web server and application server that helps you build a faster, scalable, secure, and reliable service. It comes with some features like load balancing, reverses proxy, caching, HTTP, and mail servers. Some advanced features like high performance and strong security make it a valued asset for your infrastructure.

Nginx HTTP server has a highly customizable and outstanding logging facility. Nginx writes the information in the different severity levels `debug`, `info`, `notice`, `warn`, `error`, `alert`, and `emerg` to the logs. By default, the Nginx access log is located at `/var/log/nginx/access.log` and the error log is located at `/var/log/nginx/error.log`. Nginx logs file default path depends on the operating system and installation. You can override the default settings and change the format of logged messages by editing the NGINX configuration file `/etc/nginx/nginx.conf` .

In this article, I will explain everything about the Nginx logs.


## What is the purpose of the access log?

The NGINX logs all client requests just after the request is processed in the access logs. In access logs, You will see the files are accessed, how NGINX responded to a request, which browser a client is using, client IP addresses, and more in this section. The information from the access log can be used to evaluate traffic and monitor site use over time. If a user is submitting any suspicious requests, we can monitor using the access logs, and it helps us identify the application security vulnerabilities.

## What is the purpose of the error log?

Whenever NGINX encounters any problems, it will log them in the error log. It might possible an error in the configuration file, NGINX is not starting or has unexpectedly stopped or NGINX encounters any problems or if any error is coming from the upstream connection or connection time etc. it will log them in the error log. 

These issues are categorized as `debug`, `info`, `notice`, `warn`, `error`. The default error log level is `error` and it is works globally. By default error log is located at `logs/error.log`. The error log directive overrides the setting inherited from the higher levels and can be defined at the `http`, `stream`, `server`, and `location` levels.

## How configure the Nginx access log?

The Nginx Requests are logged in the context of a location where processing ends. It may be different from the original location. which could be found in either the `HTTP` or `server` or `location` sections. The syntax of the `access_log` directive is

```javascript
Syntax:	access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]];
access_log off;
Default:	
access_log logs/access.log combined;
Context:	http, server, location, if in location, limit_except
```
By default, Nginx logs access log predefined `combined` format. We can overwrite access log formatting as per the requirement. 

The following examples define the log format that extends the predefined `combined` format with the value indicating the ratio of gzip compression of the response. 

```javascript
http {
    log_format compression '$remote_addr - $remote_user [$time_local] '
                           '"$request" $status $body_bytes_sent '
                           '"$http_referer" "$http_user_agent" "$gzip_ratio"';

    server {
        gzip on;
        access_log /spool/logs/nginx-access.log compression;
        ...
    }
}
```


## How set up the Nginx error log?

The `error_log` directive sets up error logging to `file` or `stderr`, or `Syslog` by specifying the minimum severity level of error messages to be logged. The syntax of the `error_log` directive is

```javascript
error_log /path/to/log_file log_level;
```

Example
```javascript
error_log /var/log/nginx/error_log warn; 

```

This will instruct Nginx to log all messages of type warn and more severe log-level crit, alert, and emerg messages.

## Custom format in nginx log ?

The ```combined log``` format is the default log format for storing all transactions in the access log. You can create your custom log format and then specifying the name of the custom format in the access log directive; you can override the default behavior.

Nginx Default access log configuration

```javascript
http {
    server {
         /path/to/log_file/nginx-access.log combined;
        ...
    }
}
``` 


Another example of the log format enables tracking different time values between NGINX and an upstream server that may help to diagnose a problem if your website experiences slowdowns. You can use the following variables to log the indicated time values:

In the first example, I m showing how we can track or log user agent, upstream server response time, request refer host, user Ip address, etc.

```javascript
http {

    log_format custom_log_format '$remote_addr - $remote_user [$time_local] '
                           '"$request" $status $body_bytes_sent '
                           '"$http_host" "$upstream_response_time"'
                            '"$http_referer" "$http_user_agent"';
    
    access_log /spool/logs/nginx-access.log custom_log_format;
....................

}

```

In the second example, I m showing how we can track or log request query string parameters in the Nginx logs.

```javascript
http {

    log_format custom_log_format '$remote_addr - $remote_user [$time_local] '
                           '"$request" $status $body_bytes_sent '
                           '"$http_host" "$upstream_response_time"'
                            '"$http_referer" "$http_user_agent" clientId="$clientid"';

    access_log /spool/logs/nginx-access.log custom_log_format;
....................

}

```

I m logging clientid query string request parameter in the Nginx logs. 

You can get all embedded Nginx variables or detail from here - 
[Nginx Http Upstream Module](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#var_upstream_connect_time)
[Nginx Http Core Module](http://nginx.org/en/docs/http/ngx_http_core_module.html)



## How to do conditional logging in the Nginx log?

Sometimes You may want to log specific requests. Conditional logging is used to do this in the Nginx.

Suppose you want to exclude 200 status responses from the logs.

```javascript
map $status $log_not_enable_for_200_status {
        ~^200  0;
        default 1;
    }

server {
    # Other directives here...

    access_log /var/log/nginx/nginx-access.log combined if=$log_not_enable_for_200_status;
}
```

Suppose you don't want to log an internal Ip address request.

```javascript
map $remote_addr $log_not_enable_for_internal_ip {
    "192.168.0.168" 0;
    "192.168.0.169" 0;
    "192.168.0.170" 0;
    default 1;
}

server {
    # Other directives here...

    access_log /var/log/nginx/nginx-access.log combined if=$log_not_enable_for_internal_ip;
}
```

## Logging to Syslog ?

If you already have unified server logs or if a regular Syslog framework evaluates your logs, you can redirect your NGINX ```access_log``` or ```error_log``` using the Syslog utility. The Syslog utility is a machine message logging standard that allows several devices to send log messages to a single Syslog server.  

We can set Syslog location in the Nginx logs configuration using the ``` server =```. It may be a domain name, an IP address, or a UNIX-domain socket path.

```javascript
error_log  syslog:server=unix:/var/log/nginx.sock debug;
access_log syslog:server=[2001:db8::1]:1234,facility=local7,tag=nginx,severity=info;

```

You can get more information about the Nginx Syslog [click here] (https://nginx.org/en/docs/syslog.html)

