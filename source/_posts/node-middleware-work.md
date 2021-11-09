---
title: "Node中间层实操"
tags:
  - node
  - 中间层
category:
  - 工作
index_img: /img/chrome.webp
banner_img: /img/banner8.webp
description: 记一次工作所遇到的node中间层经历
keywords:
  - node 中间层
date: 2021-10-28 14:01:32
---
## 记一次node中间层实操经历

#### 1.需求
&nbsp;&nbsp;工作的时候遇到了这样一个需求，对于已经开发完毕的系统，增加图片预览功能。
> 图片是根据页面中某一文本生成的，并且是需要在另一个服务器所运行的系统中才可以将文本转换为图片，想做到在当前系统中预览图片就要进行跨系统的请求（两个系统后台都是由python编写），这样我首先想到的就是使用node来做中间层的衔接。这样可以不用动后端就可以实现功能。

#### 2.流程
![node middleware](/img/node-middleware.jpg)

#### 3.问题
当前端设置了```withCredentials : true```时，后端响应头不可将 **Access-Control-Allow-Origin** 的值设置为 * 。
withCredentials : true这个属性决定着前端是否可以发送cookie凭证信息。
>解决：后端响应头 **Access-Control-Allow-Origin** 返回具体的请求服务器ip

#### 4.解决代码
``` 
const http = require('http');
const Request = require('request');

http.createServer((request, response) => {
    response.writeHead(200, {
        'content-type': "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers":"X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept",
    })
    let data = '';
    let result = '';
    request.on('data',(chunk)=>{
        data += chunk
    })
    request.on('end',()=>{
        Request.post({
            form:{'text':data},
            url:'*******',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Connection':'keep-alive',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
              },
        },(err,res) => {
            const reg = *****;
            result = res.headers.location.match(reg)[0];
            response.end(result);
        })
    })
}).listen(9000) 
```
> 思路：request获取要转换的字符串，全部获取完成之后去调用另一个服务器的接口将返回数据正则处理后返回前端

