import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { reject as _reject, findIndex as _findIndex, orderBy as _orderBy } from 'lodash'

import { Todo } from '../models/Todo'
import { db } from '@/plugins/dexie'

import { tokenize } from '@/plugins/lunr'
import Dexie from 'dexie'

// Searches for todos matching ALL words
function advancedSearch(query: string) {
  const prefixes = tokenize(query)
  return db.transaction('r', db.todos, function*(): any {
    // Parallell search for all prefixes - just select resulting primary keys
    const results = yield Dexie.Promise.all(prefixes.map(prefix =>
      db.todos
        .where('tokens')
        .startsWith(prefix)
        .primaryKeys()))

    // Intersect result set of primary keys
    const reduced = results
      .reduce((a: string[], b: string[]) => {
        const set = new Set(b)
        return a.filter((k: string) => set.has(k))
      })

    // Finally select entire documents from intersection
    return yield db.todos.where('id').anyOf(reduced).toArray()
  })
}

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref([] as Todo[])
  const results = ref([] as Todo[])

  // Getters
  const find = computed(() => (id: string) => {
    return list.value.find(t => t.id === id)
  })

  const all = computed(() => () => {
    const todos = results.value.length > 0 ? results.value : list.value
    const filtered = todos
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const open = computed(() => () => {
    const todos = results.value.length > 0 ? results.value : list.value
    const filtered = todos.filter(t => !t.done)
    return _orderBy(filtered, ['priority', 'created'], ['asc', 'asc'])
  })

  const done = computed(() => () => {
    const todos = results.value.length > 0 ? results.value : list.value
    const filtered = todos.filter(t => t.done)
    return _orderBy(filtered, ['priority', 'created'], ['asc', 'asc'])
  })

  const forProject = computed(() => (project: string) => {
    const todos = results.value.length > 0 ? results.value : list.value
    const filtered = todos.filter(t => new RegExp(`\\${project}`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forContext = computed(() => (context: string) => {
    const todos = results.value.length > 0 ? results.value : list.value
    const filtered = todos.filter(t => new RegExp(`${context}`).test(t.description))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  const forPriority = computed(() => (priority: string) => {
    const todos = results.value.length > 0 ? results.value : list.value
    const filtered = todos.filter(t => t.priority === priority.replace(/[()]/g, ''))
    return _orderBy(filtered, ['done', 'priority', 'created'], ['desc', 'asc', 'asc'])
  })

  // Actions
  async function fetchTodos() {
    const items = await db.todos.toArray()
    list.value = items
  }

  async function searchTodos(query: string) {
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
  return {
    // State
    list,
    results,
    // Getters
    find, all, open, done, forProject, forContext, forPriority,
    // Actions
    fetchTodos, searchTodos, addTodo, updateTodo, toggleTodo, deleteTodo
  }
})
