---
title: Promise.race 应用
---

# Promise.race 应用

这个 api 的参数是一个 promise 数组，当数组中的任何一个 promise 状态变为 resolved 或者 rejected，那么就会返回一个 promise，这个 promise 的状态和值就是数组中第一个变为 resolved 或者 rejected 的 promise 的状态和值。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```

所以，我们可以利用这个特性，来决定加载哪个 CDN 节点上的资源。比如在不同的服务器上部署了CDN，因为地域的原因，不同地域的用户访问不同服务器的速度是不一样的，所以我们可以利用 Promise.race 来决定加载哪个 CDN 节点上的资源。

```js
const cdnList = [
  'https://cdn1.example.com',
  'https://cdn2.example.com',
  'https://cdn3.example.com',
];
const resource = 'resource.js';

const promises = cdnList.map((cdn) => {
  return fetch(`${cdn}/${resource}`);
});

Promise.race(promises).then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
}).then((data) => {
  console.log(data);
}).catch((error) => {
  console.error('There has been a problem with your fetch operation:', error);
});
```