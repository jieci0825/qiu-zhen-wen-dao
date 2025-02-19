---
title: sourcemap 有何作用，如何配置？
---

# sourcemap 有何作用，如何配置？

##  Source Map 的作用
Source Map 是一种将压缩、混淆后的代码映射回源代码的文件，用于调试和定位错误。它的主要作用如下：
- **调试优化**：在开发者工具中看到源代码而非压缩后的代码。
- **错误定位**：在生产环境中准确定位代码错误。
- **性能分析**：配合性能工具对源代码进行优化分析。

## 配置方法
### Webpack
```js
module.exports = {
    mode: 'production',
    devtool: 'source-map', // 生成 Source Map
}
```
常见选项：
- `source-map`：完整映射，适合生产环境。
- `cheap-module-source-map`：生成更快，但映射不包括列信息。
- `eval-source-map`：适合开发环境，生成速度快。

### Vite
```js
export default {
    build: {
        sourcemap: true,
    }
}
```