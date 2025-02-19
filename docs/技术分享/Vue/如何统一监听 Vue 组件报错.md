---
title: 如何统一监听 Vue 组件报错
---

# 如何统一监听 Vue 组件报错

在 Vue 3 中，可以通过 全局错误处理器 （`errorHandler`） 和 生命周期钩子（例如 `onErrorCaptured` ）来统一监听和处理组件中的错误。

- **通过全局错误处理器** `app.config.errorHandler`
    ```js
    import { createApp } from 'vue'
    const app = createApp(App)
    // 设置全局错误处理器
    app.config.errorHandler = (err, instance, info) => {
        console.error('捕获到组件错误: ', err)
        console.log('发生错误的组件实例: ', instance)
        console.log('错误信息: ', info)
    }

    app.mount('#app')
    ```

- **局部错误捕获**（`onErrorCaptured`）：onErrorCaptured 钩子可以捕获后代组件传递过程中的错误信息
    ```vue
    <script setup>
    import { onErrorCaptured } from 'vue'

    onErrorCaptured((err, instance, info) => {
        console.error('局部捕获到错误: ', err)
        console.log('错误来源组件: ', instance)
        console.log('错误信息: ', info)

        // 这个钩子可以通过返回 false 来阻止错误继续向上传递。
        return false // 如果需要让错误冒泡到全局，省略或返回 true
    })
    </script>
    ```