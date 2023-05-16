import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as { text: string, done: boolean, createdAt: EpochTimeStamp, updatedAt: EpochTimeStamp }[])

  // Getters
  // const first = computed(() => list.value[0])

  // Actions
  function addTodo(text: string) {
    var currentTime = Date.now()
    list.value.push({ text, done: false, createdAt: currentTime, updatedAt: currentTime })
    console.log(list.value)
  }

  function toggleTodo(text: string) {
    var currentTime = Date.now()
    var i = list.value.findIndex(item => item.text === text)
    list.value[i] = { ...list.value[i], ...{ done: !list.value[i].done, updatedAt: currentTime } }
    console.log(list.value[i])
  }

  function deleteTodo(text: string) {
    list.value = list.value.filter(item => item.text !== text)
  }

  // Export
  return { list, addTodo, toggleTodo, deleteTodo }
})
