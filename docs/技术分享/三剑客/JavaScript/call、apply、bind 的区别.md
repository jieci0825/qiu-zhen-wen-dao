---
title: call、apply、bind 的区别
---

# call、apply、bind 的区别

**call** 和 **apply** 的功能相同，都是**立即执行且绑定 this**，唯一的区别在于参数的传递方式不同：
- **call** 方法接受一个参数列表，第一个参数是要绑定的 `this` 值，后面的参数是要传递给函数的参数。如下：
    ```js
    fn.call(obj, arg1, arg2, ...)
    ```
- **apply** 方法接受两个参数，第一个参数是要绑定的 `this` 值，第二个参数是一个数组，数组中的元素是要传递给函数的参数。如下：
    ```js
    fn.apply(obj, [arg1, arg2, ...])
    ```

**bind** 与前两者最重要的区别在于，**bind** 除了改变 this 之外，还会返回一个新的函数，而不会立即执行。当这个新函数被调用时，*bind()* 的第一个参数将作为它运行时的 *this*，之后的一序列参数将会在传递的实参前传入作为它的参数。如下：
```js
const newFn = fn.bind(obj, arg1, arg2, ...)
newFn()
// or
newFn(arg3, arg4)
```
