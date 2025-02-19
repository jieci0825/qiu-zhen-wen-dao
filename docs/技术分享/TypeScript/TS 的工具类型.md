---
title: TS 的工具类型
---

# TS 的工具类型

TypeScript（TS）提供了多种工具类型（Utility Types），用于简化常见类型操作。以下是一些常用的工具类型及其用途：

### 1. **`Partial<T>`**
   - 将类型 `T` 的所有属性变为可选。
   - 示例：
     ```typescript
     interface User {
       name: string;
       age: number;
     }

     type PartialUser = Partial<User>;
     // 等效于 { name?: string; age?: number; }
     ```

### 2. **`Required<T>`**
   - 将类型 `T` 的所有属性变为必填。
   - 示例：
     ```typescript
     interface User {
       name?: string;
       age?: number;
     }

     type RequiredUser = Required<User>;
     // 等效于 { name: string; age: number; }
     ```

### 3. **`Readonly<T>`**
   - 将类型 `T` 的所有属性变为只读。
   - 示例：
     ```typescript
     interface User {
       name: string;
       age: number;
     }

     type ReadonlyUser = Readonly<User>;
     // 等效于 { readonly name: string; readonly age: number; }
     ```

### 4. **`Record<K, T>`**
   - 创建一个对象类型，其键为 `K`，值为 `T`。
   - 示例：
     ```typescript
     type UserRoles = Record<string, boolean>;
     // 等效于 { [key: string]: boolean; }
     ```

### 5. **`Pick<T, K>`**
   - 从类型 `T` 中选择指定的属性 `K`。
   - 示例：
     ```typescript
     interface User {
       name: string;
       age: number;
       email: string;
     }

     type UserNameAndAge = Pick<User, 'name' | 'age'>;
     // 等效于 { name: string; age: number; }
     ```

### 6. **`Omit<T, K>`**
   - 从类型 `T` 中排除指定的属性 `K`。
   - 示例：
     ```typescript
     interface User {
       name: string;
       age: number;
       email: string;
     }

     type UserWithoutEmail = Omit<User, 'email'>;
     // 等效于 { name: string; age: number; }
     ```

### 7. **`Exclude<T, U>`**
   - 从类型 `T` 中排除可以赋值给 `U` 的类型。
   - 示例：
     ```typescript
     type T = string | number | boolean;
     type StringOrNumber = Exclude<T, boolean>;
     // 等效于 string | number
     ```

### 8. **`Extract<T, U>`**
   - 从类型 `T` 中提取可以赋值给 `U` 的类型。
   - 示例：
     ```typescript
     type T = string | number | boolean;
     type StringOrNumber = Extract<T, string | number>;
     // 等效于 string | number
     ```

### 9. **`NonNullable<T>`**
   - 从类型 `T` 中排除 `null` 和 `undefined`。
   - 示例：
     ```typescript
     type T = string | number | null | undefined;
     type NonNullableT = NonNullable<T>;
     // 等效于 string | number
     ```

### 10. **`ReturnType<T>`**
   - 获取函数类型 `T` 的返回值类型。
   - 示例：
     ```typescript
     function getUser() {
       return { name: 'Alice', age: 30 };
     }

     type User = ReturnType<typeof getUser>;
     // 等效于 { name: string; age: number; }
     ```

### 11. **`InstanceType<T>`**
   - 获取构造函数类型 `T` 的实例类型。
   - 示例：
     ```typescript
     class User {
       name: string;
       constructor(name: string) {
         this.name = name;
       }
     }

     type UserInstance = InstanceType<typeof User>;
     // 等效于 User
     ```

### 12. **`ThisParameterType<T>`**
   - 提取函数类型 `T` 的 `this` 参数类型。
   - 示例：
     ```typescript
     function greet(this: { name: string }) {
       console.log(`Hello, ${this.name}`);
     }

     type ThisType = ThisParameterType<typeof greet>;
     // 等效于 { name: string }
     ```

### 13. **`OmitThisParameter<T>`**
   - 移除函数类型 `T` 的 `this` 参数。
   - 示例：
     ```typescript
     function greet(this: { name: string }) {
       console.log(`Hello, ${this.name}`);
     }

     type GreetFunction = OmitThisParameter<typeof greet>;
     // 等效于 () => void
     ```

### 14. **`Parameters<T>`**
   - 获取函数类型 `T` 的参数类型组成的元组。
   - 示例：
     ```typescript
     function greet(name: string, age: number) {
       console.log(`Hello, ${name}, you are ${age} years old.`);
     }

     type GreetParams = Parameters<typeof greet>;
     // 等效于 [string, number]
     ```

### 15. **`ConstructorParameters<T>`**
   - 获取构造函数类型 `T` 的参数类型组成的元组。
   - 示例：
     ```typescript
     class User {
       constructor(public name: string, public age: number) {}
     }

     type UserConstructorParams = ConstructorParameters<typeof User>;
     // 等效于 [string, number]
     ```

### 16. **`Awaited<T>`**
   - 获取 `Promise` 类型 `T` 的解析值类型。
   - 示例：
     ```typescript
     type PromiseType = Promise<string>;
     type ResolvedType = Awaited<PromiseType>;
     // 等效于 string
     ```
