import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import { useIntervalsStore } from '@/stores/intervals'
import ActiveInterval from '../ActiveInterval.vue'

vi.mock('vue-router', () => ({
  RouterLink: vi.fn()
}))

const wrapper = mount(ActiveInterval, {
  props: {
    todoId: 'someId',
    startedAt: Date.now() - 300000
  }
})

describe('ActiveInterval', () => {
  beforeEach(() => {
    // TODO: We should probably createTestingPinia and setup mocks of internal actions
    setActivePinia(createPinia())
    useIntervalsStore().initStore()
    useTodosStore().initStore()
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<span')
  })
})
