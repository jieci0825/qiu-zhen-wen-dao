<script setup>
import { data as posts } from '../../article.data.ts'
const origin = window.location.origin
</script>

<template>
    <div class="article-list-wrapper">
        <div
            class="list-item"
            v-for="(item, idx) in posts"
            :key="idx"
        >
            <a
                :href="`${origin}${item.url}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ item.frontmatter.title }}</a
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
.article-list-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px 0;
}
</style>
