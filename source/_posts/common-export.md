---
title: CommonJS模块化
tags:
  - 前端
  - 模块化
category:
  - 技术
index_img: /img/common-show.webp
banner_img: /img/banner8.webp
description: 代码分析commonjs模块化
keywords:
  - 模块化
abbrlink: 3288907459
date: 2021-08-26 16:50:20
---

### 一、CommonJS导出方式


```c
//方式一：
exports.a = "a"
exports.b = function(){
	console.log("b函数")
}
//方式二：
module.exports = {
	a:"a",
	b:function(){
		console.log("b函数")
	}
}
```
两种导出方式为何都可以得到同样的结果？exports 和 module.exports 是一样的吗？


### 二、JS解析时的代码

#### 1.解析过程
<font color=#999AAA >代码如下：



```c
//首先把js文件中的代码放到立即执行函数中执行
(function(module){
	module.exports = {};//对module.exports赋值空对象
	let exports = module.exports;//二者引用值相同
	//方式一：
	//exports.a = "a"
	//exports.b = function(){
	//	console.log("b函数")
	//}
	//方式二：
	module.exports = {
		a:"a",
		b:function(){
		console.log("b函数")
		}
	}
	//在函数的最后会返回值
	return module.exports;
})()
```

#### 2.验证代码正确性

<font color=#999AAA >代码如下：



```c
//先对exports下的属性进行赋值，再对module.exports进行重新赋值，检查结果如何
exports.a = "a"
exports.b = function(){
	console.log("b函数")
}
module.exports = {}
```


在另一个js页面引入以上代码，会发现导入的结果为 { }，可以验证代码正确
#### 切记：exports中存放的是导出对象的引用地址，若以exports来进行导出操作不可直接赋值！应以exports.xxx的形式进行导出操作


