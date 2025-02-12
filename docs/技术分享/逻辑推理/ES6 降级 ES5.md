---
title: ES6 降级 ES5
---

# ES6 降级 ES5

**ES6**：
```js
class Example {
	constructor(name) {
		this.name = name
	}
	init() {
		const fun = () => {
			console.log(this.name)
		}
		fun()
	}
}
const e = new Example('Hello')
e.init()
```

---

**ES5**：
```js
function Example(name) {
	this.name = name
}

Example.prototype.init = function () {
	const fun = () => {
		console.log(this.name)
	}
	fun()
}

const e = new Example('Hello')
e.init()
```