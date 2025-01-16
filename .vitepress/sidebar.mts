import { genSidebar, genSn } from './utils.mts'

export const procressSidebar = () => {
    const sideBarConfig = {
        '/指南': [
            { text: '前言', link: '/指南/前言' },
            { text: 'VitePress 使用技巧', link: '/指南/VitePress 使用技巧' }
        ],
        '/技术分享': genSidebar('技术分享')
    }

    // 技术分享排序
    const techSort = ['阅读须知', '前端基础', '浏览器']
    const sortMap = {
        '/技术分享': techSort
    }

    const keys = ['/技术分享']
    for (const key of keys) {
        sideBarConfig[key] = genSn(sideBarConfig[key])
        sortSidebar(sideBarConfig[key], sortMap[key])
    }

    return sideBarConfig
}

// 对侧边栏排序
export function sortSidebar(sideBarConfigs: any[], sortList: string[]) {
    sideBarConfigs.sort((a, b) => {
        // 在定义的排序数组中，找到a和b的索引，通过索引大小来排序
        return sortList.indexOf(a.text) - sortList.indexOf(b.text)
    })
}
