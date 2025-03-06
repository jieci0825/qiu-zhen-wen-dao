---
title: ES6 中模块化导入和导出与 common.js 有什么区别
---

# ES6 中模块化导入和导出与 common.js 有什么区别

CommonJs 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化不会影响到这个值.

```js
// common.js
var count = 1;

var printCount = () =>{ 
    return ++count;
}

module.exports = {
    printCount: printCount,
    count: count
};

// index.js
let v = require('./common');
console.log(v.count); // 1
console.log(v.printCount()); // 2
console.log(v.count); // 1
```

你可以看到明明 common.js 里面改变了 count，但是输出的结果还是原来的。这是因为 count 是一个原始类型的值，会被缓存。除非写成一个函数，才能得到内部变动的值。将 common.js 里面的 module.exports 改写成

```js
module.exports = {
printCount: printCount,
get count(){
    return count
}
};
```

这样子的输出结果是 1，2，2

而在ES6当中，写法是这样的，是利用export 和import导入的

```js
// es6.js
export let count = 1;
export function printCount() {
++count;
}
// main1.js
import  { count, printCount } from './es6';
console.log(count)
console.log(printCount());
console.log(count)
```

ES6 模块是动态引用，并且不会缓存，模块里面的变量绑定其所有的模块，而是动态地去加载值，并且不能重新赋值，

ES6 输入的模块变量，只是一个“符号连接符”，所以这个变量是只读的，对它进行重新赋值会报错。如果是引用类型，变量指向的地址是只读的，但是可以为其添加属性或成员。

另外还想说一个 *export default*

```js
let count = 1;
function printCount() {
    ++count;
} 
export default { count, printCount}
// main3.js
import res form './main3.js'
console.log(res.count)
```

export 与 export default的区别及联系：

1. export 与 export default 均可用于导出常量、函数、文件、模块等

2. 你可以在其它文件或模块中通过 import + (常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用 

3. 在一个文件或模块中，export、import可以有多个，export default仅有一个

4. 通过 export 方式导出，在导入时要加 { }，export default 则不需要。