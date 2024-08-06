import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { orderBy as _orderBy } from 'lodash'

import { Todo } from '../models/Todo'

// @ts-ignore
import { useTntApi } from '#imports'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as Todo[])

  // Getters
  const all = computed(() => _orderBy(list.value, ['state', 'priority', 'completed', 'created', 'due']))

  const find = computed(() => (id: string) => {
    return list.value.find(t => t.id === id)
  })

  // Actions
  async function fetchTodos() {
    const file = await useTntApi().loadFile('todo.txt')
    if (file) list.value = file.trim().split('\n').map(string => new Todo(string))
  }

  function addTodo(todo: String) {
    list.value.push(new Todo(todo))
    useTntApi().updateFile('todo.txt', list.value.map(t => t.string).join('\n'))
  }

  function toggleTodo(id: string) {
    const todo = find.value(id)
    if (todo) todo.toggle()
    useTntApi().updateFile('todo.txt', list.value.map(t => t.string).join('\n'))
  }

  function toggleTodoFocus(id: string) {
    const todo = find.value(id)
    if (todo) todo.toggleFocus()
    useTntApi().updateFile('todo.txt', list.value.map(t => t.string).join('\n'))
  }

  return { list, all, fetchTodos, addTodo, toggleTodo, toggleTodoFocus }
})
