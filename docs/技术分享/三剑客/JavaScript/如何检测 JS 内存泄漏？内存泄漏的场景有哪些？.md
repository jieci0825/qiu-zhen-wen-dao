---
title: 如何检测 JS 内存泄漏？内存泄漏的场景有哪些？
---

# 如何检测 JS 内存泄漏？内存泄漏的场景有哪些？

## 检测内存泄漏

### 使用浏览器开发者工具
- Chrome DevTools 中的 Memory 面板可以用来检测内存泄漏。可以查看 Heap Snapshot 和 Allocation instrumentation on timeline，分析对象分配、释放情况。
- Heap Snapshot：查看对象的分配情况，并通过比较不同时间点的快照来发现泄漏。
- Timeline：在页面交互过程中，查看内存的使用情况，发现持续增长的内存占用。

### 通过 performance.memory API
在支持的浏览器中，可以通过 performance.memory API 获取当前的内存使用情况（如 JS 堆内存大小），来跟踪内存的变化。
```js
console.log(window.performance.memory)
```

### 手动检测
- 通过创建和销毁对象，使用 setInterval 或 setTimeout 来检测是否有对象未被回收。
- 观察垃圾回收器是否清理不再使用的对象，如果内存不断增长，可能就是内存泄漏。

### 第三方工具
- Valgrind、Memory.js 等工具可以帮助检测内存泄漏。


## 内存泄漏的常见场景
### 全局变量
意外的全局变量会导致对象无法被回收。
```js
function test() {
    leakedVar = 'This is a global variable' // 未声明的变量成为全局变量
}
```

### 未移除的事件监听器
如果事件监听器被绑定在 DOM 元素上，但没有在元素移除后正确移除，可能导致内存泄漏。
```js
const button = document.getElementById('myButton')

button.addEventListener('click', function () {
  /* some logic */
})
// 如果没有 button.removeEventListener，按钮被移除后内存仍未释放
```

### 闭包（Closures）
闭包会保持对外部函数变量的引用，如果闭包生命周期过长，会导致外部函数的变量无法释放。
```js
function createClosure() {
  let largeObject = new Array(1000).fill('Some data')
  return function () {
    console.log(largeObject) // largeObject 被闭包引用，无法被 GC 回收
  }
}
let closure = createClosure()
```

### DOM 引用
保留对已删除 DOM 元素的引用，导致内存泄漏。
```js
let div = document.createElement('div')
document.body.appendChild(div)
// 如果没有将 div 设置为 null，垃圾回收器可能无法回收它
div = null
```

### 定时器（setInterval/setTimeout）未清除
如果定时器没有清除，仍然会占用内存。
```js
let interval = setInterval(function () {
  console.log('Running')
}, 1000)
// 如果没有 clearInterval(interval)，定时器将一直运行，导致内存泄漏
```

### Web Workers 和后台线程
如果 Web Worker 或后台线程没有正确终止，可能会导致内存泄漏。
```js
const worker = new Worker('worker.js')
// 如果没有 worker.terminate()，worker 可能导致内存泄漏
```
