---
title: 是否熟悉 Performance API ，是否了解常见的性能指标？
---

# 是否熟悉 Performance API ，是否了解常见的性能指标？
> Performance API 的关键考点是提供了一组 Web 标准接口来获取和分析页面性能数据，帮助开发者定位性能瓶颈并优化体验。其中涉及到的常见性能指标如 FP、FCP、LCP 等能直观反映用户的视觉加载体验。

## 什么是 Performance API？
> Performance API 是浏览器提供的内置接口，用于测量网页的加载时间、资源性能和用户体验。

**常用接口**：
- `performance.now()`：返回相对于页面加载时间的高精度时间戳。
- `performance.mark()` 和 `performance.measure()`：创建和测量自定义性能标记。
- `performance.getEntriesByType()`：获取特定类型的性能数据，如资源加载或导航时间。


## 常见性能指标
- **FP (First Paint)**
    首次绘制：指用户第一次看到页面内容时的时间点（通常是背景颜色）。

- **FCP (First Contentful Paint)**
    首次内容绘制：页面中首个内容（如文字、图片）被绘制的时间点。
    优化思路：减少 CSS 阻塞、优化首屏加载内容。

- **LCP (Largest Contentful Paint)**
    最大内容绘制：页面中最大内容元素（如主标题、图片）绘制完成的时间点。
    优化思路：使用延迟加载策略、优化图像加载。

- **CLS (Cumulative Layout Shift)**
    累积布局偏移：页面加载过程中视觉内容意外变化的总量。
    优化思路：设置明确的宽高，避免懒加载导致布局移动。

- **FID (First Input Delay)**
    首次输入延迟 ，用户第一次交互（如点击按钮）与浏览器响应之间的时间间隔。
    优化思路：减少主线程阻塞。

- **TTI (Time to Interactive)**
    可交互时间：页面完成加载并能够快速响应用户交互的时间。

## 如何使用 Performance API
```js
// 示例：获取 FCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries()
  entries.forEach((entry) => {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime)
    }
  })
}).observe({ type: 'paint', buffered: true })
```

## 注意事项
- 兼容性 ：不同 API 在浏览器中的支持情况可能不同，需合理降级处理。
- 数据分析 ：结合 Lighthouse 等工具进行系统化分析，而不是依赖单一指标。