import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useIntervalsStore } from '../intervals'
import { useTodosStore } from '../todos'
import type { UUID } from 'crypto'

// TODO: Replace 'todos' with 'store'; do same in todos spec for reusability.

describe('Intervals Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useIntervalsStore().initStore()
    useTodosStore().initStore()
  })

  it.todo('returns total for todo', () => {})

  it('returns active intervals', () => {
    const todos = useTodosStore()
    const intervals = useIntervalsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    intervals.startInterval(todoId as UUID)
    expect(intervals.activeForTodo(todoId).startedAt).toBeLessThanOrEqual(Date.now())
  })

  it('starts intervals', () => {
    const todos = useTodosStore()
    const intervals = useIntervalsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    let count = intervals.list.data.length
    intervals.startInterval(todoId)
    expect(intervals.list.data.length).toBe(count + 1)
  })

  it('stops intervals', () => {
    const todos = useTodosStore()
    const intervals = useIntervalsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    intervals.startInterval(todoId)
    var id = intervals.list.data[0].id
    expect(intervals.list.data[0].startedAt).toBeLessThanOrEqual(Date.now())
    intervals.stopInterval(id)
    expect(intervals.list.data[0].duration).toBeGreaterThan(0)
  })

  it('removes intervals', () => {
    const todos = useTodosStore()
    const intervals = useIntervalsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    intervals.startInterval(todoId)
    let count = intervals.list.data.length
    var id = intervals.list.data[0].id
    intervals.deleteInterval(id)
    expect(intervals.list.data.length).toBe(count - 1)
  })
})
