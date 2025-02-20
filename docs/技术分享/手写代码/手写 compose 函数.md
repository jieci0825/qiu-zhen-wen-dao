---
title: 手写 compose 函数
---

# 手写 compose 函数
compose 函数是函数式编程中的一个重要概念，它将多个函数组合成一个函数，从右到左执行。

---

:::code-group
```js [正常循环: 右 → 左.js]
function compose(...fns) {
    // 边界处理
    if (!fns.length) return (...arg) => arg
    if (fns.length === 0) return fns[0]

    // 提取最后一个函数作为初始函数，因为顺序是从右到左执行
    const firstFn = fns[fns.length - 1]
    // 删除最后一个
    fns.pop()

    // 翻转数组，同理，因为顺序是从右到左执行
    fns.reverse()

    return function (...args) {
        // 执行初始函数，获取结果
        let result = firstFn(...args)

        // 依次执行剩余函数，并将结果作为参数传递给下一个函数
        for (const fn of fns) {
            result = fn(result)
        }

        return result
    }
}

const add1 = x => x + 1
const multiply2 = x => x * 2
const addThenMultiply = compose(multiply2, add1)
console.log(addThenMultiply(5)) // 12
```

```js [reduce 简化: 右 → 左.js]
function compose(...fns) {
    if (!fns.length) return (...arg) => arg
    if (fns.length === 1) return fns[0]

    // 使用 reduce 不断的叠加，reduce 在不指定初始值的时候，会默认使用数组中的第一个元素
    return fns.reduce((acc, cur) => {
        // acc 表示累加器  cur 表示当前项
        // 因为需要保证从右到左的执行顺序，所以累加的函数需要后执行
        return (...args) => {
            return acc(cur(...args))
        }
    })
}

const add1 = x => x + 1
const multiply2 = x => x * 2
const divide3 = x => x / 2
const addThenMultiply = compose(divide3, multiply2, add1)
console.log(addThenMultiply(10)) // 11
```

```js{7} [reduce 简化: 左 → 右.js]
function compose(...fns) {
    if (!fns.length) return (...arg) => arg
    if (fns.length === 1) return fns[0]

    return fns.reduce((acc, cur) => {
        return (...args) => {
            return cur(acc(...args))
        }
    })
}

const add1 = x => x + 1
const multiply2 = x => x * 2
const addThenMultiply = compose(multiply2, add1)
console.log(addThenMultiply(10)) // 21
```

```js [reduce + 支持Promise: 左 → 右.js]
function compose(...fns) {
    if (!fns.length) return (...arg) => arg
    if (fns.length === 1) return fns[0]

    return fns.reduce((acc, cur) => {
        // 支持 promise 很简单，使用 aysnc + await 语法糖
        return async (...args) => {
            // 先等待左边函数执行的结果
            const result = await acc(...args)
            // 在调用下一个，并将上一次函数的结果作为下一个函数的参数
            return cur(result)
        }
    })
}
```
:::

---

**使用场景**
:::code-group
```js [字符串格式化.js]
// 先去掉首尾的空格、转为大写、然后当单词中间的空格替换成 _、添加前缀 C_
function removeSpace(str) {
    return str.trim()
}

function toUpperCase(str) {
    return str.toUpperCase()
}

function replaceSpace(str) {
    return str.replace(/\s/g, '_')
}

function addPrefix(str) {
    return `C_${str}`
}
const fn = compose(removeSpace, toUpperCase, replaceSpace, addPrefix)
const result = fn(' Operation Type ')
console.log(result) // C_OPERATION_TYPE
```

```js [数据计算.js]
const double = x => x * 2
const addTen = x => x + 10
const square = x => x * x

const calculate = compose(double, addTen, square)
console.log(calculate(5)) // (5 * 2 + 10)² = 400
```
:::