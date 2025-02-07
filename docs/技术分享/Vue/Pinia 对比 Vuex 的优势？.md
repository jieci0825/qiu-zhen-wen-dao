---
title: Pinia对比Vuex的优势？
---

# Pinia对比Vuex的优势？

- mutation 不复存在。只有 state、getters、actions。
- actions 中支持同步和异步方法修改 state 状态。
- 与 TypeScript 一起使用具有更加可靠的类型推断和支持。
- 不再有模块嵌套，只有 Store 的概念，Store 之间可以相互调用。
- 支持插件扩展，可以非常方便的实现本地存储等功能。
- 更加轻量，压缩后体积只有 1kb 左右。