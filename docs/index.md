---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "求真问道"
  text: "路漫漫其修远兮，吾将上下而求索"
  tagline: 道阻且长，行则将至
  image:
    src: /logo.svg
    alt: logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /指南/前言
    - theme: alt
      text: 使用技巧
      link: /指南/语法记录
    - theme: alt
      text: 在Github上查看
      link: https://github.com/jieci0825/qiu-zhen-wen-dao


features:
  - title: 劫辞の博客
    icon: 🐦‍🔥
    details: 浩瀚星海中的一粒微尘，幽深林海中的一隅树洞，时光洪流中的一瞬微光。
    link: https://blog.coderjc.cn
  - title: GitHub:my-demo
    icon: 🐋
    details: 闲暇时光里的点滴拾趣，求知路上的几笔涂鸦。
    link: https://github.com/jieci0825/my-demo
  - title: GitHub:mini-vue
    icon: 🐉
    details: 借源码之巧思，结书卷之释义，仿写简化之作。
    link: https://github.com/jieci0825/mini-vue
---

<script setup>
import Confetti from '../.vitepress/theme/components/confetti'
</script>

<Confetti/>
