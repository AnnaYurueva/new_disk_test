<script setup lang="ts">
import Button from '@/components/Ui/Button.vue'
import Login from '@/components/Icons/Login.vue'
import User from '@/components/Icons/User.vue'
import { ref } from 'vue';

const emits = defineEmits(['openLoginModal'])
const checkLogin = ref(false)
</script>

<template>
    <header>
        <img src="@/assets/Logo.svg" alt="logo my notes" />
        <Button v-if="!checkLogin" @click="emits('openLoginModal')">
            <Login /> Вход
        </Button>
        <div v-else class="text-small user">
            <span>
                e-mail@mail.mail
            </span>
            <div class="user-avatar">
                <User />
            </div>
        </div>
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

.user {
    display: flex;
    gap: 12px;
    align-items: center;

    &-avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 56px;
        height: 56px;
        background-color: $dark-middle;
        border-radius: 50%;
    }

    @media (max-width: $bp-mobile) {
        span {
            display: none;
        }
    }
}
</style>
