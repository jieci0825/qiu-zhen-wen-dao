<script setup>
import { ref } from 'vue'

const isFloat = ref(false)
const isBFC = ref(false)

const handleItem1 = () => {
    isFloat.value = !isFloat.value
}

const handleItem2 = () => {
    isBFC.value = !isBFC.value
}
</script>

<template>
    <button
        class="btn"
        style="background-color: #16a085"
        @click="handleItem1"
    >
        给 item1 {{ isFloat ? '取消' : '添加' }}浮动
    </button>
    <button
        class="btn"
        style="background-color: #d63031"
        @click="handleItem2"
    >
        给 item2 {{ isBFC ? '关闭' : '开启' }} BFC
    </button>

    <hr />

    <div class="bfc-float-container">
        <div
            class="box item-1"
            :style="{ float: isFloat ? 'left' : 'none' }"
        >
            item1
        </div>
        <div
            class="box item-2"
            :style="{ overflow: isBFC ? 'hidden' : 'visible' }"
        >
            item2
        </div>
    </div>
</template>

<style scoped>
.btn {
    padding: 2px 6px;
    border-radius: 4px;
    margin-right: 10px;
    color: #fff;
}

.bfc-float-container {
    border: 1px solid blue;
    overflow: hidden;
}

.bfc-float-container .box {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
}

.bfc-float-container .item-1 {
    background-color: lightcoral;
}

.bfc-float-container .item-2 {
    background-color: orange;
}
</style>
