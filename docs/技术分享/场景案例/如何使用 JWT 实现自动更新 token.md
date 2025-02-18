---
title: JWT 如何自动更新 token
---

# JWT 如何自动更新 token

JWT token 自动更新主要有以下几种方案：
- 双 token 机制
- 滑动过期机制
- 无感刷新机制

## 双 token 机制

它通过使用两个 token：短期 token（Access Token）和长期 token（Refresh Token），来解决单一 token 机制的一些问题（如频繁重新登录、安全性不足等）。

使用 **Access Token** 进行用户认证和授权，其有效期较短（如 15 分钟、1小时）。


### 核心逻辑
使用 **Refresh Token** 来获取新的 Access Token，其有效期较长（如 7 天、30 天），一般存储在比较安全的地方，且不会用于资源访问，仅用于刷新 Access Token。

### 具体实现
1. 登录时生成双 token，代码体现如下：
    ```js
    const jwt = require('jsonwebtoken')

    const generateTokens = userId => {
        const accessToken = jwt.sign(
            { userId: userId },
            'access-token-secret',
            { expiresIn: '15m' } // 短期Token，15分钟过期
        )

        const refreshToken = jwt.sign(
            { userId: userId },
            'refresh-token-secret',
            { expiresIn: '7d' } // 长期Token，7天过期
        )

        return { accessToken, refreshToken }
    }
    ```
2. 验证 Access Token，代码体现如下：
    ```js
    const verifyAccessToken = (token) => {
        try {
            const decoded = jwt.verify(token, 'access-token-secret');
            return decoded;
        } catch (err) {
            return null; // Token无效或已过期
        }
    };
    ```
3. Refresh Token 没有过期，使用 Refresh Token 刷新 Access Token，代码体现如下：
    ```js
    const verifyRefreshToken = (token) => {
        try {
            const decoded = jwt.verify(token, 'refresh-token-secret');
            return decoded;
        } catch (err) {
            return null; // Token无效或已过期
        }
    };

    const refreshAccessToken = (refreshToken) => {
        const decoded = verifyRefreshToken(refreshToken);
        if (decoded) {
            // 生成新的Access Token
            const newAccessToken = jwt.sign(
                { userId: decoded.userId },
                'access-token-secret',
                { expiresIn: '15m' }
            );
            return newAccessToken;
        } else {
            return null; // Refresh Token无效或已过期
        }
    };
    ```
4. 客户端处理 Token 刷新，代码体现如下：
    ```js
    const fetchWithRefresh = async (url, options) => {
        let response = await fetch(url, options);

        if (response.status === 401) { // Access Token过期
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken) {
                // 使用新的Access Token重试请求
                options.headers['Authorization'] = `Bearer ${newAccessToken}`;
                response = await fetch(url, options);
            } else {
                // Refresh Token也过期，需要重新登录
                redirectToLogin();
            }
        }

        return response;
    };
    ```

### 优缺点
**优点**：
- 提高了安全性。
- 减少用户重新登录的频率。
- 适合分布式系统。

**缺点**：
- 需要维护两个 token，增加了复杂性。
- 需要处理 token 的存储和传输问题。
- 并发请求问题，若多个请求同时触发 Token 刷新，可能会导致生成多个 Access Token。

## 滑动过期机制

滑动过期机制（Sliding Expiration）是指当用户持续活跃时，自动延长 token 的有效期。

具体来说，每次用户使用 token 时，系统会检查 token 是否仍在有效期内，如果是，则生成一个新的 token 并延长其过期时间。

这种机制的目的是在用户持续操作时保持会话的有效性，而在用户长时间不操作时自动过期，从而提高安全性和用户体验。

### 核心逻辑
1. **token 有效期**：设置一个固定的有效期（如30分钟）。
2. **滑动窗口**：每次用户使用 token 时，检查 token 是否仍在有效期内：
    - 如果 token 有效，则生成一个新的 Token，并重新设置过期时间（如再延长30分钟）。
    - 如果 token 已过期，则要求用户重新登录。
3. **持续活跃**：只要用户在有效期内持续操作，Token 就会不断刷新，保持会话有效。

### 具体实现
1. 在服务端下发一个 token 时，可以设置一个有效期，比如 30 分钟，代码体现如下：
    ```js
    const jwt = require('jsonwebtoken');

    const generateToken = (userId) => {
        const payload = {
            userId: userId,
            exp: Math.floor(Date.now() / 1000) + 1800 // 30分钟后过期
        };
        return jwt.sign(payload, 'your-secret-key');
    };
    ```
2. 在每次请求时，验证 token 是否有效，如果 token 是**有效的且未过期**，则会重新生成一个新的 token 返回给客户端，过期时间也会重新设置。代码体现如下：
    ```js
    const verifyToken = (token) => {
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            return decoded;
        } catch (err) {
            return null; // Token无效或已过期
        }
    };

    const refreshToken = (token) => {
        const decoded = verifyToken(token);
        if (decoded) {
            // Token有效，生成新的Token
            const newToken = generateToken(decoded.userId);
            return newToken;
        } else {
            return null; // Token无效或已过期
        }
    };
    ```
3. 客户端收到每次请求收到新的 token 时，需要更新本地存储的 token，并在后续请求中使用新的 token。
4. 这一步算是**优化**，可以解决**频繁的 token 刷新**，目前的实现是每次请求都会刷新 token 的，而这种刷新频率会消费服务器的资源，增加服务器的负担，所以在服务端可以设置一个**时间窗口**，比如这个串口的时间是 15 分钟，这样只有剩余的有效期小于 15 分钟的时候，才会刷新 token，代码实现如下：
    ```js
    const shouldRefreshToken = (decodedToken) => {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;
        const timeWindow = 900; // 15分钟

        return (expirationTime - currentTime) < timeWindow;
    };

    const handleRequest = (req, res) => {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded = verifyToken(token);

        if (decoded) {
            if (shouldRefreshToken(decoded)) {
                const newToken = generateToken(decoded.userId);
                res.setHeader('Authorization', `Bearer ${newToken}`);
            }
            // 处理请求逻辑
            res.send('Request handled successfully');
        } else {
            res.status(401).send('token expired or invalid');
        }
    };
    ```

### 优缺点
**优点**
- **提高安全性**：Token的有效期较短，即使泄露，影响时间也有限。
- **提升用户体验**：用户持续操作时无需频繁重新登录。
- **灵活控制**：可以根据业务需求调整**滑动窗口**的大小。

**缺点**
- **频繁的 token 刷新**：每次用户请求时，服务器都需要验证 token 并可能生成新的 token，这会增加服务器的计算负担。
- **高并发场景**：在用户量大的系统中，频繁的 token 刷新可能导致性能瓶颈。
- **多个请求同时刷新 token**：如果多个并发请求同时触发Token刷新，可能会导致生成多个不同的Token，造成客户端和服务器的状态不一致。
- ...

## 无感刷新机制
即在用户无感知的情况下自动刷新 token 的技术，旨在提升用户体验，避免因 token 过期而导致的操作中断。

核心思想是：在 token 即将过期时，系统自动刷新 token，而用户无需手动重新登录或感知到 token 的变化。

### 核心逻辑
1. **token 过期前刷新**：
    - 在 token 即将过期时（如剩余有效期小于一定时间），自动向服务器请求新的 token。
    - 新的 token 会替换旧的 token，并继续用于后续请求。

2. **用户无感知**：
    - 刷新过程在后台完成，用户无需手动操作或感知到 token 的变化。
    - 用户的请求不会因 token 过期而中断。

3. **结合双 token 机制：**
    - 通常与双 token 机制结合使用，使用 Refresh Token 刷新 Access Token。

### 具体实现
1. 客户端需要定期检查 Access Token 的剩余有效期，并在即将过期时自动刷新 Token，代码体现如下：
    ```js
    let accessToken = '当前AccessToken';
    let refreshToken = '当前RefreshToken';

    const checkTokenExpiration = () => {
        const decodedToken = decodeAccessToken(accessToken); // 解码Token
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;
        const timeWindow = 300; // 5分钟

        if (expirationTime - currentTime < timeWindow) {
            // Token即将过期，自动刷新
            refreshAccessToken();
        }
    };

    const refreshAccessToken = async () => {
        const response = await fetch('/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            accessToken = data.accessToken; // 更新Access Token
        } else {
            // 刷新失败，跳转到登录页面
            redirectToLogin();
        }
    };

    // 定期检查Token过期
    setInterval(checkTokenExpiration, 60000); // 每分钟检查一次
    ```
2. 服务器端需要提供刷新 Token 的接口，验证 Refresh Token 并生成新的 Access Token，代码体现如下：
    ```js
    app.post('/refresh-token', (req, res) => {
        const refreshToken = req.headers['authorization'].split(' ')[1];

        try {
            const decoded = jwt.verify(refreshToken, 'refresh-token-secret');
            const newAccessToken = jwt.sign(
                { userId: decoded.userId },
                'access-token-secret',
                { expiresIn: '15m' } // 新的Access Token，15分钟过期
            );
            res.json({ accessToken: newAccessToken });
        } catch (err) {
            res.status(401).json({ error: 'Invalid or expired refresh token' });
        }
    });
    ```
### 优缺点
**优点**
- **用户体验好**：用户无需手动刷新 token，操作流畅。
- **安全性高**：即使 token 被截获，由于有效期短，影响时间有限。

**缺点**
- 基本与双 token 机制差不多。