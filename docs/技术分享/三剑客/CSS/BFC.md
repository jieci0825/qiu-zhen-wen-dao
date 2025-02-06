---
title: BFC
---

# BFC

## 什么是 BFC？
BFC 全称为 **区块格式化上下文/块级格式化上下文**（Block Formatting Context，BFC）。

它是一块**独立的渲染区域**，它规定了在该区域中，**常规流块盒**的布局。换而言之，BFC 元素的特性就是，内部子元素不管如何变动，都不会影响外部的元素。



## 触发 BFC 的条件是什么？
开启 BFC 规则如下：
- 根元素（HTML）本身就是开启 BFC 的。
- 设置 float 属性（设置 none 无效）。
- 设置 position 属性（属性值需要时 absolute 或者 fixed）。
- 设置 overflow 属性（属性值**不为 visible** 即可）。
- 行内块元素（inline-block）。
- 设置 display 为 flow-root 的元素。
- 伸缩项目（flex 盒子内的 item）。
更多的可以查阅 MDN 文档 [BFC](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)。

## 有哪些应用场景？
在开发页面的时候，相信大家都遇到过下面这些问题：
- 父子关系时，可能会产生 **margin 塌陷** 。
- 父子关系时，父元素无视浮动元素会产生**高度坍塌**。
- 兄弟关系时，正常元素可能会**被浮动元素覆盖**（正常元素在浮动元素之后）。

而这些问题都可以通过开启 BFC 来进行解决。那么开启 BFC 之后具体有什么效果呢，如下：
1. 不会和他的子元素产生 margin 合并。
2. 高度计算不在无视浮动元素。
3. 不会与浮动元素重叠，会避开浮动元素排布。

### margin 塌陷

:::demo src=comps/bfc/margin.vue
:::

可以通过上述案例，来进行测试，当为子元素 `.inner` 都添加 margin: 20px 之后，就会发现第一个元素margin-top 和 最后一个元素的 margin-bottom 都被父元素占用了。这种现象就被称作 **margin 塌陷**。

解决方法就根据上文提到的，随意设置一个即可

### 高度坍塌
:::demo src=comps/bfc/height.vue
:::

案例中，并没有对父元素 `.outer` 设置高度，它的高度都是由三个子元素撑开的。而如果给这些子元素都添加 `float: left` 属性，就会导致子元素脱离文档流，而父元素还在正常的文档流中，没有子元素撑开高度，高度为 0，造成父元素消失不见。

这种父元素不设置高度，子元素浮动，导致父元素高度为 0 的现象就被称作为**高度坍塌**。

所以解决只需要给父元素开启 BFC 即可，开启之后，父元素就可见了。

### 浮动元素覆盖
:::demo src=comps/bfc/float.vue
:::

案例中，当给 item1 添加浮动之后，就会导致 item1 脱离文档流，item2 到原来 item1 的位置，就会造成这种 item1 覆盖 item2 的效果，这种现象称作为**浮动元素覆盖**。

解决方式同理，开启 BFC 即可，BFC 的规则就是不允许你覆盖我，就会变成这种横向排列的效果。
