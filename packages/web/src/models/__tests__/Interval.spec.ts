import { describe, it, expect, beforeEach } from 'vitest'
import { Interval } from '../Interval'
import { createPinia, setActivePinia } from 'pinia'
import { useIntervalsStore } from '@/stores/intervals'
import type { UUID } from 'crypto'

describe('Interval', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new todo', () => {
    expect(new Interval({ todoId: 'foo' as UUID }, useIntervalsStore().list)).toBeInstanceOf(Interval)
  })
})
