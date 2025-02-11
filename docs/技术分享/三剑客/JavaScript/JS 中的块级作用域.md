---
title: JS 中的块级作用域
---

# JS 中的块级作用域

- 函数
    ```js
    (function (){
        // ...
    })()
    ```
- `let`、`const`
- 块作用域使用 `{ }` 包裹
    ```js
    let a = 10
    {
        let a = 100
        console.log(a)
    }
    console.log(a)
    ```
- if 和 for 语句的 `{ }` 也可以看作是块作用域
    ```js
    let a = 10
    if (true) {
        let a = 100
        console.log(a)
    }
    console.log(a)
    ```