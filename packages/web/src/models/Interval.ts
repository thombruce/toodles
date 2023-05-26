import { Collection } from 'lokijs'

import { Todo } from './Todo'

// TODO: Prefer not to do this; what alternatives exist?
import { useTodosStore } from '@/stores/todos'
import { Base, type BaseInterface } from './Base'

interface IntervalInterface extends BaseInterface {
  todoId: string,
  dateOf?: string,
  duration?: number,
}

class Interval extends Base implements IntervalInterface {
  todoId: string
  dateOf: string
  duration?: number

  // Constructor
  constructor(interval: IntervalInterface, collection: Collection) {
    super(interval, collection)

    this.todoId = interval.todoId
    this.dateOf = interval.dateOf || new Date().toISOString()
    this.duration = interval.duration
  }

  // Class methods

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId, useTodosStore().list) as Todo
  }

  // Instance methods: Actions
  start() {
    if (this.todo.done) this.todo.toggle()
    this.collection.insert({ id: this.id, todoId: this.todo.id, dateOf: this.dateOf })
  }

  stop() {
    if (!this.createdAt || this.duration) return
    var interval = Interval.find(this.id, this.collection)
    var duration = Date.now() - this.createdAt
    this.collection.update({ ...interval, ...{ duration, collection: undefined } })
  }
}

export { Interval }
