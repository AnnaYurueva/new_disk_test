<template>
    <button :class="styleClass" role="button">
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';

interface variants {
    default: string
    icon: string
    text: string
}

enum enumVariants {
    default = 'default',
    icon = 'icon',
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
    icon: 'icon',
    text: 'text',
}

const styleClass = computed(() => styleButton[props.variant])
</script>

<style scoped lang="scss">
button {
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

    &.icon {
        padding: 20px;
        border: none;
        background-color: $green-light;
        color: $white;

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

        @include mobile {
            width: 100%;
        }
    }

    &.text {
        color: $green-light;
        background-color: transparent;
        border: none;
        padding: 0;
        font-size: 18px;
        line-height: 28px;
        font-weight: 700;

        &:hover {
            opacity: .7;
        }

        &:disabled {
            opacity: .56
        }
    }
}
</style>