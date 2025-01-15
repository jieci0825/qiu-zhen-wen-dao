import JcLayout from './Layout/index.vue'
import Confetti from './components/confetti.ts'
import './styles/index.scss'

export default {
    Layout: JcLayout,
    enhanceApp({ app, router }) {
        app.component('Confetti', Confetti)
    }
}
