---
title: JS 中有几种捕获异常的方式
---

# JS 中有几种捕获异常的方式

## try...catch

```js
try {
    // 可能会出错的代码
} catch (err) {
    // 出错时执行的代码
}

try {
    // 可能会出错的代码
} catch (err) {
    // 出错时执行的代码
} finally {
    // 无论是否出错都会执行的代码
}
```

## Promise.catch

```js
new Promise((resolve, reject) => {
    // 可能会出错的代码
}).catch(err => {
    // 出错时执行的代码
})
```

## window.addEventListener('error') 和 window.onerror

```js
window.addEventListener('error', function (event) {
    // 出错时执行的代码
})

window.onerror = function (message, source, lineno, colno, error) {
  console.error(`Error occurred: ${message}`)
  return true // 阻止默认错误处理
}
```