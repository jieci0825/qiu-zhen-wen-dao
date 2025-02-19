---
title: 数组 Array 和元组 Tuple 的区别是什么
---

# 数组 Array 和元组 Tuple 的区别是什么

数组元素只能有一种类型，元祖元素可以有多种类型。
```ts
// 数组，两种定义方式
const list1: number[] = [1, 2, 3]
const list2: Array<string> = ['a', 'b', 'c']

// 元组
let x: [string, number] = ['x', 10]
```