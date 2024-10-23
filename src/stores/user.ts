import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userToken = ref<string>('')
  const getUserToken = computed(() => userToken.value)

  function setUserToken(token: string) {
    userToken.value = token
  }

  return { userToken, setUserToken, getUserToken }
})
