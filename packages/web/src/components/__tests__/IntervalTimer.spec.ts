import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { VueWrapper, mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import IntervalTimer from '../IntervalTimer.vue'
import { Todo } from '@/models/Todo'

describe('IntervalTimer', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    // TODO: We should probably createTestingPinia and setup mocks of internal actions
    setActivePinia(createPinia())

    const todo = new Todo("Get milk!", useTodosStore().list)
    todo.save()

    wrapper = mount(IntervalTimer, {
      props: {
        todoId: todo.id
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<button')
  })
})
