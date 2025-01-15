import confetti from 'canvas-confetti'
import { inBrowser } from 'vitepress'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        if (inBrowser) {
            // 纸屑
            confetti({
                particleCount: 100,
                spread: 160,
                origin: { y: 0.6 }
            })
        }
        return () => null
    }
})
