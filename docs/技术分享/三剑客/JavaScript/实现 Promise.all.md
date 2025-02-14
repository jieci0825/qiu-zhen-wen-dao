---
title: 实现 Promise.all
---

# 实现 Promise.all

```js
Promise.all = function (arr) {
    const result = []
    let count = 0
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            const p = arr[i]
            if (!isPromise(p)) {
                result[i] = p
                count++
                continue
            }

            p.then(
                res => {
                    result[i] = res
                    count++
                    if (count === arr.length) {
                        resolve(result)
                    }
                },
                err => {
                    reject(err)
                }
            )
        }
    })
}
```