import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'

// import { useIntervalsStore } from './intervals'
// import { useTalliesStore } from './tallies'
// import { useCommentsStore } from './comments'

import { Todo } from '../models/todo'
import { TodoCollection } from '@/models/TodoCollection'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const find = computed(() => (id: UUID) => {
    return Todo.find(id, list.value)
  })

  // Actions
  function initStore() {
    list.value = new TodoCollection() as Collection
  }

  function addTodo(text: string) {
    new Todo(text, list.value).save()
  }

  function updateTodo(id: UUID, text: string) {
    Todo.find(id, list.value).update(text)
  }

  function toggleTodo(id: UUID) {
    Todo.find(id, list.value).toggle()
  }

  function deleteTodo(id: UUID) {
    Todo.find(id, list.value).destroy()
  }

  // Export
  return { list, find, initStore, addTodo, updateTodo, toggleTodo, deleteTodo }
})
