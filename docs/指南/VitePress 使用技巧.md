# VitePress 使用技巧

> 这是一个测试 md

## 代码块
### 行号高亮
**输入**
~~~sh
```js{2,3}
const a = 1;
const b = 2; 
const c = a + b; // [!code ++]

console.log(c) // [!code --]
```
~~~
**输出**
```js{2,3}
const a = 1;
const b = 2; 
const c = a + b; // [!code ++]

console.log(c) // [!code --]
```

### 聚焦
**输入**
~~~md
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```
~~~
**输出**
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

## GitHub 风格的警报
**输入**
~~~md
::: info 信息
强调用户在快速浏览文档时也不应忽略的重要信息。
:::

::: tip 提示
有助于用户更顺利达成目标的建议性信息。
:::

::: warning 警告
因为可能存在风险，所以需要用户立即关注的关键内容
:::

::: danger 危险
行为可能带来的负面影响。
:::

::: details 详情
这是一段代码
```js
console.log('hello world')
```
:::
~~~
**输出**
::: info 信息
强调用户在快速浏览文档时也不应忽略的重要信息。
:::

::: tip 提示
有助于用户更顺利达成目标的建议性信息。
:::

::: warning 警告
因为可能存在风险，所以需要用户立即关注的关键内容
:::

::: danger 危险
行为可能带来的负面影响。
:::

::: details 详情
这是一段代码
```js
console.log('hello world')
```
:::

## 代码组
**输入**
~~~md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```
:::
~~~
**输出**
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```
:::