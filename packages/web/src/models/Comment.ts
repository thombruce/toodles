import type { UUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { Collection } from 'lokijs'

import db from '../plugins/loki'
import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'

interface CommentInterface {
  id?: UUID,
  todoId: UUID,
  dateOf?: string,
  text: string,
  meta?: any
  $loki?: number
}

class Comment implements CommentInterface {
  collection: Collection

  id: UUID
  todoId: UUID
  dateOf: string
  text: string
  meta?: any
  $loki?: number

  // Constructor
  constructor(comment: CommentInterface, collection: Collection) {
    this.collection = collection

    this.id = (comment.id || uuidv4()) as UUID
    this.todoId = comment.todoId
    this.dateOf = comment.dateOf || new Date().toISOString()
    this.text = comment.text
    this.meta = comment.meta
    this.$loki = comment.$loki
  }

  // Class methods
  static all(collection: Collection) {
    collection.data.map((t: CommentInterface) => new Comment(t, collection))
  }

  static where(query: object, collection: Collection) {
    return collection.find(query).map((t: CommentInterface) => new Comment(t, collection))
  }

  static find(id: UUID, collection: Collection) {
    return new Comment(collection.find({ id })[0], collection)
  }

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId, useTodosStore().list)
  }

  get createdAt() {
    return this.meta?.created
  }

  get updatedAt() {
    return this.meta?.updated
  }

  // Instance methods: Actions
  save() {
    this.collection.insert({ id: this.id, todoId: this.todoId, dateOf: this.dateOf, text: this.text })
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }

  static destroyWhere(query: object, collection: Collection) {
    collection.findAndRemove(query)
  }
}

export { Comment }
