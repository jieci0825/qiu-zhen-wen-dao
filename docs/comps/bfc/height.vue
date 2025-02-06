<script setup>
import { ref } from 'vue'

const isBFC = ref(false)

const handleBFC = () => {
    isBFC.value = !isBFC.value
}
</script>

<template>
    <button
        class="btn"
        style="background-color: #f39c12"
        @click="handleBFC"
    >
        {{ isBFC ? '关闭 BFC' : '开启 BFC' }}
    </button>
    <hr />

    <div class="bfc-height-contianer">
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

.bfc-height-contianer {
    border: 1px solid blue;
    height: 150px;
    .outer {
        width: 500px;
        background-color: skyblue;
        &.is-bfc {
            overflow: hidden;
        }
        .inner {
            width: 100px;
            height: 100px;
            float: left;
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
