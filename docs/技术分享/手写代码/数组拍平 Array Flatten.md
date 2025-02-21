---
title: 数组拍平 Array Flatten
---

# 数组拍平 Array Flatten

```js
const multiDimensionalArray = [[1, 2, 3], 'ls', ['ww', ['a', ['aaa'], 'b', 'c'], ['d', 'e', 'f']]]

function flatten(arr, depth = 1) {
    const result = []

    function deep(list, level) {
        // 如果不是无穷大，则根据层级打平
        if (depth !== Infinity) {
            if (level > depth) return result.push(list)
        }

        for (const item of list) {
            if (!Array.isArray(item)) {
                result.push(item)
                continue
            } else {
                // 层级+1
                deep(item, level + 1)
            }
        }
    }
    deep(arr, 0)

    return result
}

console.log(flatten(multiDimensionalArray, Infinity))
```