<script setup lang="ts">
import Button from '@/components/Ui/Button.vue'
import Login from '@/components/Icons/Login.vue'

const emits = defineEmits(['openLoginModal'])
</script>

<template>
    <header>
        <img src="@/assets/Logo.svg" alt="logo my notes" />
        <Button @click="emits('openLoginModal')">
            <Login /> Вход
        </Button>
    </header>
</template>

<style lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        width: 220px;

        @include mobile {
            width: 158px;
        }
    }

    @include desktop {
        padding: 40px 160px;
    }

    @include laptop {
        padding: 20px 80px;
    }

    @include tablet {
        padding: 20px 40px;
    }

    @include mobile {
        padding: 20px 20px;
    }
}
</style>
