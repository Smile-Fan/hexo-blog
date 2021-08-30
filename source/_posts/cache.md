---
abbrlink: 1
---
### 浏览器缓存机制

>浏览器有两种缓存机制，强缓存和协商缓存，强缓存不需要发送http请求，检查字段是否过期Expires和Cache-Control
#### 强缓存
&emsp;&emsp;强缓存有两种表示字段分别是http1.0中的Expires和http1.1中的Cache-Control
&emsp;&emsp;Expires：内容为一个时间点，检查时间点是否过期来判断资源是否过期，他有一定的局限性因为是按照本地计算机的本地时间为依据进行判断的，当计算机本地时间不准确的时候就会出现判断误差
&emsp;&emsp;Cache-Control：可以通过这个字段里的max-age来设置过期倒计时，当资源从服务器返回并且附带这个属性设置的时候就会根据所设定的时间来判断是否使用缓存，他不只有max-age这一个属性，还存在以下几种属性：
    - public：表示浏览器服务器以及代理服务器都可以缓存数据
    - private：只有浏览器才可以缓存数据
    - no-cache：跳过强缓存，直接使用协商缓存
    - no-store：不以任何形式进行缓存
    - s-maxage：代理服务器的缓存时间
>采用Cache-Control优于Expires的方式进行判断是否使用强缓存

#### 协商缓存
&emsp;&emsp;当强缓存时间过期时，会进行协商缓存的请求，协商缓存字段为If-Modified-Since（最后修改时间）或者If-None-Match（哈希值是否一样）
&emsp;&emsp;第一次想服务器请求资源的时候，服务器的响应头会返回Last-Modified（对应If-Modified-Since）或者ETag（对应If-None-Match）
&emsp;&emsp;Last-Modified：服务器的最后资源更新的时间，当资源更新之后时间就会变化服务器进行判断是否返回资源给客户端
&emsp;&emsp;ETag：资源的hash值，服务器根据资源的内容生成一个唯一的哈希字符串，当内容变化时字符串就会改变
&emsp;&emsp;优缺点：
                - Last-Modified性能优于ETag
                - Etag精确度优于Last-Modified（Last-Modified感知单位为 秒 ，当资源一秒变化好多次的时候就无法及时的发现资源的改变）