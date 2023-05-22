import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useTodosStore } from '../todos'
import { useIntervalsStore } from '../intervals'
import { useTalliesStore } from '../tallies'

describe('Todos Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useTodosStore().initStore()
    useIntervalsStore().initStore()
    useTalliesStore().initStore()
  })

  it('adds todos', () => {
    const todos = useTodosStore()
    let count = todos.list.data.length
    todos.addTodo('Get milk')
    expect(todos.list.data.length).toBe(count + 1)
  })

  it('updates todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    var id = todos.list.data[0].id
    expect(todos.list.data[0].text).toBe('Get milk')
    todos.updateTodo(id, 'Get bread')
    expect(todos.list.data[0].text).toBe('Get bread')
  })

  it('toggles todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    var id = todos.list.data[0].id
    expect(todos.list.data[0].done).toBeFalsy
    todos.toggleTodo(id)
    expect(todos.list.data[0].done).toBeTruthy
    todos.toggleTodo(id)
    expect(todos.list.data[0].done).toBeFalsy
  })

  it('removes todos', () => {
    const todos = useTodosStore()
    todos.addTodo('Get milk')
    let count = todos.list.data.length
    var id = todos.list.data[0].id
    todos.deleteTodo(id)
    expect(todos.list.data.length).toBe(count - 1)
  })
})
