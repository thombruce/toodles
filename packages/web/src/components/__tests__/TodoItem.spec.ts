import { describe, it, expect, beforeEach, vi } from 'vitest'

import { VueWrapper, mount } from '@vue/test-utils'

import TodoItem from '../TodoItem.vue'
import { Todo } from '@/models/Todo'
import { createTestingPinia } from '@pinia/testing'

vi.mock('vue-router', () => ({
  RouterLink: vi.fn()
}))

describe('TodoItem', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    const todo = new Todo("Get milk!")

    wrapper = mount(TodoItem, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        todo: todo
      }
    })
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<div')
    expect(wrapper.html()).toContain('<button')
  })
})
