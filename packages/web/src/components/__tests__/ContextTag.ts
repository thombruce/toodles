import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

// import { useTodosStore } from '@/stores/todos'
import ContextTag from '../ContextTag.vue'

describe('ContextTag', () => {
  it('renders properly', () => {
    const wrapper = mount(ContextTag, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        tag: '@context'
      },
    })
    expect(wrapper.html()).toContain('<a')
    expect(wrapper.text()).toContain('@context')
  })
})
