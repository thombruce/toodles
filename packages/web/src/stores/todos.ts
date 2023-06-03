import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'

import { Todo } from '../models/Todo'
import { TodoCollection } from '@/models/TodoCollection'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref(new TodoCollection() as Collection)

  // Getters
  const all = computed(() => () => {
    return list.value.chain().simplesort('raw').data()
  })

  const find = computed(() => (id: string) => {
    return Todo.find(id, list.value)
  })

  const forProject = computed(() => (project: string) => {
    return list.value.chain()
      .find({'raw': { '$regex' : new RegExp(`\\${project}`) }})
      .simplesort('raw')
      .data()
  })

  const forContext = computed(() => (context: string) => {
    return list.value.chain()
      .find({'raw': { '$regex' : new RegExp(`${context}`) }})
      .simplesort('raw')
      .data()
  })

  // Actions
  function addTodo(raw: string) {
    new Todo(raw, list.value).save()
  }

  function updateTodo(id: string, raw: string) {
    Todo.find(id, list.value)?.update(raw)
  }

  function toggleTodo(id: string) {
    Todo.find(id, list.value)?.toggle()
  }

  function deleteTodo(id: string) {
    Todo.find(id, list.value)?.destroy()
  }

  // Export
  return { list, all, find, forProject, forContext, addTodo, updateTodo, toggleTodo, deleteTodo }
})
