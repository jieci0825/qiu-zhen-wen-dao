---
title: 枚举 enum 是什么？有什么使用场景？
---

# 枚举 enum 是什么？有什么使用场景？
enum 枚举，一般用于表示有限的一些选项，例如使用 enum 定义 4 个方向
```ts
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}
```

使用时，我们可以获取某一个方向，用于展示或存储。这样代码更具有可读性和维护行。
```typescript
const d = Direction.Up
```