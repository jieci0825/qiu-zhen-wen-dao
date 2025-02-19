---
title: JS 作用域和作用域链
---

# JS 作用域和作用域链

**作用域**：变量的可访问范围，分为 **全局作用域**、**函数作用域**、**块级作用域**。

**作用域链**：变量查找机制，从当前作用域 **逐级向上查找**，直到全局作用域或 *ReferenceError*。

**ES6 关键点**：
- `let`、`const` **具有块级作用域**，避免 `var` 变量提升带来的问题。
- **闭包** 利用作用域链，保留外部作用域的变量。
    ```js
    var a = 'global'
    
    function outer() {
        var b = 'outer'
    
        function inner() {
            var c = 'inner'
            console.log(a, b, c) // ✅ global outer inner
        }
    
        inner()
    }
    
    outer()
    console.log(b) // ❌ ReferenceError: b is not defined
    
    ```