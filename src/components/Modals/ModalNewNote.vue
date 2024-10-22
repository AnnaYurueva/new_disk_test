<script setup lang="ts">
import ModalTemplate from '@/components/Modals/ModalTemplate.vue'
import Input from '@/components/Ui/Input.vue'
import Button from '@/components/Ui/Button.vue'
import { ref } from 'vue';

const emits = defineEmits(['closeModal', 'openRegistration'])

const form = ref({
    title: '',
    content: ''
})

const loginError = ref({
    value: false,
    text: 'Пользователь с таким логином не найден'
})
</script>
<template>
    <ModalTemplate @closeModal="emits('closeModal')" class="note">
        <h2>Добавление заметки</h2>
        <Input label="Название заметки" placeholder="Введите название" v-model:inputData="form.title" type="text"
            :setLimit="true" />
        <Input label="Текст заметки" placeholder="Введите текст" v-model:inputData="form.content" :setLimit="true"
            :maxLength="500" type="textarea" />
        <div class="note-footer">
            <Button>Добавить</Button>
        </div>
        <div v-if="loginError.value" class="note-error text-small">
            {{ loginError.text }}
        </div>
    </ModalTemplate>
</template>

<style scoped lang="scss">
.note {
    &-footer {
        text-align: right;
    }

    &-error {
        color: $error;
        background-color: $error-bg;
        padding: 8px 20px;
        border-radius: 24px
    }
}
</style>
