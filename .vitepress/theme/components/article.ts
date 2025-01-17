import { defineComponent, h } from 'vue'
import { default as posts } from '../../article.data'

export default defineComponent({
    setup() {
        console.log(posts)
        return null
    }
})
