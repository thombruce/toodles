import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import { useProjectsStore } from '../projects'

describe('Projects Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it.todo('adds projects', () => {
    // const projects = useProjectsStore()
    // let count = projects.list.data.length
    // projects.addProject('Get milk')
    // expect(projects.list.data.length).toBe(count + 1)
  })

  it.todo('updates projects', () => {
    // const projects = useProjectsStore()
    // projects.addProject('Get milk')
    // var id = projects.list.data[0].shortName
    // expect(projects.list.data[0].shortName).toBe('Get milk')
    // projects.updateProject(id, 'Get bread')
    // expect(projects.list.data[0].shortName).toBe('Get bread')
  })

  it.todo('removes projects', () => {
    // const projects = useProjectsStore()
    // projects.addProject('Get milk')
    // let count = projects.list.data.length
    // var id = projects.list.data[0].shortName
    // projects.deleteProject(id)
    // expect(projects.list.data.length).toBe(count - 1)
  })
})
