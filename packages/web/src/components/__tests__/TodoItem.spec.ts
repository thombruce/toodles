import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { mount } from '@vue/test-utils'

import { useTodosStore } from '@/stores/todos'
import { useIntervalsStore } from '@/stores/intervals'
import TodoItem from '../TodoItem.vue'
import { Todo } from '@/models/todo'

vi.mock('vue-router', () => ({
  RouterLink: vi.fn()
}))

const todo = new Todo("Get milk!", useTodosStore().list)
todo.save()

const wrapper = mount(TodoItem, {
  props: {
    todo: todo
  }
})

describe('TodoItem', () => {
  beforeEach(() => {
    // TODO: We should probably createTestingPinia and setup mocks of internal actions
    setActivePinia(createPinia())
    useIntervalsStore().initStore()
    useTodosStore().initStore()
  })

  it('renders properly', () => {
    expect(wrapper.html()).toContain('<div')
  })
})
