---
title: 如何理解 Session ？
---

# 如何理解 Session ？

> Session 是服务器端的会话管理机制

**基本概念**
- 服务器为每个用户创建的临时会话存储空间
- 用于保存用户的会话状态
- 通过 SessionID 来识别不同用户
- SessionID 通常保存在 Cookie 中

**工作流程**
- 用户首次访问服务器时，服务器创建 Session 并生成 SessionID
- 服务器将 SessionID 通过 Cookie 发送给客户端
- 客户端后续请求会自动携带包含 SessionID 的 Cookie
- 服务器通过 SessionID 找到对应 Session 并识别用户

**特点**
- 安全性较高：敏感数据存储在服务器
- 服务器负载较大：需要存储所有用户的 Session
- 依赖 Cookie：通常需要 Cookie 来存储 SessionID
- 集群问题：需要考虑 Session 共享

**使用场景**
- 用户登录状态管理
- 购物车
- 权限验证
- 表单验证

**与 Cookie 的区别**
- 存储位置：Session 在服务器，Cookie 在客户端
- 安全性：Session 较安全，Cookie 相对不安全
- 存储容量：Session 容量较大，Cookie 通常限制 4KB
- 性能：Session 消耗服务器资源，Cookie 消耗带宽资源