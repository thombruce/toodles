import { Collection } from 'lokijs'

import { Base, type BaseInterface } from './Base'
import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'

interface ProjectInterface extends BaseInterface {
  name: string
}

class Project extends Base implements ProjectInterface {
  name: string

  // Constructor
  constructor(project: ProjectInterface, collection: Collection) {
    super(project, collection)

    this.name = project.name
  }

  // Class methods

  // Instance methods: Getters
  get todos() {
    return Todo.where({ projectId: this.id }, useTodosStore().list)
  }

  // Instance methods: Actions
}

export { Project }
