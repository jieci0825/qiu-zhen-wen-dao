---
title: Vue3 的 Proxy 比 Vue2 的 Object.defineProperty 好在哪
---

# Vue3 的 Proxy 比 Vue2 的 Object.defineProperty 好在哪

Object.defineProperty 是针对属性的监听。而由于是针对属性的监听，所以就必须要进行深度遍历。就会有性能的损失。如下：
:::details 查看代码
```js
const obj = {
    a: 1,
    b: 2,
    c: {
        d: 4,
        e: 5
    }
}

function isObject(value) {
    return typeof value === 'object' && value !== null
}

function observe(obj) {
    for (const k in obj) {
        let v = obj[k]
        if (isObject(v)) {
            observe(v)
            continue
        }
        Object.defineProperty(obj, k, {
            get() {
                console.log('读取', k)
                return v
            },
            set(newValue) {
                console.log('修改', k)
                v = newValue
            }
        })
    }
}

// 开始监听处理，将每个属性改造为 getter 和 setter
observe(obj)
```
:::

而上述演示的 observe 是对一开始传入的对象进行的深度遍历，把每一个属性改造为了 getter 和 setter，因此 observe 函数只是对一开始传入的对象进行改造，那么后续给这个对象额外添加属性，就无法进行 getter 和 setter 的改造，就无法进行响应式处理。这就是 Vue2 无法监听属性的新增的原因。

而 Object.defineProperty 的删除也不会触发 setter。所以 Vue2 也无法监听删除属性。

而 Proxy 是监听整个对象，返回一个代理对象，所有的操作都是基于这个代理对象实现，所以不需要进行深度遍历，提升了效率，也由于是监听的是整个对象，所以是可以监听到新增和删除操作。

对比之后我们可以知道，最大的好处就算性能的提升和功能的增强。同时也不仅仅可以代理对象，还可以代理数组，不需要像 Vue2 中对数组的方法进行重写，也可以监听到数组下标的变化，这点也是 Proxy 的优势