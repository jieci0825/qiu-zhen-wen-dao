<script setup lang="ts"></script>

<template>
    <div class="not-found-container">
        <div class="image-wrapper">
            <img
                src="/not-found.svg"
                alt="not-found"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.not-found-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    --size: 50%;
    @media (max-width: 1920px) {
        --size: 30%;
    }
    @media (max-width: 1200px) {
        --size: 40%;
    }
    @media (max-width: 1024px) {
        --size: 50%;
    }
    @media (max-width: 768px) {
        --size: 60%;
    }
    @media (max-width: 480px) {
        --size: 70%;
    }
    @media (max-width: 320px) {
        --size: 80%;
    }
    .image-wrapper {
        margin-top: 80px;
        width: var(--size);
        padding-bottom: var(--size);
        height: 0;
        background-color: saddlebrown;
        position: relative;
        img {
            position: absolute;
            inset: 0;
        }
    }
}
</style>
