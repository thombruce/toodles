import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import { useTalliesStore } from '@/stores/tallies'
import TallyCounter from '../TallyCounter.vue'

const wrapper = mount(TallyCounter, {
  props: {
    todoId: "someId"
  }
})

describe('TallyCounter', () => {
  beforeEach(() => {
    // TODO: We should probably createTestingPinia and setup mocks of internal actions
    setActivePinia(createPinia())
    useTalliesStore().initStore()
    useTodosStore().initStore()
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<button')
  })
})
