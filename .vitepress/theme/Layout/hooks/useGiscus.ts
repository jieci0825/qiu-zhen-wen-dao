import { Ref, watch } from 'vue'

export function useGiscus(isDark: Ref<boolean>, inBrowser: boolean) {
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
}
