<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { userLogout } from '@/api'
import router from "@/router";
import Button from '@/components/Ui/Button.vue'
import Login from '@/components/Icons/Login.vue'
import User from '@/components/Icons/User.vue'

const emits = defineEmits(['openLoginModal'])
const store = useUserStore()
const showLogoutButton = ref(false)
const logout = async () => {
    await userLogout()
    router.push('/')
    showLogoutButton.value = false
}
</script>

<template>
    <header class="header">
        <img class="header-logo" src="@/assets/Logo.svg" alt="logo my notes" />
        <Button class="header-button-login" v-if="!store.getUserToken" @click="emits('openLoginModal')">
            <Login /> Вход
        </Button>
        <div v-else class="text-small header-user">
            <span>
                e-mail@mail.mail
            </span>
            <div class="header-user-avatar" @click="showLogoutButton = !showLogoutButton">
                <User />
            </div>
        </div>
        <div class="header-button-logout" v-show="showLogoutButton">
            <Button variant="text" @click="logout">Выйти</Button>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-logo {
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

    &-button-login {
        width: inherit !important;
    }

    &-user {
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
            cursor: pointer;
        }

        @media (max-width: $bp-mobile) {
            span {
                display: none;
            }
        }
    }

    &-button-logout {
        position: fixed;
        top: 97px;
        right: 80px;
        z-index: 1;

        background-color: $dark-middle;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);

        &::before {
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            display: block;
            background-color: $dark-middle;
            content: "";
            position: absolute;
            top: -9px;
            width: 18px;
            height: 9px;
            right: 20px;
        }
    }
}
</style>
