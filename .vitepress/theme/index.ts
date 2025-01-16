import JcLayout from './Layout/index.vue'

import MediumZoom from 'medium-zoom'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import type { App } from 'vue'
import type { Theme } from 'vitepress'
import './styles/index.scss'
import '@vitepress-code-preview/container/dist/style.css'
import 'virtual:group-icons.css'

export default {
    Layout: JcLayout,
    enhanceApp({ app }: { app: App }) {
        useComponents(app, DemoPreview)
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
