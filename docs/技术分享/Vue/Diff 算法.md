---
title: Diff 算法
---

# Diff 算法
## 概述

当组件创建和更新时，Vue 均会执行内部的 update 函数，该函数在内部调用 render 函数生成虚拟 dom 树，组件会执行新树，然后 Vue 将新旧两树进行对比，找到差异点，最终更新到真实 DOM。

这个对比差异的过程叫**diff**，逐层比较的方式进行进行对比。

在判断两个节点是否相同时，Vue 是通过虚拟节点的 key 和 tag(节点类型，如：div) 来进行判断的。

具体来说，首先对根节点进行对比，如果相同则将旧节点关联的真实 dom 引用到新节点上，然后根据需要更新属性到真实 DOM，然后再对比其他子节点数组：如果不相同，则按照新节点的信息递归创建真实 dom，同时改在到对应虚拟节点上，然后移除掉旧的 DOM。

在对比其子节点数组时，Vue 对每个子节点数组使用了两个指针，分别指向头尾，然后不断向中间靠拢来进行对比，这样做的目的是尽量复用真实 DOM，尽量少的销毁和创建真实 DOM，如果发现相同，则进入根节点一样的对比流程，如果发现不同，则移动真实 DOM 到合适的位置(可以根据key来进行移动)，使用移动是因为在进行大量 DOM 操作的时候，效率还是比直接创建要高的，最后对比完成之后，如果还需要创建或者销毁真实 DOM 的话才进行创建和销毁。

当然，这些对比过程在 Vue3 做出了最大的优化，比如：**Block Tree**、**PatchFlag**。

这样一直递归的遍历下去，知道整颗树完成对比。
