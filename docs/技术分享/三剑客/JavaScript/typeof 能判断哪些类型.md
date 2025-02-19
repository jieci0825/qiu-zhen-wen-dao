---
title: typeof 能判断哪些类型
---

# typeof 能判断哪些类型

| 类型               | 返回值           | 注释                                                       |
|--------------------|------------------|------------------------------------------------------------|
| Undefined          | `"undefined"`    | 当变量未被定义或未赋值时，返回此值。                        |
| Null               | `"object"`       | 历史遗留问题，`null` 被错误地识别为对象。                    |
| Boolean            | `"boolean"`      | 用于 `true` 或 `false` 值。                                 |
| Number             | `"number"`       | 用于整数和浮点数（包括特殊值 `NaN` 和 `Infinity`）。        |
| String             | `"string"`       | 用于字符串（例如 `"hello"`）。                              |
| BigInt             | `"bigint"`       | 用于任意大的整数（例如 `10n`）。                           |
| Symbol             | `"symbol"`       | 用于 `Symbol` 类型。                                       |
| Function (classes) | `"function"`     | 用于可调用的对象（如函数和类定义）。                        |
| 其他对象           | `"object"`       | 包括函数数组、普通对象、日期对象、正则表达式等非函数对象。 |

:::tip typeof null === "object"
在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"