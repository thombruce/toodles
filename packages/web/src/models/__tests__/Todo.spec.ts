import { describe, it, expect, beforeEach } from 'vitest'
import { Todo } from '../Todo'
import { useTodosStore } from '@/stores/todos'
import { createPinia, setActivePinia } from 'pinia'

describe('Todo', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useTodosStore().initStore()
  })

  it('constructs a new todo', () => {
    expect(new Todo('Get milk!', useTodosStore().list)).toBeInstanceOf(Todo)
  })
})
