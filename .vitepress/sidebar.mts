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
    const techSort = ['阅读', '三剑客', '浏览器', '场景案例', '逻辑推理']
    const sortMap = {
        '/技术分享': techSort
    }

    const keys = ['/技术分享']
    for (const key of keys) {
        sideBarConfig[key] = genSn(sideBarConfig[key])
        sideBarConfig[key] = genSortSidebar(sideBarConfig[key], sortMap[key])
    }

    return sideBarConfig
}

// 对侧边栏排序
export function genSortSidebar(sideBarConfigs: any[], sortList: string[]) {
    // 将存在于排序数组中的字段提取到一个数组
    const sortListArr = sideBarConfigs.filter(item => sortList.includes(item.text))
    // 将不在排序数组中的字段提取到一个数组
    const otherListArr = sideBarConfigs.filter(item => !sortList.includes(item.text))

    // 对存在于排序数组中的字段进行排序
    sortListArr.sort((a, b) => {
        // 在定义的排序数组中，找到a和b的索引，通过索引大小来排序
        return sortList.indexOf(a.text) - sortList.indexOf(b.text)
    })

    // 合并数组
    return [...sortListArr, ...otherListArr]
}
