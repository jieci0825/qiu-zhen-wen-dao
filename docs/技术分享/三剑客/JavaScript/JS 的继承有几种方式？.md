---
title: JS 的继承有几种方式？
---

# JS 的继承有几种方式？

## 原型链继承
> 核心思路： 让子类的 prototype 指向父类实例。

```js
function Parent() {
    this.name = 'Parent'
}
Parent.prototype.sayHello = function () {
    console.log('Hello from Parent')
}

function Child() {}
Child.prototype = new Parent() // 继承 Parent
Child.prototype.constructor = Child

const child = new Child()
console.log(child.name) // "Parent"
child.sayHello() // "Hello from Parent"
```
✅ 优点： 
- 父类方法可复用。

❌ 缺点： 
- 共享引用类型属性（如 arr = [] 会被多个实例共享）
- 无法向父类构造函数传参

## 借用构造函数继承
> 核心思路： 在子类构造函数中使用 call 继承父类属性。

```js
function Parent(name) {
    this.name = name
}
function Child(name, age) {
    Parent.call(this, name) // 继承 Parent
    this.age = age
}
const child = new Child('Rain', 18)
console.log(child.name, child.age) // "Rain", 18
```
✅ 优点： 
- 解决原型链继承共享问题
- 可传参

❌ 缺点： 
- 无法继承父类原型上的方法

## 组合继承（原型链 + 构造函数继承，最常用）
> 核心思路： 结合前两种方式，继承属性用构造函数，继承方法用原型链。

```js
function Parent(name) {
    this.name = name
}
Parent.prototype.sayHello = function () {
    console.log('Hello from Parent')
}

function Child(name, age) {
    Parent.call(this, name) // 第 1 次调用 Parent
    this.age = age
}

Child.prototype = new Parent() // 第 2 次调用 Parent
Child.prototype.constructor = Child

const child = new Child('Rain', 18)
console.log(child.name, child.age) // "Rain", 18
child.sayHello() // "Hello from Parent"
```
✅ 优点： 
- 解决了前两种方法的缺陷

❌ 缺点： 
- 调用两次 Parent 构造函数（一次 call，一次 Object.create()）

## Object.create() 继承（原型式继承）
> 核心思路： 直接用 Object.create() 创建一个新对象，继承已有对象。

```js
const parent = {
    name: 'Parent',
    sayHello() {
        console.log('Hello!')
    },
}
const child = Object.create(parent)
child.age = 18
console.log(child.name, child.age) // "Parent", 18
child.sayHello() // "Hello!"
```
✅ 优点：
- 适合创建对象而非类的继承

❌ 缺点：
- 不能传参，只适用于简单继承

## 寄生组合继承（优化版，推荐）
> 核心思路：组成继承的优化版本，避免了 Parent 被调用两次的问题。

```js
function Parent(name) {
    this.name = name
}
Parent.prototype.sayHello = function () {
    console.log('Hello from Parent')
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}
Child.prototype = Object.create(Parent.prototype) // 关键优化
Child.prototype.constructor = Child

const child = new Child('Rain', 18)
console.log(child.name, child.age) // "Rain", 18
child.sayHello() // "Hello from Parent"
```
✅ 优点：
- 继承属性和方法
- 只调用一次 Parent

❌ 缺点：
- 代码略微复杂

## ES6 class 继承（最现代化的方式）
> 核心思路： class 语法糖，实际仍然基于原型继承。

```js
class Parent {
    constructor(name) {
        this.name = name
    }
    sayHello() {
        console.log('Hello from Parent')
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name) // 继承属性
        this.age = age
    }
}

const child = new Child('Rain', 18)
console.log(child.name, child.age) // "Rain", 18
child.sayHello() // "Hello from Parent"
```

✅ 优点：
- 代码简洁，易于理解，开发时使用更方便

❌ 缺点：
- 语法糖，本质仍然是原型继承