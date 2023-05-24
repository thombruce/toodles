import { describe, it, expect, beforeEach } from 'vitest'
import { List } from '../List'
import { useListsStore } from '@/stores/lists'
import { createPinia, setActivePinia } from 'pinia'

describe('List', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new list', () => {
    expect(new List({ name: 'My List' }, useListsStore().list)).toBeInstanceOf(List)
  })
})
