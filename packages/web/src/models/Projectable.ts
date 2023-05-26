import { Collection } from 'lokijs'

import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Project } from './Project'
import { useProjectsStore } from '@/stores/projects'

interface ProjectableInterface {
  todoId: string
  projectId: string
}

class Projectable implements ProjectableInterface {
  collection: Collection

  todoId: string
  projectId: string

  // Constructor
  constructor(projectable: ProjectableInterface, collection: Collection) {
    this.collection = collection
    this.todoId = projectable.todoId
    this.projectId = projectable.projectId
  }

  // Class methods
  static where(query: object, collection: Collection) {
    return collection.find(query).map((t: ProjectableInterface) => new this(t, collection))
  }

  static findOrCreateBy(query: ProjectableInterface, collection: Collection) {
    let projectable = Projectable.where(query, collection)[0]
    if (!projectable) {
      projectable = new this(query, collection)
      projectable.save()
    }
    return projectable
  }

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId, useTodosStore().list)
  }

  get project() {
    return Project.find(this.projectId, useProjectsStore().list)
  }

  // Instance methods: Actions
  save() {
    this.collection.insert({ ...this, ...{ collection: undefined } })
  }

  destroy() {
    this.collection.chain().find({ todoId: this.todoId, projectId: this.projectId }).remove()
  }
}

export { Projectable }
