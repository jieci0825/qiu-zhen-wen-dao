import JcLayout from './Layout/index.vue'
import Confetti from './components/confetti.ts'
import MediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import './styles/index.scss'

export default {
    Layout: JcLayout,
    enhanceApp({ app, router }) {
        app.component('Confetti', Confetti)
    },
    setup() {
        const route = useRoute()
        const initZoom = () => {
            nextTick(() => {
                MediumZoom('.main img', {
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
}
