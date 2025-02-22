<script setup>
import { onMounted, ref, onUnmounted } from 'vue'

const props = defineProps({
    content: {
        type: String,
        default: ''
    },
    effect: {
        type: String,
        default: 'dark'
    }
})

const tipWrapRef = ref(null)

const switchShow = () => {
    if (tipWrapRef.value.style.display === 'block') {
        tipWrapRef.value.style.display = 'none'
    } else {
        tipWrapRef.value.style.display = 'block'
    }
}

const handleClick = e => {
    if (tipWrapRef.value && !tipWrapRef.value.contains(e.target)) {
        tipWrapRef.value.style.display = 'none'
    }
}

onMounted(() => {
    window.addEventListener('click', handleClick)
})

onUnmounted(() => {
    window.removeEventListener('click', handleClick)
})
</script>

<template>
    <span
        class="tooltip"
        @mouseenter.stop="switchShow"
        @mouseleave.stop="switchShow"
    >
        <slot></slot>
        <div
            ref="tipWrapRef"
            class="tip-wrap"
        >
            {{ content }}
        </div>
    </span>
</template>

<style scoped lang="scss">
.tooltip {
    // 给文字底部划上虚线
    border-bottom: 2px dashed var(--vp-c-text-1);
    // 鼠标悬停时显示提示框
    position: relative;
    cursor: pointer;
    .tip-wrap {
        display: none;
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px 10px;
        border-radius: 5px;
        white-space: nowrap;
        max-width: 50vw;
        overflow: auto;
        background-color: var(--tooltip-bg);
        color: var(--tooltip-color);
        font-size: 14px;
    }
}
</style>
