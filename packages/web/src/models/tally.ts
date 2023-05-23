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
  constructor(tally: TallyInterface, collection: Collection) {
    this.collection = collection

    this.id = (tally.id || uuidv4()) as UUID
    this.todoId = tally.todoId
    this.dateOf = tally.dateOf || new Date().toISOString()
    this.count = tally.count || 1
    this.meta = tally.meta
    this.$loki = tally.$loki
  }

  // Class methods
  static all(collection: Collection) {
    collection.data.map((t: TallyInterface) => new Tally(t, collection))
  }

  static where(query: object, collection: Collection) {
    return collection.find(query).map((t: TallyInterface) => new Tally(t, collection))
  }

  static find(id: UUID, collection: Collection) {
    return new Tally(collection.find({ id })[0], collection)
  }

  // Instance methods: Getters
  // get todo() {
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
    this.collection.insert({ id: this.id, todoId: this.todoId, dateOf: this.dateOf, count: this.count })
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }

  static destroyWhere(query: object, collection: Collection) {
    collection.findAndRemove(query)
  }
}

export { Tally }
