---
title: 事件循环♻️
tags:
  - 前端
  - javascript
category:
  - 技术
index_img: /img/loop.webp
banner_img: /img/banner8.webp
keywords:
  - 事件循环，javascript事件循环机制，宏队列，微队列
description: 详解事件循环机制
abbrlink: 3235911
date: 2021-08-23 14:35:32
---

## 简介
&emsp;&emsp;当js代码执行的时候，会生成一个执行栈，所有的代码都是在栈中执行的，因为js语言是单线程的，所以在遇到异步事件的时候会先将异步事件挂起，继续执行同步代码，当异步事件返回数据的时候暂不执行，将其放入事件队列，等所有同步代码执行完毕再去执行事件队列中的事件，这个过程被称为事件循环。

## 详解

&emsp;&emsp;首先要明白的是，因为**js独有的单线程**，所以才会有独特的事件循环机制。js的主线程不可能同时处理两个事件，因为异步事件不能确定他什么时候完成，所以在遇到异步的时候就会将事件挂起，以免引起js加载阻塞，所有同步代码处理完毕之后，执行栈为空，js就会去查看事件队列中是否有事件没被处理，如果有则将事件放入执行栈处理，一直循环此步骤直至执行栈为空事件队列为空整个js才算执行完成。
&emsp;&emsp;事件队列分为两种，一种是宏队列，另一种是微队列，**微队列的执行优先级高于宏队列的优先级**，即当同步代码执行完毕，宏队列和微队列都有事件等待执行的时候先执行微队列中的事件。
- 微队列
    1. process.nextTick
    2. Promise
    3. Object.observer
    4. MutationObserver.
- 宏队列：除去微队列中异步事件的所有异步事件
    1. settimeout
    2. setinterval
    3. 等等.....

```
function fun1(){
    setTimeout(()=>{
        console.log('老子很帅')
    },0)
}
function fun2(){
    new Promise((resolve,reject)=>{
        resolve();
    }).then(()=>{
        console.log('你帅吗？')
    })
}
fun1();
fun2();
    //输出：你帅吗？
    //     老子很帅
```
配几张图来看看事件循环的样子
![事件循环1](/img/eventloop1.webp)
![事件循环2](/img/eventloop2.webp)

到此事件循环概念你肯定已经理解了

## 总结

我所列举的是很简单的例子，面试题笔试题也有很有难度的，但是理解清楚之后做题的时候，时刻想着或者动手画画执行顺序图就肯定不会出错
