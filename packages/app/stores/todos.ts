import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { reject as _reject, orderBy as _orderBy } from 'lodash'

import { Todo } from '../models/Todo'

// @ts-ignore
import { useTntApi } from '#imports'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as Todo[])

  // Getters
  const all = computed(() => _orderBy(list.value, ['state', 'priority', 'completed', 'created', 'due']))

  const find = computed(() => (id: string, parent?: string) => {
    let parentTodo
    if (parent) parentTodo = list.value.find(t => t.id === parent)

    return parentTodo ? parentTodo.children.find(t => t.id === id) : list.value.find(t => t.id === id)
  })

  const progress = computed(() => {
    const count = list.value.reduce((accumulator, t) => accumulator + 1 + (t.children?.length || 0), 0)
    const done = list.value.reduce((accumulator, t) => accumulator + (["done", "obsolete"].includes(t.status) ? 1 : 0) + (t.children?.filter(c => ["done", "obsolete"].includes(c.status)).length || 0), 0)
    return done / count * 100
  })

  // Actions
  async function fetchTodos() {
    const file = await useTntApi().loadFile('todo.txt')
    if (file) list.value = file.trim().split(/\n(?=\S)/).map(string => new Todo(string))
  }

  function addTodo(todo: String) {
    list.value.push(new Todo(todo))
    useTntApi().updateFile('todo.txt', list.value.map(t => t.string).join('\n'))
  }

  function toggleTodo(id: string, parent?: string) {
    const todo = find.value(id, parent)
    if (todo) todo.toggle()
    useTntApi().updateFile('todo.txt', list.value.map(t => t.string).join('\n'))
  }

  function toggleTodoFocus(id: string, parent?: string) {
    const todo = find.value(id, parent)
    if (todo) todo.toggleFocus()
    useTntApi().updateFile('todo.txt', list.value.map(t => t.string).join('\n'))
  }

  function deleteTodo(id: string, parent?: string) {
    let parentTodo
    if (parent) parentTodo = list.value.find(t => t.id === parent)

    if (parentTodo) {
      parentTodo.children = _reject(parentTodo.children, { id })
    } else {
      list.value = _reject(list.value, { id })
    }

    useTntApi().updateFile('todo.txt', list.value.map(t => t.string).join('\n'))
  }

  return { list, all, progress, fetchTodos, addTodo, toggleTodo, toggleTodoFocus, deleteTodo }
})
