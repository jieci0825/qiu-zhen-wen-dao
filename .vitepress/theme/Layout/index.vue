<script setup lang="ts">
import Giscus from '@giscus/vue'
import NotFount from '../components/not-found.vue'
import DefaultTheme from 'vitepress/theme'
import { useData, inBrowser } from 'vitepress'
import { watch } from 'vue'
const { Layout } = DefaultTheme

defineOptions({ name: 'JcLayout' })

const { isDark } = useData()

watch(isDark, value => {
    // 如果不是浏览器则不做处理
    if (!inBrowser) return

    const iframe = document.querySelector('giscus-widget')?.shadowRoot?.querySelector('iframe')
    if (iframe) {
        iframe.contentWindow?.postMessage(
            {
                giscus: {
                    setConfig: {
                        theme: value ? 'dark' : 'light'
                    }
                }
            },
            'https://giscus.app'
        )
    }
})
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
}
</style>
