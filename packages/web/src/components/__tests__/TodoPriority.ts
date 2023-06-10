import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

// import { useTodosStore } from '@/stores/todos'
import TodoPriority from '../TodoPriority.vue'

describe('TodoPriority', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoPriority, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        props: {
          priority: '(A)'
        },
      },
    })
    expect(wrapper.html()).toContain('<a')
    expect(wrapper.html()).toContain('text-red-500')
    expect(wrapper.text()).toContain('(A)')
  })
})
