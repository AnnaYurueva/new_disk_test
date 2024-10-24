<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import type { INote } from '@/types'
import NotesItem from '@/components/NotesItem.vue';
import Button from '@/components/Ui/Button.vue';
import Plus from '@/components/Icons/Plus.vue';
import ModalNewNote from '@/components/Modals/ModalNewNote.vue'
import { getNotes, deleteNote } from "@/api";

const notes: Ref<INote[]> = ref([])

const findNotes = async () => {
    notes.value = await getNotes();
}

const deleteFoto = async (id: number) => {
    await deleteNote(id)
    await findNotes()
}

onMounted(async () => {
    await findNotes()
})
const showModal = ref(false)
</script>

<template>
    <div v-if="notes.length" class="notes">
        <NotesItem v-for="item of notes" v-bind="item" @delete="deleteFoto(item.id)" />
    </div>
    <Button class="notes-button" variant="icon" @click="showModal = true">
        <Plus />
    </Button>

    <ModalNewNote v-if="showModal" @close-modal="showModal = false" @updateNotes="findNotes" />
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