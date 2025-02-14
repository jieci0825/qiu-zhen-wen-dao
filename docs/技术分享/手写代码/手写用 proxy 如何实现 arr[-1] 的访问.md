---
title: 手写用 proxy 如何实现 arr[-1] 的访问
---

# 手写用 proxy 如何实现 arr[-1] 的访问

```js
function ArrProxy(arr) {
	return new Proxy(arr, {
		get(target, key, receiver) {
			const propKey = +key < 0 ? (Math.abs(key) > target.length - 1 ? target.length - 1 : Math.abs(key)) : +key
			return Reflect.get(target, propKey, receiver)
		}
	})
}

const arr = ArrProxy(['大', '河', '之', '剑', '天', '上', '来'])
console.log(arr[-1]) // 河
```