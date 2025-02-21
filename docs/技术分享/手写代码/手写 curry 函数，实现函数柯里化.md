---
title: 手写 curry 函数，实现函数柯里化
---

# 手写 curry 函数，实现函数柯里化
:::code-group
```js [写法一.js]
function curry(fn, ...initArgs) {
    const fnArgs = fn.length

    function _curry(...args) {
        const totalArgs = args.concat(initArgs)

        if (totalArgs.length >= fnArgs) {
            return fn(...totalArgs)
        }

        return function (...newArgs) {
            return _curry(...totalArgs.concat(newArgs))
        }
    }

    return _curry
}

// 使用示例
function add(a, b, c) {
    return a + b + c
}
// case1
const curriedAdd = curry(add)
console.log(curriedAdd(10, 20, 30))
console.log(curriedAdd(1)(2)(3)) 
console.log(curriedAdd(5, 10)(15)) 
console.log(curriedAdd(100)(200, 300)) 
// case2
const curriedAdd2 = curry(add, 10)
console.log(curriedAdd2(20, 30))
console.log(curriedAdd2(10, 10))
console.log(curriedAdd2(10)(100))
console.log(curriedAdd2(50)(50))
```
```js [写法二.js]
function curry(fn, ...args) {
    const fnArgs = fn.length

    return  (...newArgs) => {
        const totalArgs = newArgs.concat(args)

        if (totalArgs.length >= fnArgs) {
            return fn(...totalArgs)
        }

        return curry.call(this, fn, ...totalArgs)
    }
}
```
:::