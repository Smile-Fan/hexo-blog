---
title: 三栏布局
tags:
  - 前端
  - CSS
category:
  - 技术
index_img: /img/css.webp
banner_img: /img/banner8.webp
keywords:
  - Css
  - 布局
abbrlink: 335058367
date: 2021-08-26 11:13:20
description:
---
>条件：左右200px固定，中间自适应

1. flex
```
<style>
.box{
    display:flex;
}
.left,.right{
    width:200px;
    background-color:green;
}
.center{
    flex:1;
    background-color:red;
}
</style>
<body>
    <div class="box">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div>
</body>
```
2. float
```
<style>
.left{
    float:left;
    width:200px;
    background-color:green;
}
.right{
    float:right;
    width:200px;
    background-color:yellow;
}
.center{
    background-color:red;
}
</style>
<body>
    <div class="box">
        <div class="left"></div>
        <div class="right"></div>
        <div class="center"></div>
    </div>
</body>
```
3. position
```
<style>
.box{
    position:relative;
}
.left{
    position:absolute;
    width:200px;
    left:0;
    background-color:green;
}
.right{
    position:absolute;
    width:200px;
    right:0;
    background-color:yellow;
}
.center{
    position:absolute;
    right:200px;
    left:200px;
    background-color:red;
}
</style>
<body>
    <div calss="box">
        <div calss="left"></div>
        <div class="right"></div>
        <div class="center"></div>
    </div>
</body>
```
4. table
```
<style>
    .box {
        height: 200px;
        display: table;
        width: 100%;
    }

    .box>div {
        display: table-cell;
        height: 200px;
    }

    .left {
        width: 200px;
        background-color: green;
    }

    .right {
        width: 200px;
        background-color: yellow;
    }

    .center {
        background-color: red;
    }
</style>

<body>
    <div class="box">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div>
</body>
```
5. grid
```
<style>
    .box {
        height: 200px;
        display: grid;
        grid-template-columns: 200px auto 200px;
    }

    .box>div {
        height: 200px;
    }

    .left {
        background-color: green;
    }

    .right {
        background-color: yellow;
    }

    .center {
        background-color: red;
    }
</style>

<body>
    <div class="box">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
    </div>
</body>
```

### 总结
最常用的是flex兼容性也可以，float兼容性好脱离文档流需要清除浮动，position脱离文档流，table比较老兼容性好，自我感觉感觉操作很受束缚，grid新型的布局方式兼容性不好（类似于UI框架的栅格布局）