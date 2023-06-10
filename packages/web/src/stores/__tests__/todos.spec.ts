import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useTodosStore } from '../todos'

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const todos = useTodosStore()
    todos.fetchTodos()
  })

  it('adds todos', () => {
    const todos = useTodosStore()
    let count = todos.list.length
    todos.addTodo('Get milk')
    expect(todos.list.length).toBe(count + 1)
  })

  it('updates todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    var id = todos.list[0].id || ''
    expect(todos.find(id)?.description).toBe('Get milk')
    todos.updateTodo(id, 'Get bread')
    expect(todos.find(id)?.description).toBe('Get bread')
  })

  it('toggles todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    var id = todos.list[0].id || ''
    expect(todos.list[0].done).toBeFalsy
    todos.toggleTodo(id)
    expect(todos.list[0].done).toBeTruthy
    todos.toggleTodo(id)
    expect(todos.list[0].done).toBeFalsy
  })

  it('removes todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    let count = todos.list.length
    var id = todos.list[0].id || ''
    todos.deleteTodo(id)
    expect(todos.list.length).toBe(count - 1)
  })
})
