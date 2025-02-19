---
title: ref 和 reactive 如何选择
---

# ref 和 reactive 如何选择
Vue 官方建议使用 `ref()` 作为声明响应式状态的主要，因为 reactive 存在以下局限性：

- **有限的值类型**：只能用于对象类型，而对于原始数据类型如 string、number 等就不可以

- **不能替换整个对象**：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：
    ```js
    let state = reactive({
        count: 0,
    })

    // 上面的 ({ count: 0 }) 引用将不再被追踪
    // (响应性连接已丢失！)
    state = reactive({
        count: 1,
    })
    ```
    
- **对解构操作不友好**：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：
    ```js
    const state = reactive({ count: 0 })

    // 当解构时，count 已经与 state.count 断开连接
    let { count } = state
    // 不会影响原始的 state
    count++

    // 该函数接收到的是一个普通的数字
    // 并且无法追踪 state.count 的变化
    // 我们必须传入整个对象以保持响应性
    callSomeFunction(state.count)
    ```

[reactive() 的局限性](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive)