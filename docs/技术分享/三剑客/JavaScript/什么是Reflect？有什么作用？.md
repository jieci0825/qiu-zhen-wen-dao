---
title: 什么是Reflect？有什么作用？
---

# 什么是Reflect？有什么作用？
> **Reflect 可以完成对象的基本操作**

## 什么是对象的基本操作？
比如读取、修改、删除对象的属性，判断对象是否存在某个属性等等，都是对象的基本操作。例如：
```js
const obj = { a:1, b:2, c:3 }
console.log(obj.a)
obj.b = 20
Object.setPrototypeOf(obj, { d:4 })
```
这些操作无论是使用使用 [] 或者 . 这些语法来操作对象还是使用函数来操作对象，都是在直接或者间接的在完成**对象的基本操作**。
而关于对象的基本操作可以在 [ecma-262](https://ecma-international.org/publications-and-standards/standards/ecma-262/) 文档中翻阅，也可以在 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 中找到，如图：

<img src="https://cos.coderjc.cn/blog/image-20250117094959644.png" alt="image-20250117094959644" style="zoom:100%;" />

## 为什么需要 Reflect？
我们可以看一下下面这段代码：
```js
const obj = { a: 1, b: 2 }
// 添加不可枚举的键
Object.defineProperty(obj, 'c', {
    value: 3,
    enumerable: false
})
const keys = Object.keys(obj)
console.log(keys) // [ 'a', 'b' ]
```
可以看到，在这种情况下，我们是无法通过 `Object.keys()` 获取到这个 `c` 属性的，而有些时候其实我们并不需要考虑这么多，只想要拿到所有的键，那怎么拿到呢？在这之前我们不妨看一下 `Object.keys()` 的实现，如图：

![image-20250117100358577](https://cos.coderjc.cn/blog/image-20250117100358577.png)

这是最基础的三步，第一步则是将传入的参数转为 Object；第二步就是具体的实现了；第三步就是返回结果。我们现在可以去看一下第二步具体做了什么，如图：

![image-20250117100813069](https://cos.coderjc.cn/blog/image-20250117100813069.png)

步骤分析如下：
- **step1:** 就是调用对象的基本方法 `[[OwnPropertyKeys]]` 来获取一个对象自身的所有属性键(包括字符串键和 Symbol 键)
- **step2:** 类似设置一个空数组作为返回结果
- **step3:** 对元素的每个键进行遍历，然后进入一个判断，首先判断是不是一个字符串键(`tips: 通过这一步可以额外知道是不会管 Symbol 的键的，也就是说 Symbol 也不会出现在 Object.keys() 的返回结果中`)
- **step4:** 通过 `[[GetOwnProperty]]` 基本方法来获取属性描述符信息
- **step5:** 判断是否是一个可以枚举的属性，如果是则加入到返回结果中，不是则进行额外的处理

另外一个分支则是对于 value 和 key + value 的处理，相信也能联想到是什么 api。
铺垫了这么多，此时对于如何获取全部的键，其实已经很明显了，我们可以直接调用 `[[OwnPropertyKeys]]` 这个基本方法，而 Reflect 就是用来干这个的，如下：
```js
const obj = { a: 1, b: 2 }

Object.defineProperty(obj, 'c', {
    value: 3,
    enumerable: false
})

const keys = Object.keys(obj) // [!code --]
const keys = Reflect.ownKeys(obj) // [!code ++]
console.log(keys) // [ 'a', 'b', 'c' ]
```

我们还可以再来看一个例子，来进一步理解 Reflect 的作用，如下：
```js
const obj = {
    a: 1,
    b: 2,
    get c() {
        return this.a + this.b
    }
}

console.log(obj.c) // 3
```
这还是一段非常简单的代码，那有没有想过这个 this 到底是如何指向 obj 的呢？在访问一个属性时，是会触发对象的基本方法 `[[GET]]`，而这个方法其实有三个参数：
```
[[GET]](对象, 属性, 指定this)
```
而我们平常使用 [] 或者 . 这样的语法进行访问的时候，都是没有传递 this 的，这是因为内部已经默认传递了 this，即在内部间接的调用了 `[[GET]]` 方法。所以我们想显示的传递 this，就需要使用 Reflect，如下：
```js
const obj = {
    a: 1,
    b: 2,
    get c() {
        return this.a + this.b
    }
}

console.log(obj.c) // 3 // [!code --]
console.log(Reflect.get(obj, 'c', { a: 10, b: 20 })) // 30 // [!code ++]
```

而这一点在 Vue3 的响应式模块中就有很好的应用，这一点可以翻阅我这篇文章[理解 Proxy 和 Reflect](https://blog.csdn.net/qq_53109172/article/details/143025470)来了解。

:::tip 总结
而通过这些例子，无一不是表示 **Reflect 可以完成对象的基本操作**
:::