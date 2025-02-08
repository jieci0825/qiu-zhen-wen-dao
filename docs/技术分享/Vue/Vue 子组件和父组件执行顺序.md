---
title: Vue 子组件和父组件执行顺序
---

# Vue 子组件和父组件执行顺序

创建过程**自上而下**，挂载过程**自下而上**，即：

- parent created
- child created
- child mounted
- parent mounted

之所以会这样是因为 Vue 创建过程是一个递归的过程，先创建父组件，有子组件的话就会创建子组件，因此创建时先有父组件再由子组件；子组件首次创建时会添加 mounted 钩子到队列，等待 patch 结束在执行它们，可见子组件的 mounted 钩子是先进入到队列中的，因此等到 patch 结束执行这些钩子时也先执行。
