<script setup lang="ts">
import Button from '@/components/Ui/Button.vue'
import SingIn from '@/components/Icons/SingIn.vue'
</script>

<template>
    <header>
        <img src="@/assets/Logo.svg" />
        <Button>
            <SingIn /> Вход
        </Button>
    </header>
</template>

<style lang="scss">
header {
    color: $green-light;
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
