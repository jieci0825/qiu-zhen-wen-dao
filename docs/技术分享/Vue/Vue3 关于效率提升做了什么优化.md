---
title: Vue3 关于效率提升做了什么优化
---

# Vue3 关于效率提升做了什么优化

## 概述

主要是五个方面：静态提升、预字符串化、缓存事件处理函数、Block Tree、PatchFlag。

- **静态提升**：如果一个节点是静态的或者属性是静态的，就会直接把这部分提取出来，进行重复使用，而非像 Vue2 中每次都创建一个虚拟节点，免去了重复的创建操作，优化了运行时候的内存占用。
- **预字符串化**：在编译阶段会对模板进行分析和优化，将动态部分和静态部分分离，例如在 Vue3 中遇到**大量连续（目前是20个静态节点）**的静态内容时，会直接将其编译为一个普通字符串节点，这样可以更快的生成虚拟节点，减少不必要的计算，从而提升性能。
- **缓存事件处理函数**：一般来说，模板中的事件处理函数，也不会发生变化，因此在 Vue3 中会存到一个换成对象身上，如果有缓存就使用缓存，没有就创建缓存之后在使用。
- **Block Tree**：Block Tree 是在根节点(block)中通过一个数组把后代节点中的**动态节点**都记录下来，对比的时候只需要对比这个**动态节点数组**即可。
- **PatchFlag**：这部分是把节点的相关信息也分为了静态和动态部分，在对比的时候只要对比动态的部分即可。

## 静态提升
静态节点会被提升，什么是静态节点。

- 元素节点
- 没有绑定动态内容

例如：

```html
<h1>Hello World</h1>
```

```js
// Vue2 的静态节点
render(){
    createVNode('h1', null, 'Hello World')
    // ...
}

// Vue3 的静态节点
const hoisted = createVNode('h1', null, 'Hello World')
function render(){
    // 直接使用 hoisted 即可
}
```

通过上述的操作，Vue3提前创建虚拟节点之后，就可以被重复使用，而 Vue2 则会每次都调用函数创建虚拟节点。

静态属性会被提升：

```html
<div class="user">
    {{user.name}}
</div>
```

```js
const hoisted = { class: 'user' }

function render(){
    createVNode('div', hoisted, user.name)
}
```

实际表现如图所示：
![image-20240422221411041](http://cos.coderjc.cn/blog/image-20240422221411041.png)

## 预字符串化
**

```html
<div class="menu-bar-container">
    <div class="logo">
        <h1>logo</h1>
    </div>
    <ul class="nav">
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
        <li><a href="">menu</a></li>
    </ul>
    <div class="user">
        <span>{{ user.name }}</span>
    </div>
</div>
```

在 Vue3 中遇到**大量连续**的静态内容时，会直接将其编译为一个普通字符串节点。

```js
const _hoisted_2 = _createStaticVNode("<div class=\"logo\" data-v-7a7a37b1><h1 data-v-7a7a37b1>logo</h1></div><ul class=\"nav\" data-v-7a7a37b1><li data-v-7a7a37b1><a href=\"\" data-v-7a7a37b1>menu</a></li><li data-v-7a7a37b1><a href=\"\" data-v-7a7a37b1>menu</a></li><li data-v-7a7a37b1><a href=\"\" data-v-7a7a37b1>menu</a></li><li data-v-7a7a37b1><a href=\"\" data-v-7a7a37b1>menu</a></li><li data-v-7a7a37b1><a href=\"\" data-v-7a7a37b1>menu</a></li></ul>)
```

上述就是在 Vue3 中会智能的发现这些连续的静态内容，而在 Vue2 中会把这些节点全部编译为虚拟节点。

<img src="http://cos.coderjc.cn/blog/image-20240422233600392.png" alt="image-20240422233600392" />

<img src="http://cos.coderjc.cn/blog/image-20240422233902796.png" alt="image-20240422233902796" />

从这个图中就可以看出节点树降低了非常多，对于效率的提升是巨大的。

## 缓存事件处理函数


```html
<button @click="count++">increase</button>
```

```js
// Vue2
render(ctx){
    return createVNode('button', {
        onClick: function($evnet){
            ctx.count++
        }
    })
}

// Vue3
render(ctx, _cache){
    return createVNode('button', {
        onClick: cache[0] || (cache[0] = ($event) => (ctx.count++))
    })
}
```

比如这个事件处理函数，每次都是一样的，那么一样可以进行缓存，而 Vue3 会把绑定的事件放入 _cache 中，如果有就使用缓存，没有就给 cache[0] 赋值在返回。

## Block Tree
Vue2 在对比新旧树节点的时候，并不知道那些节点是静态的，那些是动态的，只能一层一层的比较，这就浪费了大部分时间在对比静态节点上，实际上我们需要改变的只是一小部分的动态节点而已。

```html
<form>
    <div>
        <label>账号</label>
        <input v-model="user.account" />
    </div>
    <div>
        <label>密码</label>
        <input v-model="user.password" />
    </div>
</form>
```

<img src="http://cos.coderjc.cn/blog/image-20240423000243704.png"  />

<img src="http://cos.coderjc.cn/blog/image-20240423000457603.png" alt="image-20240423000457603"  />

从图对比，Vue2 的对比是全部对比，而 Vue3 是在根节点中通过一个数组把后代节点中的**动态节点**都记录下来，对比的时候只需要对比这个**动态节点数组**即可。

## PatchFlag

Vue2 在对比每一个节点的时候，并不知道这个节点那些相关信息会发生变化，因此只能将所有信息依次对比。

```html
<div class="user" :class="user.name" data-id="1" title="user name">
    {{user.name}}
</div>
```

比如这个节点的元素内容和一个类名是动态的，那么 Vue3 编译器就会把这个信息记录下来，表现如图：

![](http://cos.coderjc.cn/blog/image-20240423001654237.png)

通过这样的对比方式，就可以把一个节点的对比控制在仅对比静态的部分，其他这些属性就可以不对比了，3 就是通过 PatchFlag 标记的类型。