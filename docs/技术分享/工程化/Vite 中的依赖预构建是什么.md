---
title: Vite 中的依赖预构建是什么
---

# Vite 中的依赖预构建是什么

> 首次启动 Vite 的时候，Vite 会在本地加载站点之前就预构建了项目依赖。默认情况下，这个步骤是自动且透明完成的。
>
> https://cn.vitejs.dev/guide/dep-pre-bundling.html

## 依赖预构建的目的是什么？
1. **CommonJS 和 UMD 兼容性**：

    开发的阶段时，Vite 的 dev server 会将所有的代码都视为原生 ES 模块。因此，Vite 必须先将以 CommonJS 或 UMD 形式提供的依赖项转换为 ES 模块。

    在转换 CommonJS 依赖项时，Vite 会进行智能导入分析，这样即使模块的导出是动态分配的（例如 React），具名导入（named imports）也能正常工作：
        ```js
        // 符合预期
        import React, { useState } from 'react'
        ```

2. **性能**：

    为了提高后续页面的加载性能，Vite 将那些具有许多内部模块的 ESM 依赖项转换为单个模块。

    有些包将它们的 ES 模块构建为许多单独的文件，彼此导入。例如，lodash-es 有超过 600 个内置模块！当我们执行 `import { debounce } from 'lodash-es'` 时，浏览器同时发出 600 多个 HTTP 请求！即使服务器能够轻松处理它们，但大量请求会导致浏览器端的网络拥塞，使页面加载变得明显缓慢。

    通过将 `lodash-es` 预构建成单个模块，现在我们只需要一个HTTP请求！

:::tip
依赖预构建仅适用于开发模式，并使用 esbuild 将依赖项转换为 ES 模块。在生产构建中，将使用 `@rollup/plugin-commonjs`。
:::

## 依赖预构建实现
前面我们提到了依赖预构建的目的是什么，那么 Vite 是如何实现依赖预构建的呢？

在处理的过程中，如果说看到了有非绝对路径或者相对路径的引用，它就会尝试开启补全路径

```js
import _ from 'lodash'

// 此时就会开启补全路径
import _ from '/node_modules/.vite/deps/lodash'
```

为了看的更加的具体，我们可以看一下书写的引入代码

```js
import _ from 'lodash'

let count = 0

export function add() {
	return ++count
}
```

再看看编译后实际运行的时候，是否补全了路径，如图：

![image-20240621202002638](https://cos.coderjc.cn/blog/image-20240621202002638.png)

寻找依赖的过程是自当前目录一次向上查找的过程，知道搜寻到根目录或者搜寻到对应依赖为止，但是这种查找规则就会出现一个问题，假设当前工作目录为 my_project，而 my_project 的父级目录为 vue_projects，那么 my_project 下的 node_modules 没有找到对应的依赖，在 vue_projects 下面的 node_modules 下找到了，按照上面的分析，对应的绝对路径应该是 `/vue_projects/node_modules/axios`，但是实际呢？如图：

<img src="https://cos.coderjc.cn/blog/image-20240621204107225.png" alt="image-20240621204107225" />

![image-20240621204131111](https://cos.coderjc.cn/blog/image-20240621204131111.png)

但是这个路径浏览器肯定是找不到的，所以 vite 是如何解决这个事情的呢，实际 vite 在考虑另外一个问题的时候就解决了这个问题，有些第三方库导出的时候是 commonjs 规范导出的，此时就与 es modules 规范不匹配，vite 就使用了 **依赖预构建** 的方式解决

什么是依赖预构建？vite 首先会找到对应依赖，然后调用 <JcTooltip content="对 js 语法进行处理的一个库，就是把其他如 commonjs 语法的代码转换为 es modules 规范的代码">**esbuild**</JcTooltip>，经过 esbuild 编译之后，然后放到当前目录 node_modules/.vite/deps 里面

**esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。**

## 这个依赖预构建解决了那些问题？

- 不同的第三方包会有不同的导出格式，解决了导出格式不是 es modules 规范的问题

- 寻找依赖向上查找路径不正确的问题

- 网络多包传输的性能问题(也是原生 es modules 规范不敢解决默认在 node_modules 目录里面查找的原因)，当一个依赖里面有依赖其他许多的依赖，那么此时就会请求非常多的模块，vite 会对这个做出一个优化，就是 vite 会对 es modules 规范进行**各个模块统一集成**

  **具体解析如下：**

  - 比如先一个模块为 my_es，那么下有一个 a.js 文件，是一个功能，还有一个 index.js 为入口文件，导出，具体如下：

    ```js
    // a.js
    export default function a(){}
    
    // index.js
    export { default as a } from './a.js' 
    ```

  - 那么此时如果在使用的时候导入这个 my_es 模块的时候，遵循 es_modules 规范，就会去加载 a.js，那么如果这样的模块有很多，加载的文件就非常多了。

  - 所以 vite 会对这个 index.js 进行一个重写，如下：

    ```js
    // index.js
    function a (){}
    ```

  - 直接重写为了一个函数，这样就不会去加载 a.js 文件了，当然这个函数只是简单的写了一下，实际会更复杂一点

  - 我们使用 lodash-es 来做一个例子，安装之后正常导入

    ![image-20240621210218478](https://cos.coderjc.cn/blog/image-20240621210218478.png)

  - 看一下网络请求，请求的文件 

    ![image-20240621210236634](https://cos.coderjc.cn/blog/image-20240621210236634.png)

  - 非常的少，实际是有非常多的导出的，如图：

    ![image-20240621210303887](https://cos.coderjc.cn/blog/image-20240621210303887.png)

  - 那么我们把这个针对 lodash-es 的依赖预构建给关掉，vite.config.js 文件配置如下：

    ```js
    export default {
    	optimizeDeps: {
    		exclude: ['lodash-es'] // 遇到 lodash-es 包时，不进行依赖预构建
    	}
    }
    ```

  - 现在再看一下网络请求了多少文件，如图：

    ![image-20240621210440582](https://cos.coderjc.cn/blog/image-20240621210440582.png)

  - 现在感觉对比是不是就是很明显了，如果还有更多的依赖，那么这个性能开销是显而易见的，**所以这就是原生 es_modules 不敢支持的原因，也是 vite 解决最主要的问题**

  - Tip：在这种情况下，解决的不是文件下载大小的问题，而是多包频繁的发送网络请求，网络造成的性能问题

  - 当然，不可能保证永远只会有一个，但是 vite 会尽量往这个目标靠拢，可能是两个、三个等

vite 打包的时候会全权交给 rollup 这个库去打包，生成不止支持 ES Modules 规范的文件，还有 CommonJS、IIFE等等