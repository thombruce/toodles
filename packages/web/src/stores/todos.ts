import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'

// import { useIntervalsStore } from './intervals'
// import { useTalliesStore } from './tallies'
// import { useCommentsStore } from './comments'

import { Todo } from '../models/todo'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const find = computed(() => (id: UUID) => {
    const todo = list.value.find({ id })[0] as Todo
    return todo
  })

  // Actions
  function initStore() {
    list.value = Todo.init()
  }

  function addTodo(text: string) {
    new Todo(text).save()
  }

  function updateTodo(id: UUID, text: string) {
    Todo.find(id).update(text)
  }

  function toggleTodo(id: UUID) {
    Todo.find(id).toggle()
  }

  function deleteTodo(id: UUID) {
    Todo.find(id).destroy()
  }

  // Export
  return { list, find, initStore, addTodo, updateTodo, toggleTodo, deleteTodo }
})
