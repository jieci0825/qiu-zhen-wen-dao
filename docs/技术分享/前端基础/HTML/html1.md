# 测试标题1

:::demo src=comps/example-test.vue
:::

:::demo
```vue
<template>
  <h1 style="color: #f40">{{ title }}</h1>
  <button>提交</button>
</template>
<script setup lang="ts">
import { ref, defineComponent } from 'vue'
const title = ref('大河之剑天上来')
</script>
```
:::

```js
const a = 1
const b = 2
const c = a + b
console.log(c)
```