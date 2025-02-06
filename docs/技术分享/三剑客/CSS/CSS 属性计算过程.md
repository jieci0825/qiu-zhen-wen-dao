---
title: CSS 属性计算过程
---

# CSS 属性计算过程
总的来讲，属性值的计算过程，分为四个步骤，如下：

- 确定声明值
- 层叠冲突
- 使用继承
- 使用默认值

## 确定声明值
声明值，即开发者自己书写的 css 样式，例如：
```css
div{
    width: 100px;
    height: 100px;
    border: 2px solid red;
}
```
而一个元素的样式，除了用户自己设置的之外，还存在 “用户代理样式表”，即浏览器内置的一套样式表，如图：

<img src="https://cos.coderjc.cn/blog/image-20250206172659566.png" alt="image-20250206172659566"  />

上图中可以看出，除了我们自己设置的样式之外，还有一些额外的样式 display: block; unicode-bidi: isolate; 这些样式就是浏览器内置的。

而此时我们自己设置的样式与浏览器内置的默认样式，并没有存在冲突，所以就全部应用了。

## 层叠冲突
在确定声明值时，可能出现一种情况，那就是声明的样式规则发生了冲突。

此时会进入解决层叠冲突的流程。而这一步又可以细分为下面这三个步骤：
- 比较源的重要性
- 比较优先级
- 比较次序

### 比较源的重要性
当不同的 CSS 样式来源存在冲突时，此时就会先比较**样式表来源**的重要性来确定使用那一条样式规则。

样式表的源有如下三种：
- **用户代理样式**：浏览器内置的默认样式表。
- **页面作者样式**：比如网页的开发者书写的 CSS 样式代码。
- **用户样式**：浏览器的用户，可以使用自定义样式表定制使用体验，比如：用户可以通过浏览器设置自定义样式，如调整字体大小或颜色。

重要性顺序依次为：页面作者样式 > 用户样式 > 用户代理样式。

如图所示：

![image-20250206174339243](https://cos.coderjc.cn/blog/image-20250206174339243.png)

### 比较优先级
这块如果要展开说的话，还是比较麻烦的，所以这里只简单举例一下，详情可以查阅 MDN 文档 [优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)

案例代码如下：
```html
<div class="box">
	<span>Hello World</span>
</div>
```
```css
.box span {
	color: red;
}

span {
	color: blue;
}
```
结果如图：

![image-20250206174817592](https://cos.coderjc.cn/blog/image-20250206174817592.png)

### 比较次序
如果优先级一致，则会进行次序的比对，代码如下：
```html
<div class="box">
	<span>Hello World</span>
</div>
```
```css
.box span {
	color: red;
}

.box span {
	color: blue;
}
```
结果如图：

![image-20250206175030812](https://cos.coderjc.cn/blog/image-20250206175030812.png)

## 使用继承
前面的层叠解决之后，那些没有被开发者编写的样式规则，就会直接使用默认规则吗？

并不会，此时还会进行一次**继承**。代码如下：
```html
<div class="box">
	<span>Hello World</span>
</div>
```
```css
div {
	color: red;
}
```

结果如图：

![image-20250206175406311](https://cos.coderjc.cn/blog/image-20250206175406311.png)

在代码中，我们并没有对 span 进行单独设置，但是还是渲染为红色，这就是因为 color 属性被继承的原因。

而**继承**使用的是**就近原则**，而非进行权重对比。代码如下：
```html
<div id="box">
	<div class="inner">
		<span>Hello World</span>
	</div>
</div>
```
```css
#box {
	color: red;
}

.inner {
	color: blue;
}
```

结果如图：

![image-20250206175844751](https://cos.coderjc.cn/blog/image-20250206175844751.png)

而这个属性是否可以被继承，可以查阅相关文档，例如 [color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color#%E5%BD%A2%E5%BC%8F%E5%AE%9A%E4%B9%89)，如图：

![image-20250206180107394](https://cos.coderjc.cn/blog/image-20250206180107394.png)

## 使用默认值

这一步就非常好理解了，凡是没有被前面步骤所应用到的，都会使用默认值，如图：

![image-20250206180357552](https://cos.coderjc.cn/blog/image-20250206180357552.png)
