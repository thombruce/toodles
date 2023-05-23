import type { UUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { Collection } from 'lokijs'

import db from '../plugins/loki'
import { Todo } from './todo'

interface TallyInterface {
  id?: UUID,
  todoId: UUID,
  dateOf?: string,
  count?: number,
  meta?: any
  $loki?: number
}

class Tally implements TallyInterface {
  collection: Collection

  id: UUID
  todoId: UUID
  dateOf: string
  count: number
  meta?: any
  $loki?: number

  // Constructor
  constructor(tally: TallyInterface) {
    this.collection = Tally.init()

    this.id = (tally.id || uuidv4()) as UUID
    this.todoId = tally.todoId
    this.dateOf = tally.dateOf || new Date().toISOString()
    this.count = tally.count || 1
    this.meta = tally.meta
    this.$loki = tally.$loki
  }

  // Class methods
  static init() {
    var collection = db.getCollection('tallies')

    if(!collection){
      collection = db.addCollection('tallies', { unique: ['id'], indices: ['id', 'todoId'], autoupdate: true })
    }

    return collection
  }

  static all() {
    this.init().data.map((t: TallyInterface) => new Tally(t))
  }

  static where(query: object) {
    return this.init().find(query).map((t: TallyInterface) => new Tally(t))
  }

  static find(id: UUID) {
    return new Tally(Tally.init().find({ id })[0])
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
    this.collection.insert({ id: this.id, todoId: this.todoId, dateOf: this.dateOf, count: this.count })
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }

  static destroyWhere(query: object) {
    this.init().findAndRemove(query)
  }
}

export { Tally }
