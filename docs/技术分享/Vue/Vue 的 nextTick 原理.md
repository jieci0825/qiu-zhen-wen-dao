---
title: Vue 的 nextTick 原理
---

# Vue 的 nextTick 原理

**nextTick 是等待下一次 DOM 更新循环后执行回调**。

Vue 在数据变化时，不会立即更新 DOM，而是将**更新操作 推入一个队列（queue）**。在同一事件循环中，多次数据变化会被合并，避免频繁的 DOM 操作。待当前同步任务执行完毕后，Vue 会异步刷新这个队列。这一策略导致我们对数据的修改不会立刻体现在DOM上，此时如果想要获取更新后的DOM状态，就需要使用nextTick。

开发时，一般有两个场景我们会用到 nextTick：
- created 中想要获取 DOM 时
- 响应式数据变化后获取 DOM 更新后的状态，比如希望获取列表更新后的高度


nextTick 之所以能够看到 DOM 更新后的结果，是因为在 Vue 内部，组件的更新其实就是依赖于一个 effect，只要 effect 依赖的数据发生了变化，就会重新执行，而这个 effect 其实是开启了调度器的，因此后续所有的依赖数据更新而导致的派发更新，都是合并为一次，而这一次更新在一开始就加入了一个为队列中，后续调用 nextTick 本质也是把一个回调函数加入了微队列中，因此 update 执行之后就会执行我们通过 nextTick 传入的 callback，即微任务队列的顺序为 [update（flushSchedulerQueue）, 用户回调]。

例如：
```js
// 修改数据，触发 Watcher 更新
this.message = "updated";
// 用户回调推入队列
this.$nextTick(() => {
  console.log("DOM 已更新！");
});
```

1. message 变化触发 flushSchedulerQueue 推入 callbacks。
2. 用户回调推入 callbacks，队列顺序为 [flushSchedulerQueue, 用户回调]。
3. 异步执行时，先更新 DOM，再执行用户回调。


