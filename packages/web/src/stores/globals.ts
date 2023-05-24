import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', () => {
  // State
  const ready = ref(false)

  // Getters

  // Actions
  function initStores() {
    ready.value = true
  }

  // Export
  return { ready, initStores }
})
