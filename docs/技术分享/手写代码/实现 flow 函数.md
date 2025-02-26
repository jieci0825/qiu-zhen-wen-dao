---
title: 实现 flow 函数
---

# 实现 flow 函数
flow 函数接收一个数组 funcs，这个数组的数组项是函数，flow 函数会按照数组项的顺序依次执行，下一个函数的接受的参数就是上一个函数的返回值，调用 flow 会返回一个函数，这个函数的参数是 funcs 第一项函数的接收的参数，返回值是 funcs 最后一项函数的返回值。


```js
function flow(funcs) {
    // 边界判断
    if (!Array.isArray(funcs)) {
        console.warn('参数必须是一个数组')
        return () => {}
    }

    const filterCount = funcs.filter(item => typeof item === 'function').length
    if (filterCount !== funcs.length) {
        console.warn('数组中的每一项都必须是函数')
        return () => {}
    }

    return (...args) => {
        // reduce 不传递初始值，会将数组第一项作为初始值，所以第一项是函数，进行单独处理
        return funcs.reduce((acc, cur, idx) => {
            return cur(idx === 1 ? acc(...args) : acc)
        })
    }
}

function add(a, b) {
    return a + b
}

function double(c) {
    return c * 2
}

function decrease(d) {
    return --d
}

const funcs = [add, double, decrease]
const f = flow(funcs)
console.log(f(3, 2))
```