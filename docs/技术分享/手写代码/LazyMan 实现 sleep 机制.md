---
title: 手写一个 LazyMan 实现 sleep 机制
---

# 手写一个 LazyMan 实现 sleep 机制

```js
class LazyMan {
    constructor(name) {
        this.name = name
        this.common = 'I am'

        this.tasks = []

        this.sayHi()

        // 执行时机利用异步的特性进行执行
        setTimeout(() => {
            this._runTasks()
        }, 0)
    }

    _addTask(task) {
        if (typeof task !== 'function') return
        // 进行 this 强绑定，解决传入非箭头函数时 this 指向问题
        this.tasks.push(task.bind(this))
    }

    _runTasks() {
        for (const task of this.tasks) {
            task()
        }
    }

    sayHi() {
        this._addTask(() => {
            console.log(`Hi ${this.common} ${this.name}`)
        })
        return this
    }

    eat(value) {
        this._addTask(function () {
            console.log(`${this.common} eating ${value}`)
        })
        return this
    }

    sleep(sec) {
        this._addTask(() => {
            console.log(`等待${sec}秒...`)
            const startTimestamp = Date.now()
            const ms = sec * 1000
            while (Date.now() - startTimestamp < ms) {}
        })
        return this
    }
}

// 工厂函数，方便调用
function createLazyMan(name) {
    return new LazyMan(name)
}

const lazyMan = createLazyMan('Tony')
lazyMan.eat('breakfast').sleep(3).eat('lunch').sleep(1).eat('dinner')
// 输出:
// Hi I am Tony
// I am eating breakfast
// 等待3秒...
// I am eating lunch
// 等待1秒...
// I am eating dinner
```