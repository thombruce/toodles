import { describe, it, expect, beforeEach } from 'vitest'
import { Todo } from '../Todo'
import { useTodosStore } from '@/stores/todos'
import { createPinia, setActivePinia } from 'pinia'
import { Project } from '../Project'
import { useProjectsStore } from '@/stores/projects'

describe('Todo', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('constructs a new todo', () => {
    expect(new Todo('Get milk!', useTodosStore().list)).toBeInstanceOf(Todo)
  })

  it('adds projects from todo text', () => {
    new Todo('Build +birdhouse +diy', useTodosStore().list).save()
    expect(Project.find({ shortName: 'birdhouse' }, useProjectsStore().list)).toBeInstanceOf(Project)
    expect(Project.find({ shortName: 'diy' }, useProjectsStore().list)).toBeInstanceOf(Project)
    expect(useProjectsStore().list.data.length).toBe(2)
  })

  it('has associated projects', () => {
    const todo = new Todo('Build +birdhouse +diy', useTodosStore().list)
    todo.save()
    expect(todo.projects.length).toBe(2)
    expect(todo.projects[0]).toBeInstanceOf(Project)
  })
})
