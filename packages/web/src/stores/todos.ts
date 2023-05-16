import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as { done: boolean, text: string }[])

  // Getters
  // const first = computed(() => list.value[0])

  // Actions
  function addTodo(text: string) {
    list.value.push({ done: false, text })
  }

  function toggleTodo(text: string) {
    var i = list.value.findIndex(item => item.text === text)
    list.value[i] = { ...list.value[i], ...{ done: !list.value[i].done } }
  }

  function deleteTodo(text: string) {
    list.value = list.value.filter(item => item.text !== text)
  }

  // Export
  return { list, addTodo, toggleTodo, deleteTodo }
})
