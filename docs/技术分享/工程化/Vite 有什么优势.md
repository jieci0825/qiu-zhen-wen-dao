---
title: Vite 有什么优势
---

# Vite 有什么优势

- Vite 并不包含自己的编译能力：
    - Vite 的底层编译依靠于 esbuild 和 Rollup，即 Vite 本身并不参与编译，只是 **集成** 功能，Vite 启动一个 dev server，在中间进行一个串联，管理模块的图谱，监听文件的更新。
- Vite 完全基于 ESM 的加载机制。

我们所熟知的 Webpack 有着非常多的配置，功能也非常的强大，可以通过 Webpack 提供的函数来实现构建目标；Rollup 则比较专一，专注于工具类库以及 build 两个方向。换而言之，Webpack 和 Rollup 更多的是工具，执行的是构建，而 Vite 则更加的上层，专注于开发，开发体验更好，让我们更加方便的开发项目。

Vite 的理念就在于 **更快、更好、更简单**，因此学习 Vite 的时候会发现比较简单，并不像 Webpack 和 Rollup 的学习成本那么高。比如开发时 dev server 的简便、也不需要频繁的配置各类的 loader（Vite 基本都内置了）。

