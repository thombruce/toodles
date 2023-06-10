import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { reject as _reject, findIndex as _findIndex, orderBy as _orderBy } from 'lodash'

import { Todo } from '../models/Todo'
import { db } from '@/plugins/dexie'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as Todo[])

  // Getters
  const find = computed(() => (id: string) => {
    return list.value.find(t => t.id === id)
  })

  const all = computed(() => () => {
    const todos = list.value
    return _orderBy(todos, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const done = computed(() => () => {
    const todos = list.value.filter(t => t.done)
    return _orderBy(todos, ['priority', 'created'], ['asc', 'asc'])
  })

  const forProject = computed(() => (project: string) => {
    const todos = list.value.filter(t => new RegExp(`\\${project}`).test(t.description))
    return _orderBy(todos, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forContext = computed(() => (context: string) => {
    const todos = list.value.filter(t => new RegExp(`${context}`).test(t.description))
    return _orderBy(todos, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forPriority = computed(() => (priority: string) => {
    const todos = list.value.filter(t => t.priority === priority.replace(/[()]/g, ''))
    return _orderBy(todos, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  // Actions
  async function fetchTodos() {
    const items = await db.todos.toArray()
    list.value = items
  }

  function addTodo(editable: string) {
    const todo = new Todo(editable)
    list.value.push(todo)
    // db sync:
    db.todos.add(todo).then().catch()
  }

  function updateTodo(id: string, editable: string) {
    const todo = find.value(id)
    if (todo) {
      Object.assign(todo, { editable })
      const index = _findIndex(list.value, { id: id })
      list.value.splice(index, 1, todo)
      // db sync:
      db.todos.update(id, todo).then().catch()
    }
  }

  function toggleTodo(id: string) {
    const todo = find.value(id)
    if (todo) {
      todo.toggle()
      const index = _findIndex(list.value, { id: id })
      list.value.splice(index, 1, todo)
      // db sync:
      db.todos.update(id, todo).then().catch()
    }
  }

  function deleteTodo(id: string) {
    list.value = _reject(list.value, { id })
    // db sync:
    db.todos.delete(id).then().catch()
  }

  // Export
  return { list, find, all, done, forProject, forContext, forPriority, fetchTodos, addTodo, updateTodo, toggleTodo, deleteTodo }
})
