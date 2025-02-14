---
title: 请实现一个模块 math，支持链式调用 math.add(2,4).minus(3).times(2)
---

# 请实现一个模块 math，支持链式调用 math.add(2,4).minus(3).times(2)

```js
class MathModule {
  constructor(value = 0) {
    this.result = value;  // 初始化计算结果
  }

  // 加法
  add(num) {
    this.result += num;
    return this;  // 返回当前对象，支持链式调用
  }

  // 减法
  minus(num) {
    this.result -= num;
    return this;
  }

  // 乘法
  times(num) {
    this.result *= num;
    return this;
  }

  // 除法
  divide(num) {
    if (num === 0) {
      throw new Error('Cannot divide by zero');
    }
    this.result /= num;
    return this;
  }

  // 获取结果
  getResult() {
    return this.result;
  }
}

// 创建实例并执行链式操作
const _math = new MathModule();

// 示例：_math.add(2, 4).minus(3).times(2)
console.log(_math.add(2).add(4).minus(3).times(2).getResult()); // 输出 14
```