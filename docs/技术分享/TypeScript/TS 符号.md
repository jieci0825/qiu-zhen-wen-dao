---
title: TS 符号
---

# TS 符号


## 1. **`?`（可选属性或可选参数）**
   - **用途**：表示属性或参数是可选的。
   - **示例**：
     ```typescript
     interface User {
       name: string;
       age?: number; // age 是可选的
     }

     function greet(name: string, message?: string) {
       console.log(message ? `${message}, ${name}` : `Hello, ${name}`);
     }
     ```

---

## 2. **`?.`（可选链操作符）**
   - **用途**：用于安全访问嵌套对象的属性或方法，避免因 `null` 或 `undefined` 导致的运行时错误。
   - **示例**：
     ```typescript
     const user = {
       profile: {
         name: "Alice",
       },
     };

     const userName = user?.profile?.name; // 如果 profile 或 name 不存在，返回 undefined
     const age = user?.profile?.age; // 不会报错，返回 undefined
     ```

---

## 3. **`??`（空值合并操作符）**
   - **用途**：当左侧的值为 `null` 或 `undefined` 时，返回右侧的默认值。
   - **示例**：
     ```typescript
     const input = null;
     const value = input ?? "default"; // value 为 "default"
     ```

---

## 4. **`!`（非空断言操作符）**
   - **用途**：告诉 TypeScript，某个值一定不是 `null` 或 `undefined`，跳过类型检查。
   - **注意**：滥用可能导致运行时错误。
   - **示例**：
     ```typescript
     let user: { name: string } | undefined;
     console.log(user!.name); // 断言 user 一定存在
     ```

---

## 5. **`_`（占位符或未使用变量）**
   - **用途**：
     - 作为未使用变量的占位符，避免编译器警告。
     - 在数字字面量中作为分隔符，提高可读性。
   - **示例**：
     ```typescript
     // 未使用变量
     const [_, second] = [1, 2, 3]; // _ 表示忽略第一个值

     // 数字分隔符
     const million = 1_000_000; // 等同于 1000000
     ```

---

## 6. **`&`（交叉类型）**
   - **用途**：将多个类型合并为一个类型，新类型包含所有类型的属性。
   - **示例**：
     ```typescript
     interface A {
       name: string;
     }

     interface B {
       age: number;
     }

     type C = A & B; // C 必须同时包含 name 和 age
     const obj: C = { name: "Alice", age: 30 };
     ```

---

## 7. **`|`（联合类型）**
   - **用途**：表示一个值可以是多种类型之一。
   - **示例**：
     ```typescript
     type ID = string | number;

     function printId(id: ID) {
       console.log(id);
     }

     printId(123); // 合法
     printId("abc"); // 合法
     ```

---

## 8. **`#`（私有字段）**
   - **用途**：在类中定义私有字段，只能在类内部访问。
   - **注意**：这是 ES2022 引入的语法，TypeScript 也支持。
   - **示例**：
     ```typescript
     class User {
       #name: string; // 私有字段

       constructor(name: string) {
         this.#name = name;
       }

       greet() {
         console.log(`Hello, ${this.#name}`);
       }
     }

     const user = new User("Alice");
     user.greet(); // 合法
     console.log(user.#name); // 报错：私有字段无法在类外部访问
     ```