import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { useIntervalsStore } from '../intervals'
import type { UUID } from 'crypto'

// TODO: Replace 'todos' with 'store'; do same in todos spec for reusability.

describe('Intervals Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useIntervalsStore().initStore()
  })

  it.todo('returns total for todo', () => {})

  it('returns active intervals', () => {
    const todos = useIntervalsStore()
    const todoId = uuidv4() as UUID
    todos.startInterval(todoId as UUID)
    expect(todos.activeForTodo(todoId).startedAt).toBeLessThanOrEqual(Date.now())
  })

  it('starts intervals', () => {
    const todos = useIntervalsStore()
    let count = todos.list.data.length
    todos.startInterval(uuidv4() as UUID)
    expect(todos.list.data.length).toBe(count + 1)
  })

  it('stops intervals', () => {
    const todos = useIntervalsStore()
    todos.startInterval(uuidv4() as UUID)
    var id = todos.list.data[0].id
    expect(todos.list.data[0].startedAt).toBeLessThanOrEqual(Date.now())
    todos.stopInterval(id)
    expect(todos.list.data[0].duration).toBeGreaterThan(0)
  })

  it('removes intervals', () => {
    const todos = useIntervalsStore()
    todos.startInterval(uuidv4() as UUID)
    let count = todos.list.data.length
    var id = todos.list.data[0].id
    todos.deleteInterval(id)
    expect(todos.list.data.length).toBe(count - 1)
  })
})
