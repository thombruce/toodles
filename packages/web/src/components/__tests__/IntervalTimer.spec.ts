import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import { useIntervalsStore } from '@/stores/intervals'
import IntervalTimer from '../IntervalTimer.vue'
import { Todo } from '@/models/todo'

const todo = new Todo("Get milk!", useTodosStore().list)
todo.save()

const wrapper = mount(IntervalTimer, {
  props: {
    todoId: todo.id
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
