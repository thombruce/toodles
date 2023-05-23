import type { UUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { Collection } from 'lokijs'

import db from '../plugins/loki'
import { Todo } from './todo'

interface IntervalInterface {
  id?: UUID,
  todoId: UUID,
  dateOf?: string,
  duration?: number,
  meta?: any
  $loki?: number
}

class Interval implements IntervalInterface {
  collection: Collection

  id: UUID
  todoId: UUID
  dateOf: string
  duration?: number
  meta?: any
  $loki?: number

  // Constructor
  constructor(interval: IntervalInterface, collection: Collection) {
    this.collection = collection

    this.id = (interval.id || uuidv4()) as UUID
    this.todoId = interval.todoId
    this.dateOf = interval.dateOf || new Date().toISOString()
    this.duration = interval.duration
    this.meta = interval.meta
    this.$loki = interval.$loki
  }

  // Class methods
  static all(collection: Collection) {
    collection.data.map((t: IntervalInterface) => new Interval(t))
  }

  static where(query: object, collection: Collection) {
    return collection.find(query).map((t: IntervalInterface) => new Interval(t, collection))
  }

  static find(id: UUID, collection: Collection) {
    return new Interval(Interval.init().find({ id })[0], collection)
  }

  // Instance methods: Getters
  // get todo() {
  //   // Oh, how would we invoke the todo collection?
  //   return Todo.find(this.todoId)
  // }

  get createdAt() {
    return this.meta?.created
  }

  get updatedAt() {
    return this.meta?.updated
  }

  // Instance methods: Actions
  save() {
    this.collection.insert({ id: this.id, todoId: this.todoId, dateOf: this.dateOf, duration: this.duration })
  }
  
  start() {
    // Ah, whoops. We do need the todo collection initialised then.
    if (this.todo.done) this.todo.toggle()
    this.collection.insert({ id: this.id, todoId: this.todo.id, dateOf: this.dateOf })
  }

  stop() {
    if (!this.createdAt || this.duration) return
    var interval = Interval.find(this.id, this.collection)
    var duration = Date.now() - this.createdAt    
    this.collection.update({ ...interval, ...{ duration } })
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }

  static destroyWhere(query: object, collection: Collection) {
    collection.findAndRemove(query)
  }
}

export { Interval }
