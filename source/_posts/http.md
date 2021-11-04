---
title: 详解HTTP
tags:
  - 前端
  - 网络
category:
  - 技术
index_img: /img/httpsTitle.webp
banner_img: /img/banner8.webp
keywords:
  - http
  - 网络
abbrlink: 2012094548
date: 2021-08-30 11:13:20
description: 详解http协议，分析各部分的功能
---

### HTTP的特点
1. 无连接，无连接的含义是每次连接只处理一个请求，服务端响应完客户端的请求并得到客户端的应答之后就会断开连接（后来通过长连接的方式，但是又出现了队头阻塞问题）。
2. 无状态，无状态表示协议对于事务的处理是没有记忆的，所以就会出现没办法接着上一次的请求进行时间的处理，这样就会加大数据传输的量，这种情况导致了cookie的出现
3. 媒体独立，只要客户端和服务器知道如何处理数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型。

### 请求报文

#### 请求行
包括三个字段，**请求方法**、**URL**、**HTTP版本号**
##### 请求方法
1. get 获取资源
get请求获取已被URI识别的资源
2. post 传输实体
传输实体信息交由后端处理，一般用于表单提交
3. put 更新数据
4. head 请求数据但是服务器不返回响应体
5. delete 删除资源
6. options 预检请求
options因为同源策略而诞生，当浏览器跨域请求资源的时候，服务器是可以给予响应的，只是在数据返回到浏览器时才会被判断为跨域被浏览器所拦截并报错，但是请求已经在服务器得到了反馈，若是请求是修改服务器数据，那么也是可以修改的，这就导致了客户端与服务端数据不一致的情况出现，options是在请求之前先去访问一下服务器是否允许跨域，若不允许则下面的请求也不会进行，有效保证了数据的一致性。
7. connect 要求用隧道协议连接代理
8. trace 追踪 请求-响应 的路径

##### URL
协议+ 域名 + 路径 + 端口号 + 锚点
https:// + www.smileblog.top + /index + :443 + #id

##### 版本号
http1.0、http1.1、http2.0、http3.0

>http1.0
    - 缓存：expires、if-modifed-since
    - 三种请求方法：get、post、head

>http1.1
    - 缓存：Cache-Control，Entity tag，If-Unmodified-Since, If-Match, If-None-Match
    - 多种请求方法：put、patch、options、delete、trace、connect
    - 支持长连接：keep-alive
    - 管道机制在一个连接中同时发送多个请求
    - 分块响应传输大文件：range

>http2.0
    - 使用二进制协议
    - 多路复用
    - 头部压缩
    - 服务端推送
    - 解决应用层堵塞问题

>http3.0
    - 使用udp代替tcp
    - 使用拥塞控制算法解决tcp队头阻塞问题
    - 快速握手
    - tls1.3加密功能
#### 头部

#### 实体

