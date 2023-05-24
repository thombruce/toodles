import { Collection } from 'lokijs'

import { Base, type BaseInterface } from './Base'
import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Projectable } from './Projectable'
import { useProjectsStore } from '@/stores/projects'

interface ProjectInterface extends BaseInterface {
  shortName: string
}

class Project extends Base implements ProjectInterface {
  shortName: string

  // Constructor
  constructor(project: ProjectInterface, collection: Collection) {
    super(project, collection)

    this.shortName = project.shortName
  }

  // Class methods
  static find(shortName: string, collection: Collection) {
    const project = collection.find({ shortName })[0]
    if (project) return new this(project, collection)
  }

  static findOrCreate(shortName: string, collection: Collection) {
    let project = Project.find(shortName, collection)
    if (!project) {
      project = new this({ shortName }, collection)
      project.save()
    }
    return project
  }

  // Instance methods: Getters
  get todos() {
    // TODO: We should probably be using eqJoin for this.
    return Projectable.where({ projectId: this.id }, useProjectsStore().projectables).map((p) => {
      // TODO: Since where will yield an array, and find should accept an array of IDs...
      //       Try to make this more efficient by performing a single query.
      return Todo.find(p.todoId, useTodosStore().list)
    })
  }

  // Instance methods: Actions
  destroy() {
    this.collection.chain().find({ shortName: this.shortName }).remove()
  }
}

export { Project }
