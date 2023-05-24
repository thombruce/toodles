import { BaseCollection } from './BaseCollection'

class ProjectableCollection extends BaseCollection {
  // Constructor
  constructor() {
    super('projectables', { indices: ['todoId', 'projectId'] })
  }
}

export { ProjectableCollection }
