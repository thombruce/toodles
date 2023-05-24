import { describe, it, expect, beforeEach } from 'vitest'
import { Comment } from '../Comment'
import { createPinia, setActivePinia } from 'pinia'
import { useCommentsStore } from '@/stores/comments'
import type { UUID } from 'crypto'

describe('Comment', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new todo', () => {
    expect(new Comment({ todoId: 'foo' as UUID, text: 'Looks good to me!' }, useCommentsStore().list)).toBeInstanceOf(Comment)
  })
})
