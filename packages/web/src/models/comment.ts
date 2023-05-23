import type { UUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { Collection } from 'lokijs'

import db from '../plugins/loki'
import { Todo } from './todo'

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
  constructor(comment: CommentInterface) {
    this.collection = Comment.init()

    this.id = (comment.id || uuidv4()) as UUID
    this.todoId = comment.todoId
    this.dateOf = comment.dateOf || new Date().toISOString()
    this.text = comment.text
    this.meta = comment.meta
    this.$loki = comment.$loki
  }

  // Class methods
  static init() {
    var collection = db.getCollection('comments')

    if(!collection){
      collection = db.addCollection('comments', { unique: ['id'], indices: ['id', 'todoId'], autoupdate: true })
    }

    return collection
  }

  static all() {
    this.init().data.map((t: CommentInterface) => new Comment(t))
  }

  static where(query: object) {
    return this.init().find(query).map((t: CommentInterface) => new Comment(t))
  }

  static find(id: UUID) {
    return new Comment(Comment.init().find({ id })[0])
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
    this.collection.insert({ id: this.id, todoId: this.todoId, dateOf: this.dateOf, text: this.text })
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }

  // TODO: This should be a static method.
  destroyWhere(query: object) {
    this.collection.findAndRemove(query)
  }
}

export { Comment }
