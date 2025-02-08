---
title: Vue 组件的通信方式都有哪些？
---

# Vue 组件的通信方式都有哪些？

## 父子组件通信

### Props / $emit

**父 → 子**：通过 `props` 传递数据，如下：
:::code-group
```vue [Vue2.vue]
<!-- 父组件 -->
<ChildComponent :message="parentMessage" />

<!-- 子组件 -->
<script>
export default {
    props: ['message']
}
</script>
```

```vue [Vue3.vue]
<!-- 父组件 -->
<ChildComponent :message="parentMessage" />

<!-- 子组件 -->
<script setup>
const props = defineProps(['message'])

console.log(props.message)
</script>
```
:::

**子 → 父**：子组件通过 `$emit` 触发事件，父组件通过 `@eventName` 监听，如下：
:::code-group
```vue [Vue2.vue]
<!-- 子组件 -->
<button @click="$emit('update', data)">提交</button>

<!-- 父组件 -->
<ChildComponent @update="handleUpdate" />
```

```vue [Vue3-声明触发的事件.vue]
<!-- 子组件 -->
<script setup>
const emit = defineEmits(['submit'])

function buttonClick() {
  emit('submit')
}
</script>

<!-- 父组件 -->
<ChildComponent @submit="handleSubmit" />
```
:::

### ref 直接访问
父组件通过 ref 直接调用子组件的方法或访问数据，如下：
:::code-group
```vue [Vue2.vue]
<!-- 父组件 -->
<ChildComponent ref="child" />
<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.child.childMethod();
    }
  }
}
</script>

```

```vue [Vue3.vue]
<!-- 子组件 -->
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
    a,
    b
})
</script>

<!-- 父组件 -->
<script setup>
import ChildComponent from 'ChildComponent.vue'
import { onMounted, ref } from 'vue'

const childRef = ref()

onMounted(() => {
    console.log(childRef.value.a)
})
</script>

<ChildComponent ref="childRef" />
```
:::

### $parent / $children
通过 $parent 访问父组件实例，$children 访问子组件实例（不推荐，耦合性高）

## 兄弟组件通信
### 事件总线（Event Bus）
此法在 Vue2 中一般使用一个空的 Vue 实例作为中央事件总线；Vue3 一般使用其他第三方库实现（如：mitt）。但是这个方法一般不推荐使用。

### 共享状态
一般表示使用 Vuex 或者 Pinia

## 跨层级组件通信

### Provide / Inject

祖先组件通过 provide 提供数据，后代组件通过 inject 注入，如下：

:::code-group

```js [Vue2.vue]
// 祖先组件
export default {
    provide() {
        return { theme: this.theme };
    }
}

// 后代组件
export default {
    inject: ['theme']
}
```

```vue [Vue3.vue]
// 祖先组件
<script setup>
import { provide } from 'vue'

const a = 1

provide('key',{a})
</script>

// 后代组件
<script setup>
import { inject } from 'vue'

const data = inject('key')
</script>
```
:::


### 共享状态
一般表示使用 Vuex 或者 Pinia

## 其他方式

### $attrs 和 $listeners
$attrs：接收父组件传递的非 props 属性。

$listeners：接收父组件的事件监听（Vue2）。

```vue
<!-- 父组件 -->
<ChildComponent @click="handleClick" :title="title" />

<!-- 子组件透传 -->
<GrandChild v-bind="$attrs" v-on="$listeners" />
```

### 浏览器存储
使用 **localStorage** 或 **sessionStorage** 临时共享数据。
