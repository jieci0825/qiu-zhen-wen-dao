---
title: type 和 interface
---

# type 和 interface

在使用 ts 进行开发的时候，我们经常会用到 `type` 和 `interface`，它们都可以用来定义类型，那应该用哪一个呢？这常常让我们感到困惑。

## 相同点
1. 都能描述一个对象结构
2. 都允许拓展（extends）
3. 都能被 class 实现
```ts
// 接口
interface User {
    name: string
    age: number
    getName: () => string
}

// 自定义类型
type UserType = {
    name: string
    age: number
    getName: () => string
}

// class UserClass implements User {
class UserClass implements UserType {
    name = 'x'
    age = 20
    getName() {
        return this.name
    }
}
```

## 不同点
1. type 可以声明基础类型
2. type 可以被 `typeof` 赋值
3. type 有联合类型和交差类型
```ts
// type 基础类型
type name = string
type list = Array<string>

// type 联合类型
type info = string | number

type T1 = { name: string }
type T2 = { age: number }
// interface T2 { age: number  } // 联合，还可以是 interface ，乱吧...
type T3 = T1 | T2
const a: T3 = { name: 'x' }
type T4 = T1 & T2
const b: T4 = { age: 20, name: 'x' }

// typeof 获取
type T5 = typeof b

//【补充】还有个 keyof ，它和 typeof 完全不同，它是获取 key 类型的
type K1 = keyof T5
const k: K1 = 'name'
```

## 如何选择
在社区中，一般的使用习惯是：能用 interface 的地方就用 interface，用不了再考虑用 type。

如果想深究的话，可以点击 [type 与 interface 的区别](https://mp.weixin.qq.com/s/Fn7c5a63PAhXwUCAZVyYjQ) 进行阅读。