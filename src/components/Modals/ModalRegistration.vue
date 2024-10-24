<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { ErrorsMap } from '@/types/errors'
import { userRegistration } from '@/api'
import ModalTemplate from '@/components/Modals/ModalTemplate.vue'
import Input from '@/components/Ui/Input.vue'
import Button from '@/components/Ui/Button.vue'
import InputPassword from '@/components/Ui/InputPassword.vue'

const emits = defineEmits(['closeModal', 'openLogin'])

const form = ref({
    email: '',
    password: '',
    confirm_password: ''
})

const errors: Ref<ErrorsMap> = ref({});
const isEmailValid = computed(() => form.value.email.trim() !== '' && /^[^@]+@[^@]+\.[^@]+$/.test(form.value.email) === true);
const isPasswordValid = computed(() => form.value.password.trim() !== '');
const isPasswordConfirmValid = computed(() => form.value.confirm_password.trim() !== '');
const isPasswordsEqval = computed(() => form.value.confirm_password === form.value.password);
const validateField = (field: string) => {
    errors.value[field] = '';
    if (field === 'email' && !isEmailValid.value) {
        errors.value.email = 'Неверный email';
    }
    if (field === 'password' && !isPasswordValid.value) {
        errors.value.password = 'Поле не может быть пустым';
    }
    if (field === 'confirm_password' && !isPasswordConfirmValid.value) {
        errors.value.confirm_password = 'Поле не может быть пустым';
    }
    if (field === 'check' && !isPasswordsEqval.value) {
        errors.value.confirm_password = 'Пароли не совпадают';
        errors.value.password = 'Пароли не совпадают';
    }
};

const errorFromRequest = ref({
    value: false,
    text: ''
})

const success = ref(false)

const submitForm = () => {
    errors.value = {}
    errorFromRequest.value.value = false

    validateField('email');
    validateField('password');
    validateField('confirm_password');
    validateField('check');

    let errorsCount = 0
    for (const error of Object.values(errors.value)) {
        if (error.length > 0) {
            errorsCount++
        }
    }

    if (errorsCount === 0) {
        userRegistration(form.value)
            .then(() => {
                success.value = true
            })
            .catch(err => {
                errorFromRequest.value.value = true
                errorFromRequest.value.text = err.response.data.message
            })
    } else {
        console.log(errors.value);
    }
};
</script>
<template>
    <ModalTemplate @closeModal="emits('closeModal')" class="registration">
        <h2>Регистрация</h2>
        <form v-if="!success" @submit.prevent="submitForm" class="registration-form">
            <Input label="Email" v-model:inputData="form.email" type="email" :show-error="errors.email && !isEmailValid"
                :text-error="errors.email" @blur="validateField('email')" />
            <InputPassword label="Пароль" v-model:inputData="form.password"
                :show-error="errors.password || !isPasswordValid" :text-error="errors.password"
                @blur="validateField('password')" />
            <InputPassword label="Пароль ещё раз" v-model:inputData="form.confirm_password"
                :show-error="errors.confirm_password || !isPasswordConfirmValid" :text-error="errors.confirm_password"
                @blur="validateField('confirm_password')" />
            <div class="registration-footer">
                <div>
                    <span>У вас есть аккаунт? </span>
                    <Button variant="text" @click="emits('openLogin')">Войдите</Button>
                </div>
                <Button type="submit">Зарегистрироваться</Button>
            </div>
        </form>
        <div v-else>
            <h3>Регистрация завершена</h3>
            <Button @click="emits('openLogin')">Авторизоваться</Button>
        </div>

        <div v-if="errorFromRequest.value" class="registration-error text-small">
            {{ errorFromRequest.text }}
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
