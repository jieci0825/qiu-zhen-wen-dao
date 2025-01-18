---
title: Vue3 中 watch相关输出
---

# Vue3 中 watch相关输出

**题目**
```js
import { watch, reactive } from 'vue'

const state = reactive({
    a: 1,
    b: 2,
    c: 3
})

watch(
    () => {
        console.log(state.a + state.b)
        return state.a + state.b
    },
    val => {
        console.log(val * 2)
    }
)

setTimeout(() => {
    state.a++
    state.b--
}, 1000)
```

**输出**
```
3  3
```

**分析**

为什么是两次 3？而且这两次 3 都是输出的 console.log(state.a + state.b) 的结果，而非是 console.log(val * 2) 的结果。

第一次输出是因为监听这个函数会先执行一次，收集依赖，所以输出 3。

而 watch 函数只有监听的数据值发生改变才会触发回调函数，这里监听的是一个函数，所以只有当这个函数的返回值发生改变才会触发回调函数。而 state.a++ he state.b-- 是改变了 a 和 b，所以会二次输出 3，但是第二次的 3 和第一次的 3 都是一样的结果，自然不会触发回调函数。所以两次结果都是 3。

至于为什么 state.a 和 state.b 都改变了，但是只触发了一次 watch 监听的函数是因为 Vue 内部进行了合并，这个合并是利用调度器实现的。关于这点可以翻看我另外两篇文章 [实现调度器](https://blog.csdn.net/qq_53109172/article/details/142958186) 和 [实现watch](https://blog.csdn.net/qq_53109172/article/details/142973468)。