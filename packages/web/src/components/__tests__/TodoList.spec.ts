import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

// import { useTodosStore } from '@/stores/todos'
import TodoList from '../TodoList.vue'

describe('TodoList', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoList, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        todos: []
      }
    })
    expect(wrapper.html()).toContain('<ul')
  })
})
