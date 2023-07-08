import { describe, it, expect, beforeEach } from 'vitest'
import { Todo } from '../Todo'
import { createPinia, setActivePinia } from 'pinia'

describe('Todo', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new todo', () => {
    expect(new Todo('Get milk!')).toBeInstanceOf(Todo)
  })

  it('has associated projects', () => {
    const todo = new Todo('Build +birdhouse +diy')
    expect(todo.projects?.length).toBe(2)
    // expect(todo.projects[0]).toBeInstanceOf(Project)
  })

  it('has associated contexts', () => {
    const todo = new Todo('Call dad @phone')
    expect(todo.contexts?.length).toBe(1)
    // expect(todo.projects[0]).toBeInstanceOf(Project)
  })

  it('has associated tags', () => {
    const todo = new Todo('Refactor est:3 time:1.5')
    expect(todo.tags?.length).toBe(2)
    // expect(todo.projects[0]).toBeInstanceOf(Project)
  })
})
