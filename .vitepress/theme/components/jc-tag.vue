<script setup lang="ts">
import { computed, PropType } from 'vue'
import { Size } from '../../types'

defineOptions({
    name: 'JcTag'
})

const props = defineProps({
    type: {
        type: String as PropType<'info' | 'tip' | 'warning' | 'danger'>,
        default: 'tip'
    },
    size: {
        type: String as PropType<Size>,
        default: 'default'
    },
    text: {
        type: String,
        default: 'badge'
    }
})

const isSlot = computed(() => !!props.text)
</script>

<template>
    <div :class="['jc-badge', `jc-badge--${type}`, `jc-badge--${size}`]">
        <template v-if="isSlot">{{ props.text }}</template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<style scoped lang="scss">
.jc-badge {
    display: inline-flex;
    color: #fff;
    line-height: 1;
    border-radius: 4px;
    &--info {
        color: var(--vp-c-text-2);
        background-color: var(--vp-c-default-soft);
    }
    &--tip {
        color: var(--vp-c-brand-1);
        background-color: var(--primary-color-light-9);
    }
    &--warning {
        color: var(--vp-c-warning-1);
        background-color: var(--vp-c-warning-soft);
    }
    &--danger {
        color: var(--vp-c-danger-1);
        background-color: var(--vp-c-danger-soft);
    }
    &--small {
        padding: 2px 6px;
        font-size: 12px;
    }
    &--default {
        padding: 4px 10px;
        font-size: 14px;
    }
    &--large {
        padding: 6px 14px;
        font-size: 14px;
    }
}
</style>
