---
title: 描述 Event Loop 运行机制
---

# 描述 Event Loop 运行机制

![js-eventloop.SXlbZ5Fh](https://cos.coderjc.cn/blog/js-eventloop.SXlbZ5Fh.png)

Event Loop（事件循环）是 JavaScript 处理 **异步操作** 的核心机制。它允许 JavaScript 以 **非阻塞** 的方式执行代码，即使遇到 I/O 操作（如网络请求、定时器），也不会影响主线程继续执行其他任务。

**执行流程（核心步骤）**

1. **执行同步任务**
- 所有同步任务在 调用栈（Call Stack） 中依次执行，直到调用栈清空。

2. **处理微任务**
- 检查 微任务队列（MicroTask Queue） 是否有任务（如 Promise.then()、queueMicrotask()）。
- 依次执行所有微任务，直到微任务队列清空。

3. **执行宏任务**
- 从 宏任务队列（MacroTask Queue） 取出 一个 任务（如 setTimeout 回调、I/O 任务），放入调用栈执行。

4. **重复步骤 2（处理新的微任务）**
- 宏任务执行完毕后，再次检查微任务队列，如果有新产生的微任务，立即执行所有微任务。

5. **重复步骤 3（执行下一个宏任务）**
- 继续取出下一个 宏任务，重复整个过程，形成循环（Event Loop）