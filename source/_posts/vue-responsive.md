---
title: Vue响应式原理
tags:
  - 前端
  - Vue
category:
  - 技术
index_img: /img/vue.svg
banner_img: /img/banner8.webp
description: Vue通过Observer、Dep、Watcher、Scheduling四步骤实现了数据的响应式
keywords:
  - Vue响应式原理
  - Vue
abbrlink: 824995088
date: 2021-08-30 10:30:20
---

### 前言
&emsp;&emsp;在Vue中数据的双向绑定是由四步来完成的：Observer、Dep、Watcher、Scheduling，下面我们来看一下Vue是怎么用这几个步骤实现的对应每个步骤所解决的问题是什么

### Observer
&emsp;&emsp;第一步，Vue通过内部的Observer构造器使用Object.defineProperty循环遍历每个属性，将其身上添加setter、getter方法，setter是在数据改变时触发的方法，getter则是在数据被访问时所触发的方法，Vue还考虑到我们后期的对数据的改变，例如：将obj对象身上新添加一个属性a，那么如果是普通的添加a则没有getter和setter方法。为避免这种情况，Vue给我们提供了对于对象的$set和$delete，对于数组，Vue则是在原型链上将一下几种方法进行了重写：push、pop、shift、unshift、reverse、sort、splice等。
&emsp;&emsp;至此，我们实现的功能是：数据在更新或者调用的时候会触发getter、setter两个方法，但是有一个问题就是，在调用方法时我们需要做什么事？

### Dep
&emsp;&emsp;第二步，为了解决第一步留下的问题，Vue使用了Dep，在数据的getter添加了Dep.depend方法用来做记录依赖的东西（通过第三步Watcher来配合记录），就是记录谁调用了这个属性以此来和视图进行关联，在setter中添加了Dep.notify方法，用来派发更新，意思就是在数据改变时来通知被Dep.depend所记录的东西，来更新视图。
&emsp;&emsp;至此，响应式的雏形已经具备，但是还有一个问题没有解决，Vue如何记录自己的依赖，如果依赖都没法记录第二步也就没有意义。

### Watcher
&emsp;&emsp;第三步，为了解决第二步遗留的无法记录依赖问题，Vue通过一个巧妙的方法解决，每次更新视图，我们知道是调用的render函数进行虚拟DOM的构建，Vue在调用render函数之前进行了一下处理：先生成一个watcher对象并且在全局对象上新建一个属性，将watcher对象本身赋给全局变量的这个属性，然后再通过watcher来调用render，这样在render内部的对象属性的getter就可以记录当前所调用render的watcher的值，在每次派发更新的时候通知watcher来调用render重新渲染视图
&emsp;&emsp;Vue的响应式数据到此已经完备，但是如果一个对象中有多个属性同时改变，难道还要多次执行同一个render吗？，例如：
```
obj = {
    a:1,
    b:2,
    c:3,
    d:4
}
//a、b、c、d同时被赋值改变，按照我们前面所讲的，数据改变就会派发更新，来调用对应的watcher以渲染render，难道要调用同一个render四次吗？
```
### Scheduling
&emsp;&emsp;Vue已经想到了这一点，通过调度来解决重复调用的问题，Vue在更新数据的时候不会立即执行watcher，而是通过nextTick来将所要调用的watcher放入微队列，因为同一个watcher只能放入一次微队列，以此来达到对于调度次数的限制来进行性能的优化。