---
title: HTTP 请求跨域时为何要发送 options 请求？
---

# HTTP 请求跨域时为何要发送 options 请求？

> OPTIONS 请求是 CORS 预检请求(Preflight Request)，用于检查实际请求是否可以安全地发送。

**触发条件**：
- 使用非简单请求方法：除 GET、POST、HEAD 之外的方法。
- 使用非简单请求头：除 Accept、Accept-Language、Content-Language、Content-Type 之外的请求头。
- Content-Type 不是以下之一：
    - application/x-www-form-urlencoded。
    - multipart/form-data。
    - text/plain。

**工作流程**：
1. 浏览器发送 OPTIONS 预检请求，包含：
- Origin：请求来源。
- Access-Control-Request-Method：实际请求使用的方法。
- Access-Control-Request-Headers：实际请求使用的请求头。

2. 服务器响应预检请求，返回：
- Access-Control-Allow-Origin：允许的源。
- Access-Control-Allow-Methods：允许的方法。
- Access-Control-Allow-Headers：允许的请求头。
- Access-Control-Max-Age：预检请求的缓存时间。

3. 如果预检通过，浏览器才会发送实际请求。

**优化建议**：
- 尽可能使用简单请求，避免触发预检。
- 合理设置 Access-Control-Max-Age 缓存预检结果。
- 服务端正确配置 CORS 响应头。

## 扩展 - 简单请求和预检请求
**简单请求**
> 文档地址：https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests

我们简单说一下什么样的请求可以划分为简单请求：
- 请求方法必须是 GET、 POST、 HEAD三者之一。
- 头部字段满足 CORS 安全规范，详情可以从 w3c 官网了解一下，当然，浏览器自带的默认头部字段都是符合安全规范的，只要开发者不改动和新增，都不会违反。
- 如果头部携带了 Content-type 字段，必须是下面三种值之一。
- text/plain：一般表示文本。
- multipart/form-data：一般表示文件。
- application/x-www-form-urlencoded：窗体数据被编码为名称/值对，这是标准的编码格式，不过现在很少使用了。

通常情况下，只要遵守这三条，都是简单请求，下面我们看一下预检请求。

**预检请求(preflight)**，只要不是简单请求，都是预检请求。