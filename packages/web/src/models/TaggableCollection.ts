import { BaseCollection } from './BaseCollection'

class TaggableCollection extends BaseCollection {
  // Constructor
  constructor() {
    super('taggables', { indices: ['todoId', 'tagId'] })
  }
}

export { TaggableCollection }
