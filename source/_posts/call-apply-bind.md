---
title: 手写call、apply、bind **未完成
tags:
  - 前端
  - javascript
category:
  - 技术
index_img: /img/chrome.webp
banner_img: /img/banner8.webp
description: 手写实现一个自己的call、apply、bind，以及三者的作用
keywords:
  - call
  - apply
  - bind
abbrlink: 2556438265
date: 2021-09-01 09:30:32
---

1. call：改变this指向，接受多个参数
```
Function.prototype.myCall(obj){
    if(typeof this!== 'function'){
        throw new TypeError('Error')      // 判断调用者是否是函数，不是则抛出错误
    }
    var newObj = obj || window;           //判断是否指定了一个this指向，若没有则默认为window
    newObj.fn = this;                     // 新定义一个属性，接收要运行的函数
    var params = [...arguments].slice(1); //截掉传递的this对象，将参数列表放入params
    var result = newObj.fn(...params);    // 通过传递进来的对象调用要运行的函数，this指向就发生改变了
    delete newObj.fn;                      //删除挂载的函数
    return result;                        //返回执行结果
}
```

2. apply：改变this指向，接受参数数组

```
Function.prototype.myApply(obj){
    if(typeof this!== 'function'){
        throw new TypeError('Error')      // 判断调用者是否是函数，不是则抛出错误
    }
    var newObj = obj || window;           //判断是否指定了一个this指向，若没有则默认为window
    newObj.fn = this;                     // 新定义一个属性，接收要运行的函数
    var params = arguments[1] || []       //将参数数组放入params
    var result = newObj.fn(...params);    // 通过传递进来的对象调用要运行的函数，this指向就发生改变了
    delete newObj.fn;                      //删除挂载的函数
    return result;                        //返回执行结果
}
```
>call和apply的不同之处就在于对于参数的处理，参悟一个另一个也不攻自破

3. bind