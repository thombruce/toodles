import { describe, it, expect, beforeEach } from 'vitest'
import { Context } from '../Context'
import { useContextsStore } from '@/stores/contexts'
import { createPinia, setActivePinia } from 'pinia'

describe('Context', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new context', () => {
    expect(new Context({ shortName: 'myContext' }, useContextsStore().list)).toBeInstanceOf(Context)
  })
})
