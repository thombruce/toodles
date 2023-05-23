import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useCommentsStore } from '../comments'
import { useTodosStore } from '../todos'
import { useIntervalsStore } from '../intervals'
import { useTalliesStore } from '../tallies'

describe('Comments Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useCommentsStore().initStore()
    useTodosStore().initStore()
    // TODO: This... shouldn't be necessary:
    //       It is, however, because the todo
    //       store being invoked for deleteTodo
    //       also invokes the deleteInterval
    //       action.
    useIntervalsStore().initStore()
    useTalliesStore().initStore()
  })

  it.todo('returns total for todo', () => {})

  it('adds comments', () => {
    const todos = useTodosStore()
    const comments = useCommentsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    let count = comments.list.data.length
    comments.addComment(todoId, new Date().toISOString(), "Looks good to me!")
    expect(comments.list.data.length).toBe(count + 1)
  })

  it('removes comments', () => {
    const todos = useTodosStore()
    const comments = useCommentsStore()
    todos.addTodo('Get milk')
    let todoId = todos.list.data[0].id

    comments.addComment(todoId, new Date().toISOString(), "Looks good to me!")
    let count = comments.list.data.length
    var id = comments.list.data[0].id
    comments.deleteComment(id)
    expect(comments.list.data.length).toBe(count - 1)
  })

  it('is deleted automatically when the todo is deleted', () => {
    const name = String(expect.getState().currentTestName)
    const todos = useTodosStore()
    const comments = useCommentsStore()
    todos.addTodo(name)
    let todoId = todos.list.data.find(todo => todo.text === name).id

    for(var i = 0; i < 10; i++){
      comments.addComment(todoId, new Date().toISOString(), "Looks good to me!")
    }

    let count = comments.list.data.length
    todos.deleteTodo(todoId)
    expect(comments.list.data.length).toBe(count - 10)
  })
})
