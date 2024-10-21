<template>
    <button :class="styleClass">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

interface variants {
    default: string
    text: string
}

enum enumVariants {
    default = 'default',
    text = 'text',
}

const props = defineProps({
    variant: {
        type: String as PropType<keyof typeof enumVariants>,
        default: 'default',
    },
})

const styleButton: variants = {
    default: 'default',
    text: 'text',
}

const styleClass = computed(() => styleButton[props.variant])
</script>

<style scoped lang="scss">
button {
    height: 56px;
    min-width: 56px;
    max-width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    border-radius: 32px;

    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    font-family: "Montserrat", serif;

    transition: all .3s linear;
    cursor: pointer;

    &.default {
        background-color: $green-light;
        color: $white;
        border: none;

        &:hover {
            background-color: $green-middle;
        }

        &:active {
            background-color: $green-dark;
        }

        &:disabled {
            background-color: $gray;
        }
    }

    &.text {
        color: $green-light;
        background-color: transparent;
        border: none;

        &:hover {
            opacity: .7;
        }

        &:disabled {
            opacity: .56
        }
    }
}
</style>