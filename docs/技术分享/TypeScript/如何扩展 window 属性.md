---
title: 如何扩展 window 属性
---

# 如何扩展 window 属性

```ts
declare interface Window {
  test: string
}

window.test = 'aa'
console.log(window.test)
```

