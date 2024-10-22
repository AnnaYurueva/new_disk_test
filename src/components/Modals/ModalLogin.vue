<script setup lang="ts">
import ModalTemplate from '@/components/Modals/ModalTemplate.vue'
import Input from '@/components/Ui/Input.vue'
import Button from '@/components/Ui/Button.vue'
import InputPassword from '@/components/Ui/InputPassword.vue'
import { ref, computed } from 'vue';

const emits = defineEmits(['closeModal', 'openRegistration'])

const form = ref({
    email: '',
    password: ''
})

const loginError = ref({
    value: false,
    text: 'Пользователь с таким логином не найден'
})
</script>
<template>
    <ModalTemplate @closeModal="emits('closeModal')" class="login">
        <h2>Вход в ваш аккаунт</h2>
        <Input label="Email" v-model:inputData="form.email" type="email" />
        <InputPassword label="Пароль" v-model:inputData="form.password" />
        <div class="login-footer">
            <div>
                <span>У вас нет аккаунта? </span>
                <Button variant="text" @click="emits('openRegistration')">Зарегистрируйтесь</Button>
            </div>
            <Button>Войти</Button>
        </div>
        <div v-if="loginError.value" class="login-error text-small">
            {{ loginError.text }}
        </div>

    </ModalTemplate>
</template>

<style scoped lang="scss">
.login {
    &-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &-error {
        color: $error;
        background-color: $error-bg;
        padding: 8px 20px;
        border-radius: 24px
    }
}
</style>
