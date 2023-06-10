import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

// import { useTodosStore } from '@/stores/todos'
import ProjectTag from '../ProjectTag.vue'

describe('ProjectTag', () => {
  it('renders properly', () => {
    const wrapper = mount(ProjectTag, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
      props: {
        tag: '+project'
      },
    })
    expect(wrapper.html()).toContain('<a')
    expect(wrapper.text()).toContain('+project')
  })
})
