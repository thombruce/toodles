import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as { id: UUID, text: string, done: EpochTimeStamp | null, createdAt: EpochTimeStamp, updatedAt: EpochTimeStamp }[])

  // Getters
  // const first = computed(() => list.value[0])

  // Actions
  function addTodo(text: string) {
    var currentTime = Date.now()
    list.value.push({ id: uuidv4() as UUID, text, done: null, createdAt: currentTime, updatedAt: currentTime })
  }

  function toggleTodo(id: UUID) {
    var currentTime = Date.now()
    var i = list.value.findIndex(item => item.id === id)
    list.value[i] = { ...list.value[i], ...{ done: list.value[i].done ? null : currentTime, updatedAt: currentTime } }
  }

  function deleteTodo(id: UUID) {
    list.value = list.value.filter(item => item.id !== id)
  }

  // Export
  return { list, addTodo, toggleTodo, deleteTodo }
})
