import JcLayout from './Layout/index.vue'
import JcTooltip from './components/tooltip.vue'

import MediumZoom from 'medium-zoom'
import DemoPreview, { useComponents } from '@vitepress-code-preview/container'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import JcTag from './components/jc-tag.vue'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import type { Theme } from 'vitepress'
import type { App, Component } from 'vue'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import './styles/index.scss'
import '@vitepress-code-preview/container/dist/style.css'
import 'virtual:group-icons.css'

const globalComponents: Component[] = [JcTag]
function registerGlobalComponents(app: App) {
    for (const comp of globalComponents) {
        app.component(comp.name!, comp)
    }
}

export default {
    Layout: JcLayout,
    enhanceApp(ctx) {
        useComponents(ctx.app, DemoPreview)
        vitepressNprogress(ctx)
        registerGlobalComponents(ctx.app)
        ctx.app.component('JcTooltip', JcTooltip)
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
