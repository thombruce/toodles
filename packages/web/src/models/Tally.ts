import { Collection } from 'lokijs'

import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Base, type BaseInterface } from './Base'

interface TallyInterface extends BaseInterface {
  todoId: string,
  dateOf?: string,
  count?: number,
}

class Tally extends Base implements TallyInterface {
  todoId: string
  dateOf: string
  count: number

  // Constructor
  constructor(tally: TallyInterface, collection: Collection) {
    super(tally, collection)

    this.todoId = tally.todoId
    this.dateOf = tally.dateOf || new Date().toISOString()
    this.count = tally.count || 1
  }

  // Class methods

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId, useTodosStore().list)
  }

  // Instance methods: Actions
}

export { Tally }
