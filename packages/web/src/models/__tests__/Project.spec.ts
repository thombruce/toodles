import { describe, it, expect, beforeEach } from 'vitest'
import { Project } from '../Project'
import { useProjectsStore } from '@/stores/projects'
import { createPinia, setActivePinia } from 'pinia'

describe('Project', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new project', () => {
    expect(new Project({ shortName: 'myProject' }, useProjectsStore().list)).toBeInstanceOf(Project)
  })
})
