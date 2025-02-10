---
title: Vue 的 Keep-Alive 是如何实现的
---

# Vue 的 Keep-Alive 是如何实现的

keep-alive 是一个用于**缓存**不活动组件实例的抽象组件，其核心实现如下：

1. **抽象组件特性**
    - 抽像组件会有一个 **abstract** 属性，值为 true，表示该组件不会被渲染成真实 DOM。
    - 在父子组件链中会被跳过，避免影响实际的 DOM 结构。

2. **缓存组件实例**
    - 内部通过一个 map 对象（`cache`）来缓存组件实例，以唯一的 key 作为标识。
    - key 主要通过组件的 id（`cid`）和组件的 tag 来生成，确保唯一性。
    - 当设置 **max** 属性时，采用最近最少使用（**LRU**）算法淘汰缓存。维护 keys 数组记录访问顺序，超出限制时移除最久未使用的实例。

3. **渲染逻辑（Render 函数）**
    - 获取子节点，且只处理第一个直接的子组件（使用 keep-alive 所包裹的组件），其他组件将会被忽略，即默认会获取 slots 的 default 属性，返回的第一个虚拟节点。
    - 根据 include 和 exclude 属性，判断是该组件的 name 是否匹配。如果匹配成功，从缓存中获取组件实例（若无缓存，则创建新实例并存入缓存），并调整 keys 顺序以更新 LRU，然后调用 `activated` 钩子函数。
    - 缓存成功后会进行状态标记，表示组件已经被缓存，后续触发 **activated** 和 **deactivated** 生命周期钩子，而非 mounted 和 destroyed。

4. **生命周期钩子处理**
    - 组件切换时调用 deactivateChildComponent，触发 deactivated 钩子，并将实例从 DOM 中移除（但保留在内存）。
    - 再次渲染时调用 activateChildComponent，触发 activated 钩子，并将实例重新插入 DOM。
    - 缓存组件的 **mounted** 和 **destroyed** 钩子仅在首次创建和最终销毁时触发。

5. **动态过滤与清理**
    - 通过 watch 监听 `include/exclude` 参数变化，遍历 cache 并移除不匹配的实例。
    - 提供 **pruneCache** 方法强制清理无效缓存。

6. **源码结构示例（简化）**
```js
// 核心缓存逻辑
const KeepAlive = {
    name: 'keep-alive',
    abstract: true,

    props: {
        include: [String, RegExp, Array],
        exclude: [String, RegExp, Array],
        max: [Number]
    },

    created() {
        this.cache = Object.create(null) // 缓存对象
        this.keys = [] // LRU 键列表
    },

    destroyed() {
        for (const key in this.cache) {
            pruneCacheEntry(this.cache[key])
        }
    },

    render() {
        const slot = this.$slots.default
        const vnode = slot[0] // 获取第一个子组件
        const componentOptions = vnode.componentOptions

        // 判断是否需要缓存
        const name = getComponentName(componentOptions)
        if (name && !matches(name, this.include, this.exclude)) {
            return vnode
        }

        // 生成唯一 key
        const key =
            vnode.key == null
                ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
                : vnode.key

        // 命中缓存
        if (this.cache[key]) {
            vnode.componentInstance = this.cache[key].componentInstance
            // 更新 LRU 顺序
            remove(this.keys, key)
            this.keys.push(key)
        } else {
            this.cache[key] = vnode
            this.keys.push(key)
            // 超出 max 则淘汰最旧缓存
            if (this.max && this.keys.length > this.max) {
                pruneCacheEntry(this.cache[this.keys[0]])
            }
        }

        vnode.data.keepAlive = true // 标记为已缓存
        return vnode
    }
}
```
