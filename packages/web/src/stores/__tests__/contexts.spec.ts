import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useContextsStore } from '../contexts'

describe('Contexts Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it.todo('adds contexts', () => {
    // const contexts = useContextsStore()
    // let count = contexts.list.data.length
    // contexts.addContext('Get milk')
    // expect(contexts.list.data.length).toBe(count + 1)
  })

  it.todo('updates contexts', () => {
    // const contexts = useContextsStore()
    // contexts.addContext('Get milk')
    // var id = contexts.list.data[0].shortName
    // expect(contexts.list.data[0].shortName).toBe('Get milk')
    // contexts.updateContext(id, 'Get bread')
    // expect(contexts.list.data[0].shortName).toBe('Get bread')
  })

  it.todo('removes contexts', () => {
    // const contexts = useContextsStore()
    // contexts.addContext('Get milk')
    // let count = contexts.list.data.length
    // var id = contexts.list.data[0].shortName
    // contexts.deleteContext(id)
    // expect(contexts.list.data.length).toBe(count - 1)
  })
})
