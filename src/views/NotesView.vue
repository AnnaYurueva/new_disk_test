<script setup lang="ts">
import NotesItem from '@/components/NotesItem.vue';
import Button from '@/components/Ui/Button.vue';
import Plus from '@/components/Icons/Plus.vue';
import ModalNewNote from '@/components/Modals/ModalNewNote.vue'
import { ref } from 'vue';
const notes = [
    {
        "id": 10,
        "title": "Моя заметка",
        "content": "Сегодня эмо-сходка на Трубной"
    },
    {
        "id": 10,
        "title": "Моя заметка",
        "content": "Не следует, однако, забывать, что базовый вектор развития предопределяет высокую востребованность позиций, занимаемых участниками в отношении поставленных задач. Вот вам яркий пример современных тенденций — повышение уровня гражданского сознания требует анализа переосмысления внешнеэкономических политик."
    },
    {
        "id": 10,
        "title": "Моя заметка",
        "content": "Сегодня эмо-сходка на Трубной"
    },
    {
        "id": 10,
        "title": "Пример заголовока заметки в две строчки",
        "content": "А также явные признаки победы институционализации могут быть объединены в целые кластеры себе подобных."
    }
]

const showModal = ref(false)
</script>

<template>
    <div class="notes">
        <NotesItem v-for="item of notes" v-bind="item" />
    </div>
    <Button class="notes-button" variant="icon" @click="showModal = true">
        <Plus />
    </Button>

    <ModalNewNote v-if="showModal" @close-modal="showModal = false" />
</template>

<style scoped lang="scss">
.notes {
    display: grid;
    align-items: start;

    @include desktop {
        margin: 40px 160px;
        gap: 40px;
    }

    @media (max-width: ($bp-desktop - 1px)) {
        gap: 20px;
    }

    @media (min-width: $bp-tablet) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: ($bp-tablet)) {
        grid-template-columns: repeat(1, 1fr);
    }

    @include laptop {
        margin: 40px 80px;
    }

    @include tablet {
        margin: 40px 40px;
    }

    @include mobile {
        margin: 20px;
    }

    &-button {
        position: fixed;
        bottom: 40px;
        box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);

        @include desktop {
            right: 40px;
        }

        @include laptop {
            right: 12px;
        }

        @media (max-width: ($bp-laptop - 1px)) {
            right: 8px;
        }
    }
}
</style>