<script setup lang="ts">
import Button from '@/components/Ui/Button.vue'
import Close from '@/components/Icons/Close.vue'

const emits = defineEmits(['closeModal'])
</script>

<template>
    <div class="modal" role="dialog">
        <div class="modal-bg" @click="emits('closeModal')"></div>
        <div class="modal-content">
            <Button class="modal-btn-close" variant="icon" @click="emits('closeModal')">
                <Close />
            </Button>
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 100vw;
    min-height: 100vh;

    @include tablet {
        padding: 40px;
    }

    @include mobile {
        padding: 4px
    }

    &-bg {
        position: absolute;
        background-color: $dark;
        width: 100%;
        height: 100%;
        opacity: 0.7;
    }

    &-content {
        display: flex;
        flex-direction: column;
        gap: 40px;

        background-color: $dark-middle;
        border-radius: 40px;
        width: 100%;

        position: relative;

        @include desktop {
            padding: 80px;
            max-width: 780px;
        }

        @include laptop {
            padding: 56px;
            max-width: 594px;
        }

        @include tablet {
            padding: 56px;
        }

        @include mobile {
            min-height: 100vh;
            padding: 24px 16px;
        }
    }

    &-btn-close {
        position: absolute;

        @media (min-width: $bp-tablet) {
            right: 20px;
            top: 20px;
        }

        @include mobile {
            right: 12px;
            top: 12px;
        }
    }
}
</style>