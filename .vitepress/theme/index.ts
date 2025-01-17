import JcLayout from './Layout/index.vue'

import MediumZoom from 'medium-zoom'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import type { Theme } from 'vitepress'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import './styles/index.scss'
import '@vitepress-code-preview/container/dist/style.css'
import 'virtual:group-icons.css'

export default {
    Layout: JcLayout,
    enhanceApp(ctx) {
        useComponents(ctx.app, DemoPreview)
        vitepressNprogress(ctx)
    },
    setup() {
        const route = useRoute()
        const initZoom = () => {
            nextTick(() => {
                MediumZoom('.content-container img', {
                    background: 'var(--mask-bg)'
                })
            })
        }
        onMounted(() => {
            initZoom()
        })
        watch(
            () => route.path,
            () => {
                nextTick(() => {
                    initZoom()
                })
            }
        )
    }
} satisfies Theme
