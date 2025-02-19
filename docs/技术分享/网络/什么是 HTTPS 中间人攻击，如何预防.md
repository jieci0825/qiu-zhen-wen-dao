---
title: 什么是 HTTPS 中间人攻击，如何预防
---

# 什么是 HTTPS 中间人攻击，如何预防


## 什么是 HTTPS 中间人攻击
**中间人攻击（MITM, Man-In-The-Middle）**是指攻击者拦截客户端与服务器之间的通信，获取敏感信息或篡改数据。

**攻击原理**：攻击者通过伪造证书或劫持网络流量，冒充服务器或客户端，使通信双方无法察觉中间人的存在。

## 预防措施
1. 启用 HTTPS 和强证书验证
    - 配置 TLS 并购买可信的 SSL 证书。
    - 使用 HSTS（HTTP Strict Transport Security）强制 HTTPS 访问。
2. 证书固定（Certificate Pinning）确保客户端只接受特定 CA 签发的证书。
3. 开启 CORS 配置，配置严格的跨域策略，减少不必要的网络暴露。
4. 安全头部配置
    - 设置 Content-Security-Policy 防止资源篡改。
    - 设置 Strict-Transport-Security 强制使用 HTTPS。
5. 客户端验证 通过双向 TLS（Mutual TLS）验证客户端身份。