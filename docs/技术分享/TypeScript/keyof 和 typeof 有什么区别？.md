---
title: keyof 和 typeof 有什么区别？
---

# keyof 和 typeof 有什么区别？
在 TypeScript 中，`keyof` 和 `typeof` 是两个常用的操作符，但它们的作用完全不同。以下是它们的区别和用法：

---

### 1. **`keyof`**
`keyof` 用于获取对象类型的所有键（属性名）组成的联合类型。

#### 用法
```typescript
type Person = {
    name: string;
    age: number;
    location: string;
};

type PersonKeys = keyof Person; // "name" | "age" | "location"
```

#### 解释
- `keyof Person` 返回 `Person` 类型的所有键的联合类型，即 `"name" | "age" | "location"`。
- 通常用于动态访问对象的属性或约束泛型类型。

#### 示例
```typescript
// `K extends keyof T` 表示 K 是 T 的所有键的类型的一个子集。
// `keyof T` 会返回一个联合类型，包含 T 对象中的所有键。
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const person: Person = { name: "Alice", age: 30, location: "New York" };
const name = getProperty(person, "name"); // 类型安全地访问属性
```

---

### 2. **`typeof`**
`typeof` 用于获取变量或值的类型。在 TypeScript 中，`typeof` 可以用在类型上下文中，动态推断类型。

#### 用法
```typescript
const person = {
    name: "Alice",
    age: 30,
    location: "New York",
};

type PersonType = typeof person;
/*
等效于：
type PersonType = {
    name: string;
    age: number;
    location: string;
}
*/
```

#### 解释
- `typeof person` 返回 `person` 变量的类型。
- 通常用于根据已有变量动态生成类型。

#### 示例
```typescript
const person = {
    name: "Alice",
    age: 30,
    location: "New York",
};

type PersonKeys = keyof typeof person; // "name" | "age" | "location"
```

---

### 3. **`keyof` 和 `typeof` 结合使用**
`keyof` 和 `typeof` 可以结合使用，动态获取对象的键。

#### 示例
```typescript
const person = {
    name: "Alice",
    age: 30,
    location: "New York",
};

type PersonKeys = keyof typeof person; // "name" | "age" | "location"
```

#### 解释
1. `typeof person` 获取 `person` 的类型。
2. `keyof typeof person` 获取 `person` 类型的所有键。

---

### 4. **区别总结**
| 特性            | `keyof`                          | `typeof`                        |
|-----------------|----------------------------------|---------------------------------|
| **作用**        | 获取对象类型的键的联合类型        | 获取变量或值的类型              |
| **使用场景**    | 动态访问对象属性、约束泛型类型    | 根据变量动态生成类型            |
| **示例**        | `keyof Person`                   | `typeof person`                 |
| **返回值**      | 联合类型（`如 "name" "age"`）   | 具体类型（`如 { name: string }`）|

---

### 5. **实际应用场景**
- **`keyof`**：
  - 动态访问对象属性。
  - 约束泛型参数必须是对象的键。
  ```typescript
  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
      return obj[key];
  }
  ```

- **`typeof`**：
  - 根据已有变量生成类型。
  - 避免重复定义类型。
  ```typescript
  const config = { width: 100, height: 200 };
  type Config = typeof config; // { width: number, height: number }
  ```

- **结合使用**：
  - 动态获取对象的键。
  ```typescript
  const colors = { red: "#FF0000", green: "#00FF00" };
  type ColorKeys = keyof typeof colors; // "red" | "green"
  ```