import { describe, it, expect, beforeEach } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useTodosStore } from '../todos'

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds todos', () => {
    const todos = useTodosStore()
    expect(todos.list.length).toBe(0)
    todos.addTodo('Get milk')
    expect(todos.list.length).toBe(1)
  })

  it('toggles todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    var id = todos.list[0].id
    expect(todos.list[0].done).toBeFalsy
    todos.toggleTodo(id)
    expect(todos.list[0].done).toBeTruthy
    todos.toggleTodo(id)
    expect(todos.list[0].done).toBeFalsy
  })

  it('removes todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    expect(todos.list.length).toBe(1)
    var id = todos.list[0].id
    todos.deleteTodo(id)
    expect(todos.list.length).toBe(0)
  })
})
