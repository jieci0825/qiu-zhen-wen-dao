---
title: Ajax Fetch Axios 三者有什么区别？
---

# Ajax Fetch Axios 三者有什么区别？

Ajax、Fetch 和 Axios 都是用于**发送 HTTP 请求的技术**，但有以下区别：

Ajax (Asynchronous JavaScript and XML)

- 是一种**技术统称**，不是具体的 API
- 最常用的实现是 XMLHttpRequest (XHR)
- 写法比较繁琐，需要手动处理各种状态
- 回调地狱问题
- 不支持 Promise

**Fetch**
- 浏览器原生 API
- 基于 Promise
- 更简洁的写法
- 不需要额外引入
- 只对网络请求报错，对 400、500 都当做成功的请求
- 默认不带 cookie
- 不支持请求超时控制
- 不支持请求取消
- 不支持请求进度监控

**Axios**
- 第三方库，需要额外引入
- 基于 Promise
- 支持浏览器和 Node.js
- 请求/响应拦截器
- 自动转换 JSON 数据
- 客户端支持防止 XSRF
- 支持请求取消
- 支持请求超时控制
- 支持请求进度监控
- 支持并发请求
- 自动转换请求和响应数据

**使用建议**
- 如果是简单的请求，使用 Fetch 即可
- 如果需要更多功能，建议使用 Axios
- 现代项目中已经很少直接使用 XMLHttpRequest

