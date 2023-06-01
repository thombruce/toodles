import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

// import { useTodosStore } from '@/stores/todos'
import TodoForm from '../TodoForm.vue'

describe('TodoForm', () => {
  it('renders properly', () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    expect(wrapper.html()).toContain('<form')
  })
})
