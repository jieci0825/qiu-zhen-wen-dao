import { genSidebar, genSn } from './utils.mts'

export const procressSidebar = () => {
    const sideBarConfig = {
        '/指南': genSidebar('指南'),
        '/技术分享': genSidebar('技术分享'),
        '/作者': [
            {
                text: '作者',
                link: '/作者'
            }
        ]
    }

    // 指南排序
    const guideSort = ['简介', '其他']
    // 技术分享排序
    const techSort = ['前端基础', '浏览器', '手写代码', '前端工程化', 'Vue', 'Node.js', 'TypeScript', '其他']
    const sortMap = {
        '/指南': guideSort,
        '/技术分享': techSort
    }

    for (const key in sideBarConfig) {
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
