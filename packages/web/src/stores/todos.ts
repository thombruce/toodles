import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { default as _reject } from 'lodash/reject'
import { default as _findIndex } from 'lodash/findIndex'
import { default as _orderBy } from 'lodash/orderBy'

import { Todo } from '../models/Todo'
import { db, advancedSearch } from '@/plugins/dexie'

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as Todo[])
  const activeQuery = ref('')
  const results = ref([] as Todo[])

  // Getters
  const find = computed(() => (id: string) => {
    return list.value.find(t => t.id === id)
  })

  const all = computed(() => () => {
    return _orderBy(list.value, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const allSearch = computed(() => () => {
    return _orderBy(results.value, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const open = computed(() => () => {
    const todos = list.value
    const filtered = todos.filter(t => !t.done)
    return _orderBy(filtered, ['priority', 'created'], ['asc', 'asc'])
  })

  const openSearch = computed(() => () => {
    const todos = results.value
    const filtered = todos.filter(t => !t.done)
    return _orderBy(filtered, ['priority', 'created'], ['asc', 'asc'])
  })

  const done = computed(() => () => {
    const todos = list.value
    const filtered = todos.filter(t => t.done)
    return _orderBy(filtered, ['priority', 'created'], ['asc', 'asc'])
  })

  const doneSearch = computed(() => () => {
    const todos = results.value
    const filtered = todos.filter(t => t.done)
    return _orderBy(filtered, ['priority', 'created'], ['asc', 'asc'])
  })

  const forProject = computed(() => (project: string) => {
    const todos = list.value
    const filtered = todos.filter(t => new RegExp(`(?:^|\\s)\\${project}(?=\\s|$)`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forProjectSearch = computed(() => (project: string) => {
    const todos = results.value
    const filtered = todos.filter(t => new RegExp(`(?:^|\\s)\\${project}(?=\\s|$)`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forContext = computed(() => (context: string) => {
    const todos = list.value
    const filtered = todos.filter(t => new RegExp(`(?:^|\\s)${context}(?=\\s|$)`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forContextSearch = computed(() => (context: string) => {
    const todos = results.value
    const filtered = todos.filter(t => new RegExp(`(?:^|\\s)${context}(?=\\s|$)`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forHashtag = computed(() => (hashtag: string) => {
    const todos = list.value
    const filtered = todos.filter(t => new RegExp(`(?:^|\\s)${hashtag}(?=\\s|$)`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forHashtagSearch = computed(() => (hashtag: string) => {
    const todos = results.value
    const filtered = todos.filter(t => new RegExp(`(?:^|\\s)${hashtag}(?=\\s|$)`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forPriority = computed(() => (priority: string) => {
    const todos = list.value
    const filtered = todos.filter(t => t.priority === priority.replace(/[()]/g, ''))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forPrioritySearch = computed(() => (priority: string) => {
    const todos = results.value
    const filtered = todos.filter(t => t.priority === priority.replace(/[()]/g, ''))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  // Actions
  async function fetchTodos() {
    const items = await db.todos.toArray()
    list.value = items
  }

  async function searchTodos(query: string) {
    activeQuery.value = query
    advancedSearch(query)
      .then(todos => {
        results.value = todos
      })
      .catch(() => {
        results.value = []
      })
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
      db.todos.update(id, JSON.parse(JSON.stringify(todo))).then().catch()
    }
  }

  function toggleTodo(id: string) {
    const todo = find.value(id)
    if (todo) {
      todo.toggle()
      const index = _findIndex(list.value, { id: id })
      list.value.splice(index, 1, todo)
      // db sync:
      db.todos.update(id, { done: todo.done }).then().catch()
    }
  }

  function deleteTodo(id: string) {
    list.value = _reject(list.value, { id })
    // db sync:
    db.todos.delete(id).then().catch()
  }

  // Export
  return {
    // State
    list,
    activeQuery,
    results,
    // Getters
    find,
    all, allSearch,
    open, openSearch,
    done, doneSearch,
    forProject, forProjectSearch,
    forContext, forContextSearch,
    forHashtag, forHashtagSearch,
    forPriority, forPrioritySearch,
    // Actions
    fetchTodos,
    searchTodos,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo
  }
})
