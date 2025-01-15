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

export function genSidebar(dir: string) {
    const dirPath = path.resolve(DOCS_ROOT_PATH, dir)
    const files = fs.readdirSync(dirPath)
    const getList = (files: string[], dirPath: string) => {
        return files.map(file => {
            const filePath = path.resolve(dirPath, file)
            const stat = fs.statSync(filePath)
            const formatFileText = file.replace('.md', '')
            const item: Item = {
                text: formatFileText
            }
            if (stat.isDirectory()) {
                // 如果是目录则递归调用
                item.items = getList(fs.readdirSync(filePath), filePath)
            } else {
                // 如果是文件则设置link
                item.link = formatPath(dirPath.replace(DOCS_ROOT_PATH, '') + `/${formatFileText}`)
            }
            return item
        })
    }
    const list = getList(files, dirPath)
    return list
}

// 格式化话路径，将 \ 替换为 /
export function formatPath(str: string) {
    return str.replace(/\\/g, '/')
}
