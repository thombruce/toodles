import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import { useIntervalsStore } from '@/stores/intervals'
import IntervalTimer from '../IntervalTimer.vue'

const wrapper = mount(IntervalTimer, {
  props: {
    todoId: "someId"
  }
})

describe('IntervalTimer', () => {
  beforeEach(() => {
    // TODO: We should probably createTestingPinia and setup mocks of internal actions
    setActivePinia(createPinia())
    useIntervalsStore().initStore()
    useTodosStore().initStore()
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<button')
  })
})
