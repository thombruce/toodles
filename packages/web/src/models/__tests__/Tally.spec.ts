import { describe, it, expect, beforeEach } from 'vitest'
import { Tally } from '../Tally'
import { createPinia, setActivePinia } from 'pinia'
import { useTalliesStore } from '@/stores/tallies'

describe('Tally', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new todo', () => {
    expect(new Tally({ todoId: 'foo' }, useTalliesStore().list)).toBeInstanceOf(Tally)
  })
})
