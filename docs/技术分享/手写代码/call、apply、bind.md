---
title: call、apply、bind
---

# call、apply、bind

### call

```js
Function.prototype.myCall = function (ctx, ...args) {
    // 边界处理
    ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx)

    // 此函数的 this 就表示需要真正执行的函数
    const fn = this

    // 给上下文添加需要执行的函数
    ctx.fn = fn

    // 使用 ctx 调用需要执行的函数，进行改变 this，并接收返回值
    const result = ctx.fn(...args)

    // 删除 ctx 上的 fn 属性
    delete ctx.fn

    return result
}
```

### apply
```js
Function.prototype.myApply = function (ctx, args = []) {
    ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx)
    ctx.fn = this
    const result = ctx.fn(...args)
    delete ctx.fn
    return result
}
```

### bind
```js
Function.prototype.myBind = function (ctx, ...args1) {
    ctx = ctx === undefined || ctx === null ? globalThis : Object(ctx)

    const originFunc = this

    const bindFunc = function (...args2) {
        // 判断通过是否通过 new 调用
        const isNewCall = this instanceof bindFunc

        // 如果是 new 调用则指向新创建的实例对象(this)，否则指向原来的上下文
        const that = isNewCall ? this : ctx

        // 合并参数
        const args = args1.concat(args2)

        // 调用原函数，实现 this 绑定
        return originFunc.apply(that, args)
    }

    // 重新设置原型
    if (originFunc.prototype) {
        bindFunc.prototype = Object.create(originFunc.prototype)
    }

    return bindFunc
}
```