---
title: 实现 add
---

# 实现 add(1)(2)(3)()
```js
function add(num) {
    const _add = function (...args) {
        if (args.length === 0) {
            return num
        }
        return add(args.reduce((a, b) => a + b, num))
    }

    return _add
}

const r1 = add(1)
const r2 = r1(2)
const r3 = r1(2)
const r4 = r2(2, 1, 1)
const r5 = r3(10)

// 参数为空时，返回值结果
console.log(r4(), r5())
```