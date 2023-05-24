import { Collection } from 'lokijs'

import { Base, type BaseInterface } from './Base'
import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'

interface ListInterface extends BaseInterface {
  name: string
}

class List extends Base implements ListInterface {
  name: string

  // Constructor
  constructor(list: ListInterface, collection: Collection) {
    super(list, collection)

    this.name = list.name
  }

  // Class methods

  // Instance methods: Getters
  get todos() {
    return Todo.where({ listId: this.id }, useTodosStore().list)
  }

  // Instance methods: Actions
}

export { List }
