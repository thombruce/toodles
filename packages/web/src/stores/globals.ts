import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalsStore = defineStore('globals', () => {
  // State
  const ready = ref(false)

  // Getters

  // Actions
  function toggleReady() {
    ready.value = true
  }

  // Export
  return { ready, toggleReady }
})
