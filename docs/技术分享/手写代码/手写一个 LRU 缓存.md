---
title: 手写一个 LRU 缓存
---

# 手写一个 LRU 缓存

LRU（Least Recently Used）是一种缓存淘汰策略，它会优先删除最近最少使用的数据。下面提供两种实现方式：使用 Map 的简单实现和不使用 Map 的基础实现。

---

:::code-group 
```js [使用 Map.js]
class LRUCache {
    constructor(capacity) {
        this.cache = new Map()
        this.capacity = capacity
    }

    get(key) {
        if (!this.cache.has(key)) return -1

        // 将访问的元素移到最新使用的位置
        const value = this.cache.get(key)
        // 删除当前 key，再重新插入，达到更新最近使用的效果
        this.cache.delete(key)
        this.cache.set(key, value)
        return value
    }

    put(key, value) {
        // 如果 key 已存在，先删除，达到更新最近使用的效果
        if (this.cache.has(key)) {
            this.cache.delete(key)
        }
        // 如果达到容量限制，删除最久未使用的元素
        else if (this.cache.size >= this.capacity) {
            // Map 的 keys() 会按插入顺序返回键
            const firstKey = this.cache.keys().next().value
            this.cache.delete(firstKey)
        }

        this.cache.set(key, value)
    }
}

// 使用示例
const cache = new LRUCache(2)
cache.put(1, 1) // 缓存是 {1=1}
cache.put(2, 2) // 缓存是 {1=1, 2=2}
console.log(cache.get(1)) // 返回 1
cache.put(3, 3) // 删除 key 2，缓存是 {1=1, 3=3}
console.log(cache.get(2)) // 返回 -1 (未找到)
```

```js [双向链表的实现.js]
// 双向链表节点
class Node {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.prev = null
        this.next = null
    }
}

class LRUCache {
    constructor(capacity) {
        this.cache = {} // 创建哈希缓存表
        this.capacity = capacity
        this.nodeCount = 0 // 记录当前的节点数量，排除 headNode 和 tailNode

        // 创建首尾节点
        this.headNode = new Node(0, 0)
        this.tailNode = new Node(0, 0)

        // 初始化关系绑定
        this.headNode.next = this.tailNode
        this.tailNode.prev = this.headNode
    }

    /**
     * 将当前节点移动到头部之后
     */
    moveToHead(currNode) {
        // 移动很简单，只需要先把这个需要移动的节点删了，然后再添加到头部即可
        this.removeNode(currNode)
        this.addToHead(currNode)
    }

    /**
     * 将当前节点添加到头部之后
     */
    addToHead(currNode) {
        // 旧的头部节点 next 关联的节点
        const oldHeadNextNode = this.headNode.next

        // 将 currNode 的 prev 设置为 headNode
        currNode.prev = this.headNode
        // 而 oldHeadNextNode 则会作为 currNode 的下一个节点
        currNode.next = oldHeadNextNode

        // 同时 oldHeadNextNode 这个旧的节点的指向也需要修改
        //  - oldHeadNextNode 的上一个节点要从 headNode 变为 currNode
        oldHeadNextNode.prev = currNode
        //  - headNode 的 next 关联的节点也要改为 currNode
        this.headNode.next = currNode
    }

    /**
     * 删除节点
     */
    removeNode(node) {
        // 将要删除节点的上一个节点
        const prevNode = node.prev
        // 将要删除节点的下一个节点
        const nextNode = node.next

        // 将 prevNode 的 next 关联改为 nextNode
        // 再将 nextNode 的 prev 关联改为 prevNode
        // 如此就可以将这个节点从链表关系中移除
        prevNode.next = nextNode
        nextNode.prev = prevNode
    }

    /**
     * 删除末尾的节点
     */
    removeTail() {
        // 将要删除的节点
        const node = this.tailNode.prev

        // 边界处理，如果这个节点是头部节点则不处理
        if (node === this.headNode) return

        this.removeNode(node)
        return node
    }

    get(key) {
        if (this.cache.hasOwnProperty(key)) {
            const node = this.cache[key]
            // 访问成功后，更新位置
            this.moveToHead(node)
            return node.value
        }
        return -1
    }

    put(key, value) {
        if (this.cache.hasOwnProperty(key)) {
            const node = this.cache[key]
            // 更新 value
            node.value = value
            // 将这个节点移动到头部
            this.moveToHead(node)
        } else {
            // 创建新节点
            const newNode = new Node(key, value)
            // 缓存新节点
            this.cache[key] = newNode
            // 将新节点加入到头部之后
            this.addToHead(newNode)
            // 节点数量+1
            this.nodeCount++

            // 如果当前节点数量超出了，则删除最久未使用的时间，即 tailNode.prev
            if (this.nodeCount > this.capacity) {
                const node = this.removeTail()
                delete this.cache[node.key]

                // 删除之后，数量记录 -1
                this.nodeCount--
            }
        }
    }
}

// 使用示例
const cache = new LRUCache(2)
cache.put(1, 1) // 缓存是 {1=1}
cache.put(2, 2) // 缓存是 {1=1, 2=2}
console.log(cache.get(1)) // 返回 1
cache.put(3, 3) // 删除 key 2，缓存是 {1=1, 3=3}
console.log(cache.get(2)) // 返回 -1 (未找到)
```
:::