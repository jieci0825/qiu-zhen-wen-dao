<script setup>
import { ref } from 'vue'

const isM = ref(false)

const isBFC = ref(false)

const addM = () => {
    isM.value = true
}

const subtractionM = () => {
    isM.value = false
}

const handleBFC = () => {
    isBFC.value = !isBFC.value
}
</script>

<template>
    <button
        class="btn"
        style="background-color: #16a085"
        @click="addM"
    >
        添加 margin
    </button>
    <button
        class="btn"
        style="background-color: #d63031"
        @click="subtractionM"
    >
        取消 margin
    </button>

    <button
        class="btn"
        style="background-color: #f39c12"
        @click="handleBFC"
    >
        {{ isBFC ? '关闭 BFC' : '开启 BFC' }}
    </button>
    <hr />

    <div class="bfc-margin-contianer">
        <div
            class="outer"
            :class="{ 'm-20': isM, 'is-bfc': isBFC }"
        >
            <div class="inner item-1"></div>
            <div class="inner item-2"></div>
            <div class="inner item-3"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.btn {
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: 10px;
    color: #fff;
}

.bfc-margin-contianer {
    width: 100%;
    border: 1px solid red;
    .outer {
        width: 500px;
        // tips: 高度自适应才会产生塌陷
        background-color: skyblue;
        &.is-bfc {
            // 开启 BFC
            overflow: hidden;
        }
        &.m-20 {
            .inner {
                margin: 20px;
            }
        }
        .inner {
            width: 100px;
            height: 100px;
        }

        .item-1 {
            background-color: lightcoral;
        }

        .item-2 {
            background-color: orange;
        }

        .item-3 {
            background-color: salmon;
        }
    }
}
</style>
