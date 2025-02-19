---
title: unknown 和 any 区别
---

# unknown 和 any 区别

unknown 是更安全的 any ，如下代码：
```ts
const a: any = 'x'
a.toString() // 不报错

const b: unknown = 'y'
// b.toString() // 报错
;(b as string).toString() // 不报错
```