import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { VueWrapper, mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import TodoItem from '../TodoItem.vue'
import { Todo } from '@/models/Todo'

vi.mock('vue-router', () => ({
  RouterLink: vi.fn()
}))

describe('TodoItem', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    // TODO: We should probably createTestingPinia and setup mocks of internal actions
    setActivePinia(createPinia())

    const todo = new Todo("Get milk!", useTodosStore().list)
    todo.save()

    wrapper = mount(TodoItem, {
      props: {
        todo: todo
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<div')
  })
})
