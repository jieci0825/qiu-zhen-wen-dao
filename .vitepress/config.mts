import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitepress'
import { nav } from './nav.mts'
import { procressSidebar } from './sidebar.mts'
import { viteDemoPreviewPlugin } from '@vitepress-code-preview/plugin'
import { fileURLToPath, URL } from 'node:url'
import { demoPreviewPlugin } from '@vitepress-code-preview/plugin'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: '求真问道',
    description: '一个记录我个人学习理解的地方',
    srcDir: 'docs',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    themeConfig: {
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                        noResultsText: '无法找到相关结果',
                        resetButtonTitle: '清除查询条件',
                        footer: {
                            selectText: '选择',
                            navigateText: '切换',
                            closeText: '关闭'
                        }
                    }
                }
            }
        },

        // https://vitepress.dev/reference/default-theme-config
        nav,

        sidebar: procressSidebar(),

        // 大纲以深层次显示
        outline: {
            level: 'deep',
            label: '页面导航'
        },

        socialLinks: [{ icon: 'github', link: 'https://github.com/jieci0825' }],

        // 页脚配置。可以添加 message 和 copyright。由于设计原因，仅当页面不包含侧边栏时才会显示页脚。
        footer: {
            message: '白玉如蟾俱是妄，青天指月亦非真。',
            copyright: 'Copyright © 2024-present CoderJc'
        },

        // 自定义上次更新的文本和日期格式
        lastUpdated: {
            text: '更新于',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },

        docFooter: { prev: '上一篇', next: '下一篇' },

        logo: {
            light: '/logo.svg',
            dark: '/logo.svg',
            alt: 'CoderJc'
        },
        // siteTitle:false // 隐藏网站标题
        siteTitle: 'coderjc',

        // 移动端菜单名称显示
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        darkModeSwitchLabel: '切换主题',
        lightModeSwitchTitle: '浅色模式',
        darkModeSwitchTitle: '深色模式'
    },
    markdown: {
        // 代码块行号
        lineNumbers: true,
        image: {
            // 图片懒加载
            lazyLoading: true
        },
        container: {
            tipLabel: '提示',
            warningLabel: '警告',
            dangerLabel: '危险',
            infoLabel: '信息',
            detailsLabel: '详情信息'
        },
        config(md) {
            const docRoot = fileURLToPath(new URL('../docs', import.meta.url))
            md.use(demoPreviewPlugin, { docRoot })

            md.use(groupIconMdPlugin)
        }
    },
    vite: {
        plugins: [viteDemoPreviewPlugin(), vueJsx(), groupIconVitePlugin()]
    }
})
