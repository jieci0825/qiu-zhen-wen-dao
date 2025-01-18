<script setup>
import { ref } from 'vue'
import { data as posts } from '../../article.data.ts'
const origin = window.location.origin

const list = ref(posts)
const keyword = ref('')

function formatData() {
    list.value = []
    for (const item of posts) {
        if (item.frontmatter.title && item.frontmatter.title.includes(keyword.value)) {
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
    <div class="search-wrapper">
        <input
            type="text"
            placeholder="输入关键字搜索"
            v-model="keyword"
            @input="debounceFn"
        />
    </div>
    <div class="article-list-wrapper">
        <div
            class="list-item"
            v-for="(item, idx) in list"
            :key="idx"
        >
            <a
                target="_blank"
                :href="`${origin}${item.url}`"
                >{{ item.frontmatter.title }}</a
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
.search-wrapper {
    margin-top: 20px;
    input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 8px;
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
</style>
