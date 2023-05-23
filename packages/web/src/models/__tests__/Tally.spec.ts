import { describe, it, expect, beforeEach } from 'vitest'
import { Tally } from '../Tally'
import { createPinia, setActivePinia } from 'pinia'
import { useTalliesStore } from '@/stores/tallies'
import type { UUID } from 'crypto'

describe('Tally', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useTalliesStore().initStore()
  })

  it('constructs a new todo', () => {
    expect(new Tally({ todoId: 'foo' as UUID }, useTalliesStore().list)).toBeInstanceOf(Tally)
  })
})
