import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useListsStore } from '../lists'

describe('Lists Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds lists', () => {
    const lists = useListsStore()
    let count = lists.list.data.length
    lists.addList('Get milk')
    expect(lists.list.data.length).toBe(count + 1)
  })

  it('updates lists', () => {
    const lists = useListsStore()
    lists.addList('Get milk')
    var id = lists.list.data[0].id
    expect(lists.list.data[0].name).toBe('Get milk')
    lists.updateList(id, 'Get bread')
    expect(lists.list.data[0].name).toBe('Get bread')
  })

  it('removes lists', () => {
    const lists = useListsStore()
    lists.addList('Get milk')
    let count = lists.list.data.length
    var id = lists.list.data[0].id
    lists.deleteList(id)
    expect(lists.list.data.length).toBe(count - 1)
  })
})
