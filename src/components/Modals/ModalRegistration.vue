<script setup lang="ts">
import ModalTemplate from '@/components/Modals/ModalTemplate.vue'
import Input from '@/components/Ui/Input.vue'
import Button from '@/components/Ui/Button.vue'
import InputPassword from '@/components/Ui/InputPassword.vue'
import { ref, computed } from 'vue';

const emits = defineEmits(['closeModal', 'openLogin'])

const form = ref({
    email: '',
    password: '',
    repeatPassword: ''
})

const loginError = ref({
    value: false,
    text: 'Пользователь с таким логином не найден'
})
</script>
<template>
    <ModalTemplate @closeModal="emits('closeModal')" class="registration">
        <h2>Регистрация</h2>
        <Input label="Email" v-model:inputData="form.email" type="email" />
        <InputPassword label="Пароль" v-model:inputData="form.password" />
        <InputPassword label="Пароль ещё раз" v-model:inputData="form.repeatPassword" />
        <div class="registration-footer">
            <div>
                <span>У вас есть аккаунт? </span>
                <Button variant="text" @click="emits('openLogin')">Войдите</Button>
            </div>
            <Button>Зарегистрироваться</Button>
        </div>
        <div v-if="loginError.value" class="registration-error text-small">
            {{ loginError.text }}
        </div>

    </ModalTemplate>
</template>

<style scoped lang="scss">
.registration {
    &-footer {
        display: flex;

        justify-content: space-between;
        align-items: center;

        @include mobile {
            flex-wrap: wrap;
        }
    }

    &-error {
        color: $error;
        background-color: $error-bg;
        padding: 8px 20px;
        border-radius: 24px
    }
}
</style>
