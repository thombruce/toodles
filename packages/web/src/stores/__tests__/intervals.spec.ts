import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useIntervalsStore } from '../intervals'
import { useTodosStore } from '../todos'

// TODO: Replace 'todos' with 'store'; do same in todos spec for reusability.

describe('Intervals Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it.todo('returns total for todo', () => {})

  it('returns active intervals', () => {
    const todos = useTodosStore()
    const intervals = useIntervalsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    intervals.startInterval(todoId)
    expect(intervals.activeForTodo(todoId).createdAt).toBeLessThanOrEqual(Date.now())
  })

  it('adds intervals', () => {
    const todos = useTodosStore()
    const intervals = useIntervalsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    let count = intervals.list.data.length
    intervals.addInterval(todoId, '2016-11-1', 300000)
    expect(intervals.list.data.length).toBe(count + 1)
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
    expect(intervals.list.data[0].meta.created).toBeLessThanOrEqual(Date.now())
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

  it('is deleted automatically when the todo is deleted', () => {
    const name = String(expect.getState().currentTestName)
    const todos = useTodosStore()
    const intervals = useIntervalsStore()
    todos.addTodo(name)
    let todoId = todos.list.data.find(todo => todo.text === name).id

    for(var i = 0; i < 10; i++){
      intervals.addInterval(todoId, new Date().toISOString(), 300000)
    }

    let count = intervals.list.data.length
    todos.deleteTodo(todoId)
    expect(intervals.list.data.length).toBe(count - 10)
  })
})
