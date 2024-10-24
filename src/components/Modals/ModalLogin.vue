<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import router from "@/router";
import { ErrorsMap } from '@/types/errors'
import ModalTemplate from '@/components/Modals/ModalTemplate.vue'
import Input from '@/components/Ui/Input.vue'
import Button from '@/components/Ui/Button.vue'
import InputPassword from '@/components/Ui/InputPassword.vue'
import { userLogin } from '@/api';
import { useUserStore } from "@/stores/user";

const emits = defineEmits(['closeModal', 'openRegistration'])
const store = useUserStore()

const isEmailValid = computed(() => form.value.email.trim() !== '');
const isPasswordValid = computed(() => form.value.password.trim() !== '');

const errors: Ref<ErrorsMap> = ref({});

const validateField = (field: string) => {
    errors.value[field] = '';
    if (field === 'email' && !isEmailValid.value) {
        errors.value.email = 'Неверный email';
    }
    if (field === 'password' && !isPasswordValid.value) {
        errors.value.password = 'Поле не может быть пустым';
    }
};

const form = ref({
    email: '',
    password: ''
})

const loginError = ref({
    value: false,
    text: ''
})

const submitForm = () => {
    errors.value = {}
    loginError.value.value = false

    validateField('email');
    validateField('password');

    let errorsCount = 0
    for (const error of Object.values(errors.value)) {
        if (error.length > 0) {
            errorsCount++
        }
    }

    if (errorsCount === 0) {
        userLogin(form.value)
            .then((res) => {
                store.setUserToken(res.data.accessToken)
                router.push('/notes')
                emits('closeModal')
            })
            .catch(err => {
                loginError.value.value = true
                loginError.value.text = err.response.data.message
            })
    } else {
        console.log(errors.value);
    }
};
</script>
<template>
    <ModalTemplate @closeModal="emits('closeModal')" class="login">
        <h2>Вход в ваш аккаунт</h2>
        <form @submit.prevent="submitForm" class="login-form">
            <Input label="Email" v-model:inputData="form.email" type="email" :show-error="!isEmailValid && errors.email"
                :text-error="errors.email" @blur="validateField('email')" />
            <InputPassword label="Пароль" v-model:inputData="form.password"
                :show-error="errors.password || !isPasswordValid" :text-error="errors.password"
                @blur="validateField('password')" />
            <div class="login-footer">
                <div>
                    <span>У вас нет аккаунта? </span>
                    <Button variant="text" @click="emits('openRegistration')">Зарегистрируйтесь</Button>
                </div>
                <Button type="submit">Войти</Button>
            </div>
        </form>
        <div v-if="loginError.value" class="login-error text-small">
            {{ loginError.text }}
        </div>

    </ModalTemplate>
</template>

<style scoped lang="scss">
.login {
    &-footer {
        display: flex;
        gap: 40px;
        justify-content: space-between;
        align-items: center;

        @include mobile {
            flex-wrap: wrap;
        }
    }

    &-form {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    &-error {
        color: $error;
        background-color: $error-bg;
        padding: 8px 20px;
        border-radius: 24px
    }
}
</style>
