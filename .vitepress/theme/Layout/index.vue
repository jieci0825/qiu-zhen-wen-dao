<script setup lang="ts">
import Giscus from '@giscus/vue'
import NotFount from '../components/not-found.vue'
import DefaultTheme from 'vitepress/theme'
import { useData, inBrowser } from 'vitepress'
import { useGiscus } from './hooks/useGiscus'
import { useTheme } from './hooks/useTheme'
const { Layout } = DefaultTheme

defineOptions({ name: 'JcLayout' })

const { isDark } = useData()

useGiscus(isDark, inBrowser)
useTheme(isDark)
</script>

<template>
    <Layout>
        <template #doc-after>
            <div style="margin-top: 25px">
                <Giscus
                    id="comments"
                    repo="jieci0825/CoderJcDiscus"
                    repo-id="R_kgDONqjECA"
                    category="General"
                    category-id="DIC_kwDONqjECM4CmBZR"
                    mapping="title"
                    strict="0"
                    input-position="top"
                    lang="zh-CN"
                    loading="lazy"
                    crossorigin="anonymous"
                    reactions-enabled="1"
                    emit-metadata="0"
                    :theme="isDark ? 'dark' : 'light'"
                />
            </div>
        </template>
        <template #not-found>
            <NotFount></NotFount>
        </template>
    </Layout>
</template>

<style lang="scss">
iframe {
    width: 100%;
    height: 420px;
    border-top-width: 0;
    border-right-width: 0;
    border-left-width: 0;
    border-bottom-width: 0;
    margin-top: 30px;
    margin-bottom: 30px;
}

th,
td {
    // 禁止表格内容换行
    white-space: nowrap !important;
    // 强制均匀分配宽度
    // width: 1%;
    word-break: keep-all !important;
}

// markdown 图片居中
.main img {
    display: block;
    margin: 20px auto;
    max-height: 420px;
    border-radius: 6px;
}

// 深浅主题切换
::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
    z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
    z-index: 9999;
}

.VPSwitchAppearance {
    width: 22px !important;
}

.VPSwitchAppearance .check {
    transform: none !important;
}
</style>
