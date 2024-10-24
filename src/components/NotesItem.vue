<script setup lang="ts">
import Button from './Ui/Button.vue';
import Close from './Icons/Close.vue';
import type { INote } from '@/types'

const props = defineProps<INote>()
const emits = defineEmits(['delete'])
</script>
<template>
    <div class="note">
        <div class="note-header">
            <h4>{{ props.title }}</h4>
        </div>
        <div class="note-desc">
            {{ props.content }}
        </div>
        <div class="note-footer">
            <Button @click="emits('delete', props.id)">
                <Close /> Удалить
            </Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.note {
    box-shadow: 0px 15px 15px -10px rgba(0, 0, 0, 0.8);
    position: relative;
    background-color: $green-light;
    border-radius: 12px 50px 12px 12px;


    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 0px;
        height: 0px;
        top: 0%;
        right: 0%;
    }

    &::before {
        border-bottom: 43px solid $green;
        border-radius: 0 0 0 13px;
        border-right: 40px solid transparent;
    }

    &::after {
        border-top: 42px solid $dark;
        border-left: 40px solid transparent;
    }

    &-header {
        padding: 20px 28px;
        border-bottom: 1px solid $green;

        h4 {
            width: calc(100% - 40px);
        }
    }

    &-desc {
        background-color: $green-light;
        padding: 20px 28px;
    }

    &-footer {
        text-align: right;
        background-color: $green-light;
        padding: 8px;
        border-radius: 0 0 12px 12px;

        & button {
            width: inherit;
        }
    }
}
</style>