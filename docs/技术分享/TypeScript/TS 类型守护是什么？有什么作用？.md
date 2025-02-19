---
title: TS 类型守护是什么？有什么作用？
---

# TS 类型守护是什么？有什么作用？

## 什么是类型守护？

TypeScript 的类型守护（Type Guards）是一种用于 **在代码块中缩小变量类型范围的机制**，它能帮助 TypeScript 编译器更精准地推断变量类型，从而提升类型安全性和开发体验。

## 类型守护的作用

1. **类型收窄**：将联合类型（Union Types）的变量缩小到具体类型，消除类型不确定性，例如：
    ```ts
    function printId(id: string | number) {
        if (typeof id === 'string') {
            // 这里 id 的类型被收窄为 string
            console.log(id.toUpperCase())
        } else {
            // 这里 id 的类型被收窄为 number
            console.log(id.toFixed(2))
        }
    }
    ```

2. **避免运行时错误**：在编译阶段阻止类型不匹配的操作，例如访问不存在的属性或方法，例如：
```ts
interface Cat {
    meow(): void;
}
interface Dog {
    bark(): void;
}

function makeSound(animal: Cat | Dog) {
    if ('meow' in animal) {
        animal.meow() // 安全调用
    } else {
        animal.bark() // 安全调用
    }
}
```

3. **增强代码智能提示**：类型收窄后，IDE 能提供精准的属性和方法提示。

## 常见类型守护方式

### 1. **`typeof` 类型守护**
适用于原始类型（`string`, `number`, `boolean`, `symbol`）
```ts
function logValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.length); // value 被推断为 string
    } else {
        console.log(value.toFixed(2)); // value 被推断为 number
    }
}
```

### 2. **`instanceof` 类型守护**
适用于类（Class）的实例类型判断
```ts
class Bird { fly() {} }
class Fish { swim() {} }

function move(animal: Bird | Fish) {
    if (animal instanceof Bird) {
        animal.fly(); // animal 被推断为 Bird
    } else {
        animal.swim(); // animal 被推断为 Fish
    }
}
```

### 3. **自定义类型谓词（Type Predicates）**
通过返回 `arg is Type` 的函数实现复杂逻辑的类型守护
```ts
interface Circle { kind: "circle"; radius: number }
interface Square { kind: "square"; sideLength: number }

function isCircle(shape: Circle | Square): shape is Circle {
    return shape.kind === "circle";
}

function calculateArea(shape: Circle | Square) {
    if (isCircle(shape)) {
        // shape 被推断为 Circle
        return Math.PI * shape.radius ** 2;
    }
    // shape 被推断为 Square
    return shape.sideLength ** 2;
}
```

### 4. **`in` 操作符类型守护**
通过检查对象属性存在性缩小类型范围
```ts
type Admin = { name: string; privileges: string[] };
type User = { name: string; startDate: Date };

function printDetails(account: Admin | User) {
    if ("privileges" in account) {
        console.log(account.privileges); // account 被推断为 Admin
    } else {
        console.log(account.startDate); // account 被推断为 User
    }
}
```
