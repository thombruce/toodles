import { BaseCollection } from './BaseCollection'

class ContextableCollection extends BaseCollection {
  // Constructor
  constructor() {
    super('contextables', { indices: ['todoId', 'contextId'] })
  }
}

export { ContextableCollection }
