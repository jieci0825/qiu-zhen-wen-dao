import fs from 'node:fs'
import path from 'node:path'

const DOCS_ROOT_PATH = path.resolve(process.cwd(), 'docs')

interface Item {
    text: string
    link?: string
    items?: Item[]
}

interface Options {
    /**
     * @description 第几层开始生成序号
     */
    level?: number
    deep: number
}

export function genSn(list: Array<Item>, options?: Options) {
    const defaultOptions = {
        level: 1,
        deep: 0
    }
    const params = Object.assign({}, defaultOptions, options)
    function _deep(list: Array<Item>, deepCount: number) {
        return list.map((item, index) => {
            const text = deepCount < params.level ? item.text : `${complementZero(index + 1)}. ${item.text}`
            if (item.items && item.items.length) {
                item.items = _deep(item.items, deepCount + 1)
            }
            item.text = text
            return item
        })
    }

    return _deep(list, params.deep)
}

export function complementZero(num: number) {
    return num.toString().padStart(2, '0')
}

export function genSidebar(
    dir: string,
    options?: {
        excludes?: string[]
    }
) {
    const params = Object.assign(
        {},
        {
            excludes: ['demo-components', 'comps']
        },
        options || {}
    )

    // 过滤掉不需要的文件
    function filterFiles(files: string[]) {
        return files.filter(file => {
            const flag1 = !params.excludes.includes(file)
            // 同时还要排除文件中包含 assets 字符的(typora存储的本地图片会被放在 assets | xxx.assets 目录下)
            const flag2 = !file.includes('assets')
            return flag1 && flag2
        })
    }

    const dirPath = path.resolve(DOCS_ROOT_PATH, dir)
    const files = filterFiles(fs.readdirSync(dirPath))

    interface BaseItem {
        text: string
        collapsed?: boolean
        link?: string
        items?: Array<BaseItem>
    }

    interface ListItem {
        text: string
        collapsed?: boolean
        link?: string
        items?: Array<ListItem | null>
    }

    const getList = (files: string[], dirPath: string): Array<ListItem | null> => {
        return files
            .map(file => {
                const filePath = path.resolve(dirPath, file)
                const stat = fs.statSync(filePath)
                const formatFileText = file.replace('.md', '')
                const item: ListItem = {
                    text: formatFileText
                }
                if (stat.isDirectory()) {
                    // 如果是目录则设置collapsed-默认都是折叠的
                    item.collapsed = true
                    // 如果是目录则递归调用
                    item.items = getList(filterFiles(fs.readdirSync(filePath)), filePath)
                } else {
                    // 检查后缀，如果不是 .md则跳过
                    if (!file.endsWith('.md')) {
                        return null
                    }
                    // 如果是文件则设置link
                    item.link = formatPath(dirPath.replace(DOCS_ROOT_PATH, '') + `/${formatFileText}`)
                }
                return item
            })
            .filter(Boolean)
    }
    const list = getList(files, dirPath)
    return list as Array<BaseItem>
}

// 格式化话路径，将 \ 替换为 /
export function formatPath(str: string) {
    return str.replace(/\\/g, '/')
}
