---
title: "Node中间件实操"
tags:
  - node
  - 中间件
category:
  - 工作
index_img: /img/chrome.webp
banner_img: /img/banner8.webp
description: 记一次工作所遇到的node中间件经历
keywords:
  - node 中间件
date: 2021-10-28 14:01:32
---
## 记一次node中间件实操经历

#### 1.需求
&nbsp;&nbsp;工作的时候遇到了这样一个需求，对于已经开发完毕的系统，增加图片预览功能。
> 图片是根据页面中某一文本生成的，并且是需要在另一个服务器所运行的系统中才可以将文本转换为图片，想做到在当前系统中预览图片就要进行跨系统的请求（两个系统后台都是由python编写），这样我首先想到的就是使用node来做中间层的衔接。这样可以不用动后端就可以实现功能。

#### 2.流程
![node middleware](/img/node-middleware.jpg)

#### 3.问题
当前端设置了```withCredentials : true```时，后端响应头不可将Access-Control-Allow-Origin的值不能为*。
withCredentials : true这个属性决定着前端是否可以发送cookie凭证信息。
解决此问题的两种方式：
>后端对

