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
  constructor(interval: IntervalInterface) {
    this.collection = Interval.init()

    this.id = (interval.id || uuidv4()) as UUID
    this.todoId = interval.todoId
    this.dateOf = interval.dateOf || new Date().toISOString()
    this.duration = interval.duration
    this.meta = interval.meta
    this.$loki = interval.$loki
  }

  // Class methods
  static init() {
    var collection = db.getCollection('intervals')

    if(!collection){
      collection = db.addCollection('intervals', { unique: ['id'], indices: ['id', 'todoId'], autoupdate: true })
    }

    return collection
  }

  static all() {
    this.init().data.map((t: IntervalInterface) => new Interval(t))
  }

  static where(query: object) {
    return this.init().find(query).map((t: IntervalInterface) => new Interval(t))
  }

  static find(id: UUID) {
    return new Interval(Interval.init().find({ id })[0])
  }

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId)
  }

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
    if (this.todo.done) this.todo.toggle()
    this.collection.insert({ id: this.id, todoId: this.todo.id, dateOf: this.dateOf })
  }

  stop() {
    if (!this.createdAt || this.duration) return
    var interval = Interval.find(this.id)
    var duration = Date.now() - this.createdAt    
    this.collection.update({ ...interval, ...{ duration } })
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }

  // TODO: This should be a static method.
  destroyWhere(query: object) {
    this.collection.findAndRemove(query)
  }
}

export { Interval }
