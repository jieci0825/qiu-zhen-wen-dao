---
title: 手写 instanceof
---

# 手写 instanceof

instanceof 是一个关键词，所以不能直接重写，只能通过函数的形式来模拟。

---

```js
// 检测构造函数的原型对象(prototype)是否出现在实例对象的原型链上
function myInstanceof(obj, constructor) {
    const prototype = constructor.prototype

    let flag = false
    // 使用递归不停的向上查找原型链，如果在 obj.__proto__ === null 之前还没找到，就表示不存在
    while (obj.__proto__) {
        // obj.__proto__ 存在且不等于 prototype 时就继续查找
        // 如果相等这个构造函数的原型对象处于当前检测对象的原型链上，返回 true
        if (obj.__proto__ === prototype) {
            flag = true
            break
        } else {
            // 如果没找到则重新赋值 v，保持继续向上查找
            obj = obj.__proto__
        }
    }

    return flag
}

// 示例
function Person() {}
const person = new Person()

console.log(myInstanceof(person, Person)) // true
console.log(myInstanceof(person, Object)) // true
console.log(myInstanceof(person, Array)) // false
```

简略的原型关系如图：

![image-20250220010108971](https://cos.coderjc.cn/blog/image-20250220010108971.png)