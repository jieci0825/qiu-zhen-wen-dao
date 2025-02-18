---
title: 如何理解 cookie
---

# 如何理解 cookie

## 什么是 cookie

> Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据

**主要特点**
- 由服务器生成，浏览器进行存储
- 每次请求时会自动携带对应域名下的 cookie
- 可设置过期时间
- 默认情况下随着浏览器关闭而删除（会话 cookie）

**常用属性**
- name：cookie 名称
- value：cookie 值
- domain：指定 cookie 所属域名
- path：指定 cookie 所属路径
- expires/max-age：过期时间
- secure：只在 HTTPS 下传输
- httpOnly：禁止 JS 访问
- sameSite：跨站点请求限制

**使用场景**
- 会话状态管理（用户登录状态、购物车等）
- 个性化设置（用户偏好、主题等）
- 浏览器行为跟踪（分析用户行为等）

**限制**
- 大小限制：通常为 4KB
- 数量限制：每个域名下的 cookie 数量有限
- 安全性：明文传输（除非使用 HTTPS）
- 作用域：只能在所属域名下使用

## 扩展 - 为何现代浏览器都禁用第三方 cookie
> 主要原因是保护用户隐私和安全

**隐私问题**
- 第三方 Cookie 可以跨站点追踪用户行为
- 广告商可以构建用户画像和浏览历史
- 用户数据可能被未经授权收集和使用

**安全风险**
- 增加 CSRF（跨站请求伪造）攻击风险
- 可能被用于会话劫持
- 恶意网站可能滥用第三方 Cookie

**技术影响**
- Safari 和 Firefox 已默认禁用第三方 Cookie
- Chrome 计划在 2024 年完全禁用第三方 Cookie
- 替代方案：
    - First-Party Cookie
    - localStorage
    - Privacy Sandbox
    - FLoC (Federated Learning of Cohorts)