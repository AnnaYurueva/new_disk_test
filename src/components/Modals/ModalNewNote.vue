<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { ErrorsMap } from '@/types/errors'
import type { INote } from '@/types'
import { createNote } from '@/api'
import ModalTemplate from '@/components/Modals/ModalTemplate.vue'
import Input from '@/components/Ui/Input.vue'
import Button from '@/components/Ui/Button.vue'

const emits = defineEmits(['closeModal', 'updateNotes'])

const form: Ref<INote> = ref({
    title: '',
    content: ''
})
const success = ref(false)

const errors: Ref<ErrorsMap> = ref({});
const isTitleValid = computed(() => form.value.title.trim() !== '');
const isContentValid = computed(() => form.value.content.trim() !== '');
const validateField = (field: string) => {
    errors.value[field] = '';
    if (field === 'title' && !isTitleValid.value) {
        errors.value.title = 'Поле не может быть пустым';
    }
    if (field === 'content' && !isContentValid.value) {
        errors.value.content = 'Поле не может быть пустым';
    }
};
const createError = ref({
    value: false,
    text: ''
})

const submitForm = () => {
    errors.value = {}
    createError.value.value = false

    validateField('title');
    validateField('content');

    let errorsCount = 0
    for (const error of Object.values(errors.value)) {
        if (error.length > 0) {
            errorsCount++
        }
    }

    if (errorsCount === 0) {
        createNote(form.value)
            .then(() => {
                success.value = true
                emits('updateNotes')
            })
            .catch(err => {
                createError.value.value = true
                createError.value.text = err.response.data.message
            })
    } else {
        console.log(errors.value);
    }
};
</script>
<template>
    <ModalTemplate @closeModal="emits('closeModal')" class="note">
        <h2>Добавление заметки</h2>
        <form v-if="!success" @submit.prevent="submitForm" class="note-form">
            <Input label="Название заметки" placeholder="Введите название" v-model:inputData="form.title" type="text"
                :setLimit="true" :show-error="errors.title && !isTitleValid" :text-error="errors.title"
                @blur="validateField('title')" />
            <Input label="Текст заметки" placeholder="Введите текст" v-model:inputData="form.content" :setLimit="true"
                :maxLength="500" type="textarea" :show-error="errors.content && !isContentValid"
                :text-error="errors.content" @blur="validateField('content')" />
            <div class="note-footer" type="submit">
                <Button type="submit">Добавить</Button>
            </div>
        </form>
        <div v-else class="note-form">
            <h4>Заметка добавлена</h4>
            <Button @click="emits('closeModal')">Готово</Button>
        </div>
        <div v-if="createError.value" class="note-error text-small">
            {{ createError.text }}
        </div>
    </ModalTemplate>
</template>

<style scoped lang="scss">
.note {
    &-footer {
        text-align: right;
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
