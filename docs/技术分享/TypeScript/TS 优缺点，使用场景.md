---
title: TS 优缺点，使用场景
---

# TS 优缺点，使用场景

**优点**
- 静态类型，减少类型错误
- 有错误会在编译时提醒，而非运行时报错 —— 解释“编译时”和“运行时”
- 智能提示，提高开发效率

**缺点**
- 学习成本高
- 某些场景下，类型定义会过于混乱，可读性不好，如下代码
- 使用不当会变成 anyscript
    ```ts
    type ModelFieldResolver<T, TKey extends keyof T = any> = (
        this: T,
        ...params: T[TKey] extends (...args: any) => any ? Parameters<T[TKey]> : never
    ) => T[TKey]
    ```


**适用场景**
- 大型项目，业务复杂，维护人员多
- 逻辑性比较强的代码，依赖类型更多
- 组内要有一个熟悉 TS 的架构人员，负责代码规范和质量

:::tip
虽然 TS 有很多问题，网上也有很多“弃用 TS”的说法，但目前 TS 仍然是最优解，而且各大前端框架都默认使用 TS 。
:::