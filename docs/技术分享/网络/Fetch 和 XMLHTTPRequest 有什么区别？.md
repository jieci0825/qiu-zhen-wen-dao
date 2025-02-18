---
title: Fetch 和 XMLHTTPRequest 有什么区别？
---

# Fetch 和 XMLHTTPRequest 有什么区别？

**语法和使用**
- Fetch 基于 Promise，代码更简洁优雅
- XHR 使用回调函数，容易产生回调地狱
- Fetch 的 API 设计更简单现代
- XHR 的 API 设计较老，使用相对复杂

**功能特性**
- Fetch 默认不发送 cookies，需要配置 credentials
- XHR 默认发送 cookies
- Fetch 不能监听上传进度
- XHR 可以监听上传和下载进度
- Fetch 不能直接取消请求（需要 AbortController）
- XHR 可以通过 abort() 直接取消请求

**错误处理**
- Fetch 只有网络错误才会 reject，HTTP 错误码不会导致 reject
- XHR 可以处理所有类型的错误，包括 HTTP 错误码

**浏览器支持**
- Fetch 是现代浏览器标准 API
- XHR 有更好的浏览器兼容性，包括旧版本