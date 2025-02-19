<script setup>
import Virtual from './virtual.vue'
import { computed, ref } from 'vue'
import { data as posts } from '../../article.data.ts'
const origin = window.location.origin

const list = ref(posts)
const keyword = ref('')
const total = posts.length - 2

const filteredList = computed(() => {
    return list.value.filter(item => !!item.frontmatter.title)
})

function formatData() {
    list.value = []
    for (const item of posts) {
        if (item.frontmatter.title && item.frontmatter.title.toUpperCase().includes(keyword.value.toUpperCase())) {
            list.value.push(item)
        }
    }
}

function debounce(fn, delay) {
    let timer = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

const debounceFn = debounce(formatData, 300)
</script>

<template>
    <div class="header-wrapper">
        <div>文章总数：{{ total }}</div>
    </div>
    <div class="search-wrapper">
        <input
            type="text"
            placeholder="输入关键字搜索"
            v-model="keyword"
            @input="debounceFn"
        />
    </div>
    <div class="article-list-wrapper">
        <Virtual
            v-show="filteredList.length > 0"
            :data="filteredList"
            :remain="15"
        >
            <template #default="{ node }">
                <a
                    target="_blank"
                    :href="`${origin}${node.url}`"
                    >{{ node.frontmatter.title }}</a
                >
            </template>
        </Virtual>

        <div
            v-show="filteredList.length === 0"
            class="empty"
        >
            暂无数据
        </div>
    </div>
</template>

<style scoped lang="scss">
.header-wrapper {
    font-size: 20px;
    font-weight: bold;
}

.search-wrapper {
    margin-top: 20px;
    input {
        width: 100%;
        padding: 8px;
        border: 2px solid #ccc;
        border-radius: 6px;
        font-size: 16px;
        transition: all 0.3s ease-in-out;
        &::placeholder {
            font-size: 16px;
        }
        &:hover {
            border-color: var(--primary-color);
        }
        &:focus {
            outline: none;
            border-color: var(--primary-color);
        }
    }
}

.article-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px 0;
}

.empty {
    padding-top: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
}
</style>
