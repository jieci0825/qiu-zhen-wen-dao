---
title: new 操作符都做了哪些事？
---

# new 操作符都做了哪些事？

*new* 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

过程如下：
1. 创建一个空的简单 JavaScript 对象。为方便起见，我们称之为 `newInstance`。
2. 如果构造函数的 `prototype` 属性是一个对象，则将 `newInstance` 的 [[Prototype]] 指向构造函数的 `prototype` 属性，否则 `newInstance` 将保持为一个普通对象，其 [[Prototype]] 为 `Object.prototype`。
3. 使用给定参数执行构造函数，并将 `newInstance` 绑定为 `this` 的上下文（换句话说，在构造函数中的所有 `this` 引用都指向 `newInstance`）。
4. 如果构造函数返回`非原始值`，则该返回值成为整个 `new` 表达式的结果。否则，如果构造函数未返回任何值或返回了一个原始值，则返回 `newInstance`。（通常构造函数不返回值，但可以选择返回值，以覆盖正常的对象创建过程。）
