import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { default as _reject } from 'lodash/reject'
import { default as _orderBy } from 'lodash/orderBy'

import { Todo } from '../models/Todo'

import { useTntApi } from '@thombruce/tnt/composables/tntApi'

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
    if (file) list.value = Todo.fromFile(file)
  }

  function addTodo(todo: Todo) {
    list.value.push(new Todo(todo))
    useTntApi().updateFile('todo.txt', Todo.toFile(list.value))
  }

  function updateTodoDescription(id: string, description: string, parent?: string) {
    const todo = find.value(id, parent)
    if (!todo) return
    todo.description = description
    useTntApi().updateFile('todo.txt', Todo.toFile(list.value))
  }

  function toggleTodoDone(id: string, parent?: string) {
    const todo = find.value(id, parent)
    if (!todo) return
    if (todo.status === 'done') {
      todo.open()
    } else {
      const next = todo.next()
      if (next) list.value.push(next)
      todo.close()
    }
    useTntApi().updateFile('todo.txt', Todo.toFile(list.value))
  }

  function toggleTodoFocus(id: string, parent?: string) {
    const todo = find.value(id, parent)
    if (!todo) return
    todo.toggleFocus()
    useTntApi().updateFile('todo.txt', Todo.toFile(list.value))
  }

  function incrementTodoCount(id: string, parent?: string) {
    const todo = find.value(id, parent)
    if (!todo) return
    todo.incrementCount()
    useTntApi().updateFile('todo.txt', Todo.toFile(list.value))
  }

  function toggleTodoTimer(id: string, parent?: string) {
    const todo = find.value(id, parent)
    if (!todo) return
    todo.toggleTimer()
    if(!todo.isActive) useTntApi().updateFile('todo.txt', Todo.toFile(list.value))
  }

  function deleteTodo(id: string, parent?: string) {
    let parentTodo
    if (parent) parentTodo = list.value.find(t => t.id === parent)

    if (parentTodo) {
      parentTodo.children = _reject(parentTodo.children, { id })
    } else {
      list.value = _reject(list.value, { id })
    }

    useTntApi().updateFile('todo.txt', Todo.toFile(list.value))
  }

  return {
    // State
    list,
    // Getters
    all,
    progress,
    // Actions
    fetchTodos,
    addTodo,
    updateTodoDescription,
    toggleTodoDone,
    toggleTodoFocus,
    incrementTodoCount,
    toggleTodoTimer,
    deleteTodo
  }
})
