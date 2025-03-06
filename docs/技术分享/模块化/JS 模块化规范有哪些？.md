---
title: JS 模块化规范有哪些？
---

# JS 模块化规范有哪些？

## CommonJS
**概述**：这是 Node.js 中使用的模块化规范。它通过 `module.exports` 和 `require()` 来导出和引入模块。

**特点**：同步加载，主要用于服务器端（Node.js），可以在代码执行的具体逻辑中使用。

**示例**：
```javascript
// 导出模块
module.exports = {
    foo: 'foo',
    bar: 'bar'
};

// 引入模块
const { foo, bar } = require('./module');
```

## AMD（Asynchronous Module Definition）
**概述**：AMD 是一种异步加载模块的规范，常用于浏览器端。

**特点**：支持异步加载，模块和依赖是按需加载的，通常使用 define() 和 require()。

**示例**：
```javascript
// 定义模块
define(['module1', 'module2'], function(module1, module2) {
    // 模块代码
});
```

## UMD（Universal Module Definition）
**概述**：UMD 是一个兼容多种模块化规范（CommonJS、AMD 和全局变量）的模块化方案。

**特点**：确保模块在不同的环境中都能使用。

**示例**：
```javascript
;(function (root, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        root.myModule = factory()
    }
})(this, function () {
    return function () {
        console.log('Hello, UMD!')
    }
})
```

## ES6 Modules（ESM）
**概述**：ES6 模块化是 JavaScript 原生的模块化标准，使用 `import` 和 `export` 语法。

**特点**：支持静态分析，按需加载，加载时可以进行优化，现代 JavaScript 标准。

**示例**：
```javascript
// 导出模块
export const foo = 'foo';
export const bar = 'bar';

// 引入模块
import { foo, bar } from './module';
```

## SystemJS
**概述**：SystemJS 是一个动态模块加载器，支持多种模块化规范，包括 ES6 模块、CommonJS、AMD 等。

**特点**：支持多种模块格式，动态加载模块。

**示例**：
```javascript
System.config({
    map: {
        greet: './greet.js'
    }
})
System.import('greet').then(greet => {
    greet()
})
```
