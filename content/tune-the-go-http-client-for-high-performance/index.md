---
title: Tune The Go HTTP Client For High-Performance
date: "2021-01-08"
coverImage: "index.jpg"
author: "Mayank Agarwal"
tags: ["Golang", "http", "performance"]
description: "Tune your HTTP client to make production ready with high performance."
---
# Tune The Go HTTP Client For High-Performance

## Overview

HTTP(hypertext transfer protocol) is a communication protocol that transfers data between client and server. HTTP requests are very essential to access resources from the same or remote server. In Golang, net Http package comes with the default settings that we need to adjust according to our requirement for high performance.

While working on the Golang projects, I came to know that improper configuration of HTTP may can crash your server anytime.

In the time when I was working with HTTP Client, Observed some problems and there solutions, listed below:

### Problem:1 Default Http Client

The HTTP client does not contain the request timeout setting by default.
If you are using http.Get(URL) or &Client{} that uses the http.DefaultClient. DefaultClient has not timeout setting, it comes with `no timeout`

If the Rest API where you are making the request is broken not sending the response back that keeps the connection open. More request came, open connection count will increase, So will increase the server resources utilization, that will result in crashing you server when resource limits being reached.

### Solution: Don't use the default HTTP client, always specify the timeout in http.Client according to your use case
```
var httpClient = &http.Client{
  Timeout: time.Second * 10,
}
```

For the Rest API, it is recommended that timeout should not more than 10 seconds.
If the Requested resource is not responded to in 10 seconds, the HTTP connection will be canceled with net/http: request canceled (Client.Timeout exceeded ...) error.


### Problem:2 Default Http Transport
By default, the Golang Http client performs the connection pooling. When the request completes that connection remains open until the idle connection timeout(default is 90 seconds),  so if another request came, that uses the same established connection instead of creating a new connection, after the idle connection time, the connection will return to the pool.

By using the connection pooling, it will keep less connection open and more requests will be served with minimal server resources

When we not defined transport in the http.Client, it uses the default transport [Go HTTP Transport](https://golang.org/src/net/http/transport.go)

Default configuration of the HTTP Transport, 

```
var DefaultTransport RoundTripper = &Transport{
	...
	MaxIdleConns:          100,
	IdleConnTimeout:       90 * time.Second,
	...
}

const DefaultMaxIdleConnsPerHost = 2
```

MaxIdleConns is the connection pool size, this is the maximum connection that can be open, its default value is 100 connection

There is problem with the default setting `DefaultMaxIdleConnsPerHost` with value of 2 connection, 
DefaultMaxIdleConnsPerHost is the number of connection can be allowed to open per host basic
Means for any particular host out of 100 connection from the  Connection pool only 2 connection will be allocated to that host.

With the more request came, it will process only 2 requests, other request will wait for the connection to communicate with the host server and go in the `TIME_WAIT` state, As more request came, increase the connection to the `TIME_WAIT` state and increase the server resource utilization, at the limit, the server will crash

### Solution: Don't use Default Transport and increase MaxIdleConnsPerHost

```
t := http.DefaultTransport.(*http.Transport).Clone()
t.MaxIdleConns = 100
t.MaxConnsPerHost = 100
t.MaxIdleConnsPerHost = 100
	
httpClient = &http.Client{
  Timeout:   10 * time.Second,
  Transport: t,
}
```

By increasing connection per host and the total number of idle connection, this will increase the performance and serve more request with minimal server resources.

Connection pool size and connection per host count can be increased as per server resources and requirements.

## Conclusion
In this article, we discussed the problems around the 'net/http' client default configurations. By changing some of the default settings of HTTP Client, we can achieve a High-performance HTTP client for production use.