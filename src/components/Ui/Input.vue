<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Введите значение',
    },
    type: {
        type: String,
        default: 'text',
    },
    setLimit: {
        type: Boolean,
        default: false,
    },
    maxLength: {
        type: Number,
        default: 100,
    },
    showError: {
        type: Boolean,
        default: false,
    },
    textError: {
        type: String,
    },
})
const inputData = defineModel('inputData')

const limitValue = computed(() => props.setLimit ? props.maxLength : undefined);

</script>
<template>
    <div class="input">
        <label class="text-small" for="input">{{ label }}</label>
        <div class="input-wrapper">
            <input v-if="type !== 'textarea'" :placeholder="placeholder" :type="type" v-model="inputData" class="text-small"
                :maxlength="limitValue" />
            <slot />
        </div>

        <!-- <textarea v-if="type === 'textarea'" v-model="inputData" class="text-small" :placeholder="placeholder" /> -->
        <div v-if="showError || setLimit" class="input-state">
            <span v-if="showError" class="input-error text-small">{{ textError }}</span>
            <span v-if="setLimit" class="input-state-count">{{ inputData.length }}/{{ maxLength }}</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.input {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    & label {
        color: $gray;
        padding: 0 24px;
    }

    & input {
        width: 100%;
        border-radius: 36px;
        padding: 22.5px 28px;
        border: 2px solid transparent;

        &:focus,
        &:hover {
            outline: 2px solid $green-light;
        }
    }

    &-wrapper {
        position: relative;
    }

    &-error {
        color: $error;
    }

    &-state {
        padding: 0 24px;
        display: grid;
        grid-template-columns: auto 49px;
        justify-content: space-between;

        &-count {
            grid-column: 2;
        }
    }
}
</style>
