---
title: any void never unknown 有什么区别
---

# any void never unknown 有什么区别
- any 任意类型（不进行类型检查）
- void 没有任何类型，和 any 相反
- never 永不存在的值的类型
- unknown 未知类型（一个更安全的 any）

示例如下：
```ts
function fn(): void {} // void 一般定义函数返回值

// 返回 never 的函数，必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message)
}
function infiniteLoop(): never {
    while (true) {}
}

// unknown 比直接使用 any 更安全
const a: any = 'abc'
console.log(a.toUpperCase()) // 不会报错，但不安全

const b: unknown = 'abc'
// console.log( b.toUpperCase() ) // 会报错！！！
console.log((b as string).toUpperCase()) // 使用 as 转换类型，意思是告诉 TS 编译器：“我知道 b 的类型，我对安全负责”
```