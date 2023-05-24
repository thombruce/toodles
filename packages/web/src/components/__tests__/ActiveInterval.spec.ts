import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { VueWrapper, mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import { useIntervalsStore } from '@/stores/intervals'
import ActiveInterval from '../ActiveInterval.vue'

vi.mock('vue-router', () => ({
  RouterLink: vi.fn()
}))

describe('ActiveInterval', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    // TODO: We should probably createTestingPinia and setup mocks of internal actions
    setActivePinia(createPinia())
    useIntervalsStore().initStore()
    useTodosStore().initStore()

    wrapper = mount(ActiveInterval, {
      props: {
        todoId: 'someId',
        startedAt: Date.now() - 300000
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<span')
  })
})
