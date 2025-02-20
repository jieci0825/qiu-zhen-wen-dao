---
title: 手写 new
---

# 手写 new

new 是一个关键词，所以使用函数的方式来模拟。

---

```js{9}
function myNew(constructor, ...args) {
    // 创建一个对象实例，并给这个对象重新指定原型对象
    const newInstance = Object.create(constructor.prototype)

    // 给当前函数绑定 this 并执行
    const result = constructor.apply(newInstance, args)

    // 如果 result 是一个非原始值，则返回 result，如果是一个原始值或者没有返回，则返回 newInstance
    //  - 关于返回值这部分可以查阅文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new#描述
    return typeof result === 'object' ? result : newInstance
}

function Person(name, age) {
    this.name = name
    this.age = age
}

const p = myNew(Person, '李云守', 20)
console.log(p)
```