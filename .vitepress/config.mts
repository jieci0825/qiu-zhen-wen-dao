import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'CoderJc',
    description: '一个记录我个人学习理解的地方',
    srcDir: 'docs',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],

        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        // 大纲以深层次显示
        outline: 'deep',

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

        // 页脚配置。可以添加 message 和 copyright。由于设计原因，仅当页面不包含侧边栏时才会显示页脚。
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024-present CoderJc'
        }
    },
    markdown: {
        // 代码块行号
        lineNumbers: true,
        image: {
            // 图片懒加载
            lazyLoading: true
        }
    }
})
