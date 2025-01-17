---
title: JS比较大小
---

# JS比较大小

```js
console.log([1 < 2 < 3, 3 < 2 < 1])
```

**结果**
```js
console.log([true, true])
```

**分析**

首先来看 `1 < 2 < 3`
 - 1 < 2 为 true
 - true < 3 比较时因为数据类型不一致，会用 Number() 函数将 true 转换为 1，所以比较的是 1 < 3，结果为 true

再来看 `3 < 2 < 1`
 - 3 < 2 为 false
 - false < 1 比较时因为数据类型不一致，会用 Number() 函数将 false 转换为 0，所以比较的是 0 < 1，结果为 true

所以最终结果为 `[true, true]`
