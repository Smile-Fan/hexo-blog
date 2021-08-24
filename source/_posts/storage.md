---
title: Cookie及本地化存储
tags:
  - 前端
  - 本地化存储
category:
  - 技术
index_img: /img/cookie.webp
banner_img: /img/banner8.jpeg
description: cookie的作用，cookie是怎么来的
keywords:
  - 本地化存储，cookie
abbrlink: 560223145
date: 2021-07-29 13:20:32
---

### 什么是Cookie？
Cookie是储存在客户端内的纯文本文件。
### 为什么要用Cookie？
这个就要从http协议说起，http协议在请求的时候是独立的，所以就会出现一个问题：当一个项目不同用户通过同一个路径进行http请求时，就会出现服务器端无法分辨用户信息的情况。
这个时候Cookie笑着走来了，他说：我可以解决这个问题
解决方式：
在客户端向服务器端进行第一次请求的时候，服务器端就会在响应中夹杂上这个玩意（set-cookie），客户端接到数据后，会将cookie保存至本地，在下一次进行http请求时会将cookie携带进请求中一块发给服务器，服务器收到响应后会进行检验，一看这不是我刚刚发的cookie那小子嘛，然后就可以区分出请求用户的身份。
具体流程图如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/a1abd2c2924d405e8a6647da98334b5f.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDAyMTk3MA==,size_16,color_FFFFFF,t_70)
cookie有以下几个特性：
1. cookie不可跨域（一级域名与二级域名可以）
2. cookie有数量和大小限制（数量50约个，大小约4kb），超出限制自动删除（删除哪个还得看浏览器大哥脸色）
3. cookie只能保存在浏览器里
4. cookie存储时间灵活
5. 存储是以键值对进行存储（键唯一，重复的键覆盖）

cookie让用户很没有安全感：
1. 穿梭于客户端与浏览器端这种“高危地带”，最容易被不法分子盯上，特别容易被抓（捕获）
2. 可偏偏cookie又是很怕事，被不法分子劫持也只能帮助他们冒充成真正用户发送请求
3. flash和cookie这俩难兄难弟以前被不法分子利用的多了，名声搞臭了（具体自行百度，了解即可），flash被谷歌大哥踢出了群聊，下一个就轮到cookie了

## 本地化存储策略
localStorage:
1. 存储客户端信息，无需请求服务器。
2. 数据永久保存，除非用户手动清理客户端缓存。
3. 开发者可自行封装一个方法，设置失效时间。
4. 大小5mb左右

sessionStorage:
1. 存储客户端信息，无需请求服务器。
2. 数据保存在当前会话，刷新页面数据不会被清除，结束会话（关闭浏览器、关闭页面、跳转页面）数据失效。
3. 大小5mb左右 
