---
title: 介绍 Vue template 到 render 的过程
---

# 介绍 Vue template 到 render 的过程

## 解析 Template
Vue 会从组件的 template 选项开始处理：
```vue
<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>
```
Vue 需要把这个模板转换成渲染函数（render）。

## 编译阶段（Template → AST → render 生成）

### 解析（Parsing）
Vue 首先会将 template 转换成 抽象语法树（AST）：
```js
{
    tag: 'div',
    attrs: [{ name: 'id', value: 'app' }],
    children: [
        { tag: 'h1', children: [{ type: 'expression', content: 'title' }] },
        { tag: 'p', children: [{ type: 'expression', content: 'message' }] }
    ]
}
```
这个 AST 结构表示了 template 的 DOM 结构。

### 优化（Optimization）
Vue 会进行 静态节点标记，标记哪些节点是静态的（不会变），以便在后续的 patch 过程中跳过不必要的更新，提高性能。

### 代码生成（Code Generation）
Vue 会将 AST 转换为 render 函数：
```js
render = function render() {
    return _c('div', { attrs: { "id": "app" } }, [
        _c('h1', [_v(_s(title))]),
        _c('p', [_v(_s(message))])
    ]);
}
```
其中：
- _c(tag, data, children) 创建虚拟 DOM 节点（VNode）
- _v(text) 创建文本 VNode
- _s(value) 将变量转换为字符串

## 运行时渲染阶段（Render → Virtual DOM → DOM）

### 执行 render 生成 Virtual DOM
render 函数被执行后，会生成 VNode 树：
```js
{
    tag: 'div',
    data: { attrs: { id: 'app' } },
    children: [
        { tag: 'h1', children: [{ text: title }] },
        { tag: 'p', children: [{ text: message }] }
    ]
}
```

### 生成真实 DOM（patch 过程）
Vue 使用 patch 算法 将 VNode 挂载到真实 DOM：

- 遍历 VNode，创建对应的 DOM 元素。
- 设置 attributes、event listeners 等。
- 将元素插入父节点，最终渲染到页面。

### 响应式更新（数据变更 → 重新渲染）

当 data 变化时：

- 触发 响应式依赖收集，通知 Vue 更新。
- Vue 重新执行 render 生成新的 VNode 树。
- Diff 算法 比较新旧 VNode 树，计算最小变更。
- 只更新变化的部分，提高性能。

## 总结
- 编译阶段
    - 解析 template → 生成 AST
    - 优化静态节点
    - 生成 render 函数

- 运行时
    - 执行 render 生成 VNode
    - 使用 patch 渲染到真实 DOM
    - 响应式更新时，Diff 计算最小变更，更新 DOM
    
如果是 Vue JSX，编译阶段可以省略，直接写 render 方法。
