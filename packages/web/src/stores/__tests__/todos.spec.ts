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

  it('removes todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    expect(todos.list.length).toBe(1)
    todos.deleteTodo('Get milk')
    expect(todos.list.length).toBe(0)
  })
})
