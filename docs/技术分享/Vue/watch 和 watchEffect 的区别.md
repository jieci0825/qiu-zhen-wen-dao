---
title: watch 和 watchEffect 的区别
---

# watch 和 watchEffect 的区别
`watch` 和 `watchEffect` 都是 Vue 3 中用于响应式数据变化时执行副作用的 API，它们的使用场景和工作机制存在区别。

---

## 依赖追踪方式
`watch`：需要显式声明依赖，监听指定的数据源；可以监听多个数据源或进行深度监听。
```js
import { watch, reactive } from 'vue'

const state = reactive({
    count: 0,
})
watch(
    () => state.count, // 显式声明监听的依赖
    (newCount, oldCount) => {
        console.log(`新值 ${newCount} 老值 ${oldCount}`)
    }
)
```

`watchEffect`：会自动追踪 **作用域内所有的响应式依赖**，不需要显式声明依赖。
```js
import { watchEffect, reactive } from 'vue'

const state = reactive({
    count: 0,
})
watchEffect(() => {
    console.log(`Count 变化了: ${state.count}`) // 自动追踪 `state.count`
})
```

## 执行时机
`watch`：在监听的响应式数据变化后立即执行。

`watchEffect`：在 **组件挂载时** 执行一次副作用，并在 依赖发生变化时 再次执行。

## 适用场景
`watch`：适用于 **监听特定数据** 变化并执行副作用的场景，如 API 请求、保存操作等。适合需要 **访问新值和旧值** 进行比较的场景。

`watchEffect`：不需要访问旧值，适用于 **自动追踪多个响应式依赖** 的副作用，如渲染、自动保存等。