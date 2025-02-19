---
title: CSS 创建一个三角形的原理是什么
---

# CSS 创建一个三角形的原理是什么
> CSS 创建三角形的核心是利用边框的透明性和宽度控制，通过调整不同方向的边框，实现各种形状的三角形。

使用 CSS 画一个三角形，相信在大学初学 HTML 和 CSS 的时候，都实现过，那么原理你知道吗？

首先，我们给一个 div 的四个边框，都添加上颜色，并且设置宽度为 3px，如下：
```css
.box{
	width:100px;
	height:100px;
	border: 3px solid;
	border-color:#1b93fb #1bfb24 #efad48 #ef4848;
}
```
效果如图：

![image-20250219143838878](https://cos.coderjc.cn/blog/image-20250219143838878.png)

仔细观察你可以发现，这个边框其实并不是所想的矩形，而是一个梯形，当然，现在并不明显，我们把边框宽度设置为 30px，如下：
```css
.box{
	width:100px;
	height:100px;
	border: 30px solid;
	border-color:#1b93fb #1bfb24 #efad48 #ef4848;
}
```
效果如图：

![image-20250219144044784](https://cos.coderjc.cn/blog/image-20250219144044784.png)

现在就可以清楚的观察到是一个梯形，我们不妨在慢慢变大，比如设置为 49，来看一下效果：

![image-20250219144732634](https://cos.coderjc.cn/blog/image-20250219144732634.png)

可以看到中间是有一点空白的，但是并不明显，我们来将其放大在观看，如图：

![image-20250219144711937](https://cos.coderjc.cn/blog/image-20250219144711937.png)

此时就观察的比较清楚了，那么如果设置为 50px 呢？这是一个很有意思的数字，因为我们的 div 只有 100px 的宽度，而边框一般是成对的，所以边框为 50px 就会挤满整个 div，显示如图：

![image-20250219144454118](https://cos.coderjc.cn/blog/image-20250219144454118.png)

因此我们可以得知，想要四个边框使用三角形的方式撑满整个 div，那么边框的宽度之和需要 div 的宽度或者超出 div 的宽度，所以一般为了方便，我们会把宽高设置为 0，直接设置边框的宽度为 50px，如下：
```css
.box{
	width:0;
	height:0;
	border: 50px solid;
	border-color:#1b93fb #1bfb24 #efad48 #ef4848;
}
```
效果如图：

![image-20250219145209242](https://cos.coderjc.cn/blog/image-20250219145209242.png)

那么此时如果需要得到一个三角形，就在简单不过了，因为都是边框，只需要将其他三个边框隐藏就行了，如下：
```css
.box{
	width:0;
	height:0;
	border: 50px solid;
	border-color:#1b93fb transparent transparent transparent;
}

/* 或者 */
.box{
	width:0;
	height:0;
	border: 50px solid transparent;
	border-top-color: #1b93fb;
}
```
效果如图：

![image-20250219145302079](https://cos.coderjc.cn/blog/image-20250219145302079.png)
