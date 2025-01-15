interface ImportMetaEnv {
    readonly BASE_URL: string
    readonly DEV: boolean
    readonly MODE: 'production' | 'development'
    readonly PROD: boolean
    readonly SSR: boolean
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
