import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'

import { Todo } from '../models/Todo'
import { TodoCollection } from '@/models/TodoCollection'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref(new TodoCollection() as Collection)

  // Getters
  const find = computed(() => (id: string) => {
    return Todo.find(id, list.value)
  })

  const forProject = computed(() => (project: string) => {
    return list.value.find({'text': { '$regex' : new RegExp(`\\${project}`, 'g') }})
  })

  const forContext = computed(() => (context: string) => {
    return list.value.find({'text': { '$regex' : new RegExp(`${context}`, 'g') }})
  })

  // Actions
  function addTodo(text: string) {
    new Todo(text, list.value).save()
  }

  function updateTodo(id: string, text: string) {
    Todo.find(id, list.value)?.update(text)
  }

  function toggleTodo(id: string) {
    Todo.find(id, list.value)?.toggle()
  }

  function deleteTodo(id: string) {
    Todo.find(id, list.value)?.destroy()
  }

  // Export
  return { list, find, forProject, forContext, addTodo, updateTodo, toggleTodo, deleteTodo }
})
