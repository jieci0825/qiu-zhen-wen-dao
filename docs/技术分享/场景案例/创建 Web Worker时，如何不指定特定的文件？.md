---
title: 创建 Web Worker时，如何不指定特定的文件？
---

# 创建 Web Worker时，如何不指定特定的文件？

## 使用 Object URL
```js
const code = 'console.log("hello world")'

const blob = new Blob([code], { type: 'application/javascript' })
const url = URL.createObjectURL(blob)

const worker = new Worker(url)
```

## Data URL
```js
const code = 'console.log("hello world")'

const dataURL = `data:text/javascript;utf-8,${code}`
const worker = new Worker(dataURL)
```

## 总结
worker 的参数就是接受一个文件地址，通过这个文件地址拿到文件的内容，去执行。而上述两种方法可以实现的本质就是因为都是通过URL获取资源。

只不过 Object URL 是一个临时的地址，而 Data URL 是直接把资源卸载字符串中而已。