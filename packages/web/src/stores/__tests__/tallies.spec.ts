import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useTalliesStore } from '../tallies'
import { useTodosStore } from '../todos'
import { useIntervalsStore } from '../intervals'
import { useCommentsStore } from '../comments'

describe('Tallies Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useTalliesStore().initStore()
    useTodosStore().initStore()
    // TODO: This... shouldn't be necessary:
    //       It is, however, because the todo
    //       store being invoked for deleteTodo
    //       also invokes the deleteInterval
    //       action.
    useIntervalsStore().initStore()
    useCommentsStore().initStore()
  })

  it.todo('returns total for todo', () => {})

  it('adds tallies', () => {
    const todos = useTodosStore()
    const tallies = useTalliesStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    let count = tallies.list.data.length
    tallies.addTally(todoId, new Date().toISOString(), 1)
    expect(tallies.list.data.length).toBe(count + 1)
  })

  it('removes tallies', () => {
    const todos = useTodosStore()
    const tallies = useTalliesStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    tallies.addTally(todoId, new Date().toISOString())
    let count = tallies.list.data.length
    var id = tallies.list.data[0].id
    tallies.deleteTally(id)
    expect(tallies.list.data.length).toBe(count - 1)
  })

  it('is deleted automatically when the todo is deleted', () => {
    const name = String(expect.getState().currentTestName)
    const todos = useTodosStore()
    const tallies = useTalliesStore()
    todos.addTodo(name)
    let todoId = todos.list.data.find(todo => todo.text === name).id

    for(var i = 0; i < 10; i++){
      tallies.addTally(todoId, new Date().toISOString(), 300000)
    }

    let count = tallies.list.data.length
    todos.deleteTodo(todoId)
    expect(tallies.list.data.length).toBe(count - 10)
  })
})
