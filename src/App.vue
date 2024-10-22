<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import ModelLogin from '@/components/Modals/ModalLogin.vue'
import ModalRegistration from '@/components/Modals/ModalRegistration.vue'
import { ref } from 'vue';

const showLoginModal = ref(false)
const showRegistrationModal = ref(false)

const toggleModals = () => {
  showLoginModal.value = !showLoginModal.value
  showRegistrationModal.value = !showRegistrationModal.value
}
</script>

<template>
  <div>
    <Header @openLoginModal="showLoginModal = true" />
    <main>
      <RouterView />
    </main>
    <ModelLogin v-if="showLoginModal && !showRegistrationModal" @closeModal="showLoginModal = false"
      @openRegistration="toggleModals" />
    <ModalRegistration v-if="!showLoginModal && showRegistrationModal" @closeModal="showRegistrationModal = false"
      @openLogin="toggleModals" />
  </div>
</template>
