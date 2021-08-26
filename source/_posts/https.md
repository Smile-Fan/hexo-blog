---
title: HTTPS原理
tags:
  - 前端
  - 网络
category:
  - 技术
index_img: /img/httpsTitle.jpeg
banner_img: /img/banner8.webp
description: https原理解析
keywords:
  - https原理
  - 网络
abbrlink: 2870829304
date: 2021-08-26 11:13:20
---

## 简介
&emsp;&emsp;HTTPS协议是在HTTP协议的基础上加上一层SSL加密层保证了传输的安全性，想要深入了解HTTPS其实只要搞清楚SSL是什么就可以了。

## 解析
#### 密钥
密钥分为两种：对称密钥与非对称密钥
&emsp;&emsp; 对称密钥加密，又称私钥加密或会话密钥加密算法，即信息的发送方和接收方使用同一个密钥去加密和解密数据。它的最大优势是加/解密速度快，适合于对大数据量进行加密，但密钥管理困难。
&emsp;&emsp; 非对称密钥加密系统，又称公钥密钥加密。它需要使用不同的密钥来分别完成加密和解密操作，一个公开发布，即公开密钥，另一个由用户自己秘密保存，即私用密钥。信息发送者用公开密钥去加密，而信息接收者则用私用密钥去解密。公钥机制灵活，但加密和解密速度却比对称密钥加密慢得多。
#### HTTP协议的缺陷
1. 第一种情况http利用对称加密来进行数据传输

![http对称加密](/img/http对称加密.png)

&emsp;&emsp; 由图可见，当服务端第一次想将生成的对称密钥发送给客户端，利用对称密钥来进行传输加密时，中途被黑客拦截并生成了黑客自己的对称密钥发送给了客户端，而此时客户端和服务端对此都不知情，仍然正常进行数据传输，和黑客却可以从中窃取数据篡改数据为所欲为。

2. 第二种情况http同时利用对称密钥和非对称密钥加密

![http对称加非对称加密](/img/http非对称加对称加密.png)

&emsp;&emsp; 由图，服务端生成非对称密钥对，发送公钥key1给客户端，但是很不幸中途又被黑客拦截，篡改了公钥，将黑客自己的公钥key3发给了客户端，客户端生成对称密钥key5发送给服务端，但是黑客用自己的私钥key4解密出了对称密钥保存了下来并用服务端的公钥key1加密了对称密钥key5发给了服务端，后面的过程就和第一种情况一样了数据还是被篡改。
&emsp;&emsp; 至此我们可以看出，无论你加密多少层用什么加密，只要第一次的通信被拦截篡改那么整个过程都是极度危险的了，更加可怕的是服务端和客户端对此毫不知情，仍然传输着重要的数据，细思极恐😨
&emsp;&emsp; 那么怎么才可以做到安全的传输数据呢？
#### HTTPS协议的SSL加密
&emsp;&emsp; 首先我们知道的是，https是要付费的。服务器通过向世界权威发布机构购买https证书，证书中包含着服务器的公钥和域名等等，权威机构根据你的服务器信息通过自己的**私钥**加密生成一个字符串放在证书中。（权威机构的公钥是公开的，任何人都可以查得到）
&emsp;&emsp; https加密下的数据传输过程：

![https加密](/img/https加密.png)

&emsp;&emsp; 在整个过程中，黑客很难受，因为权威机构的证书是通过权威机构自己的私钥加密的，虽然可以用公钥解密查看内容但是因为黑客不知道权威机构的私钥，所以无法在篡改之后重新加密，如果用黑客自己生成的密钥加密则会与证书中的验证字符串冲突，导致验证不通过，当然在整个过程中黑客是可以捣乱的，但是失去了窃取信息篡改信息的意义，因为客户端和服务端可以终止通信。
## 总结
&emsp;&emsp; 对于HTTPS的介绍到此为止了，希望文章可以帮到大家，如有说的不对的地方还请各位大佬不吝赐教，欢迎留言讨论👏



 