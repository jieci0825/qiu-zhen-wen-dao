<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
    /**
     * @description 数据源
     */
    data: {
        type: Array,
        default: () => []
    },
    /**
     * @description 每一项的高度
     */
    itemHeight: {
        type: Number,
        default: 30
    },
    /**
     * @description 可见区域渲染的数据量
     */
    remain: {
        type: Number,
        default: 10
    },
    /**
     * @description 为了更好的渲染效果预先多多少条数据
     */
    cache: {
        type: Number,
        default: 4
    }
})

watch(
    () => props.data,
    () => {
        updateHeight()
    }
)

const containerRef = ref(null)
const placeholderRef = ref(null)

// 开始索引
const startIndex = ref(0)
// 结束索引
const endIndex = computed(() => {
    const index = startIndex.value + props.remain
    // 边界处理
    if (index >= props.data.length - 1) {
        return props.data.length - 1
    }
    return index
})

// 计算向上需要补充多少条数据
const prev = computed(() => {
    return Math.min(startIndex.value, props.cache)
})
// 计算向下需要补充多少条数据
const next = computed(() => {
    return Math.min(props.data.length - endIndex.value, props.cache)
})

// 可见数据
const visibleData = computed(() => {
    // 根据开始索引和结束索引截取数据
    //  - prev 表示左边移动索引，所以需要 -
    //  - next 表示右边移动索引，所以需要 +
    const list = props.data.slice(startIndex.value - prev.value, endIndex.value + next.value)

    // 如果显示的数据量小于需要展示数据量，则补充进行填充
    if (list.length < props.remain) {
        // 填充从最后一个索引往前填充
        return props.data.slice(-props.remain)
    } else {
        return list
    }
})

// 计算偏移量
//  - 占位元素向上移动了多少，则实际展示内容的容器就向下移动多少
const offset = ref(0)

onMounted(() => {
    updateHeight()
})

function updateHeight() {
    containerRef.value.style.height = props.itemHeight * props.remain + 'px'
    placeholderRef.value.style.height = props.itemHeight * props.data.length + 'px'
}

function handleScroll() {
    // 计算开始索引
    const scrollTop = containerRef.value.scrollTop
    startIndex.value = Math.floor(scrollTop / props.itemHeight)
    // 更新偏移量
    offset.value = scrollTop
}
</script>

<template>
    <div
        class="virtual"
        ref="containerRef"
        @scroll="handleScroll"
    >
        <!-- 实际展示内容的容器进行绝对定位，脱离文档流，覆盖上去 -->
        <div
            class="list-wrap"
            :style="{
                transform: `translateY(${offset}px)`
            }"
        >
            <div
                v-for="(item, index) in visibleData"
                class="list-item"
                :style="{ height: `${props.itemHeight}px` }"
            >
                <slot
                    :node="item"
                    :key="index"
                    >{{ index }}</slot
                >
            </div>
        </div>
        <!-- 利用占位元素撑开高度 -->
        <div
            class="scroll-placeholder"
            ref="placeholderRef"
        ></div>
    </div>
</template>

<style scoped lang="scss">
.virtual {
    width: 100%;
    overflow: hidden auto;
    position: relative;
    .list-wrap {
        position: absolute;
        inset: 0;
    }
}
</style>
