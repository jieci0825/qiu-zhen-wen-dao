---
title: CSS3 中新增的选择器以及属性
---

# CSS3 中新增的选择器以及属性

以下是三个表格转换后的 Markdown 格式：

---

### **表格 1：属性选择器**
| 属性选择器         | 含义描述                          |
|---------------------|-----------------------------------|
| `E[att^="val"]`     | 属性 `att` 的值以 `"val"` 开头的元素 |
| `E[att$="val"]`     | 属性 `att` 的值以 `"val"` 结尾的元素 |
| `E[att*="val"]`     | 属性 `att` 的值包含 `"val"` 字符串的元素 |

---

### **表格 2：选择器**
| 选择器                      | 含义描述                                                                 |
|-----------------------------|--------------------------------------------------------------------------|
| `:root`                     | 匹配文档的根元素，对于 HTML 文档，就是 `html` 元素                        |
| `:nth-child(n)`             | 匹配其父元素的第 `n` 个子元素，第一个编号为 1                             |
| `:nth-last-child(n)`        | 匹配其父元素的倒数第 `n` 个子元素，第一个编号为 1                         |
| `:nth-of-type(n)`           | 与 `:nth-child()` 作用类似，但仅匹配使用同种标签的元素                    |
| `:nth-last-of-type(n)`      | 与 `:nth-last-child()` 作用类似，但仅匹配使用同种标签的元素               |
| `:last-child`               | 匹配父元素的最后一个子元素，等同于 `:nth-last-child(1)`                   |
| `:first-of-type`            | 匹配父元素下使用同种标签的第一个子元素，等同于 `:nth-of-type(1)`          |
| `:last-of-type`             | 匹配父元素下使用同种标签的最后一个子元素，等同于 `:nth-last-of-type(1)`  |
| `:only-child`               | 匹配父元素下仅有的一个子元素，等同于 `:first-child:last-child`            |
| `:only-of-type`             | 匹配父元素下使用同种标签的唯一一个子元素，等同于 `:first-of-type:last-of-type` |
| `:empty`                    | 匹配不包含任何子元素的元素（文本节点也被视为子元素）                      |

---

### **表格 3：CSS 属性及兼容性**
| 属性              | 含义描述                          | 兼容性                                |
|-------------------|-----------------------------------|---------------------------------------|
| `transition`      | 设置过渡效果                      | -                                     |
| `transform`       | 变换效果（移动、缩放、旋转等）    | -                                     |
| `animation`       | 动画效果                          | -                                     |
| `box-shadow`      | 阴影效果                          | FF3.5, Safari 4, Chrome 3             |
| `text-shadow`     | 文本阴影                          | FF3.5, Opera 10, Safari 4, Chrome 3   |
| `border-colors`   | 为边框设置多种颜色                | FF3+                                  |
| `border-image`    | 图片边框                          | FF3.5, Safari 4, Chrome 3             |
| `text-overflow`   | 文本截断                          | IE6+, Safari4, Chrome3, Opera10       |
| `word-wrap`       | 自动换行                          | IE6+, FF3.5, Safari4, Chrome3         |
| `border-radius`   | 圆角边框                          | FF3+, Safari4, Chrome3                |
| `opacity`         | 不透明度                          | All                                   |
| `box-sizing`      | 控制盒模型的组成模式              | FF3+, Opera10, Safari4, Chrome3       |
| `outline`         | 外边框                            | FF3+, Safari4, Chrome3, Opera10       |
| `background-size` | 指定背景图片的尺寸                | Safari4, Chrome3, Opera10             |
| `background-origin` | 指定背景图片从哪里开始显示      | Safari4, Chrome3, FF3+                |
| `background-clip` | 指定背景图片从什么位置开始裁切    | Safari4, Chrome3                      |
| `rgba`            | 基于 RGB 通道和透明度设置颜色     | Safari4, Chrome3, FF3, Opera10        |
