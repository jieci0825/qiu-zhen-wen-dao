---
title: JWT 是什么
---

# JWT 是什么
> JWT (JSON Web Token) 是一种开放标准，用于在各方之间安全地传输信息

**组成部分（用 . 分隔的三部分）：**

Header（头部）：指定加密算法和令牌类型
Payload（负载）：包含声明（claims）的实际数据
Signature（签名）：对前两部分的签名，用于验证消息未被篡改

**工作流程：**
1. 用户登录成功后，服务器创建 JWT
    - 设置 Header 和 Payload
    - 使用密钥生成签名
    - 将三部分组合成 token

2. 服务器将 token 返回给客户端
    - 客户端存储在 localStorage 或 cookie 中

3. 后续请求携带 token
    - 通常放在 Authorization header
    - 格式：`Bearer <token>`

4. 服务器验证 token
    - 检查签名是否有效
    - 验证是否过期
    - 验证其他声明（claims）

**特点**：
- 无状态：服务器不需要存储会话信息
- 可扩展：负载部分可以包含自定义数据
- 跨域友好：可以在不同域名下使用
- 性能好：验证在服务端完成，不需要查询数据库

**安全考虑：**
- 不要在 payload 中存储敏感信息
- 设置合理的过期时间
- 使用 HTTPS 传输
- 妥善保管签名密钥