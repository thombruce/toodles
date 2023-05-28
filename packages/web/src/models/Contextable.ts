import { Collection } from 'lokijs'

import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Context } from './Context'
import { useContextsStore } from '@/stores/contexts'

interface ContextableInterface {
  todoId: string
  contextId: string
}

class Contextable implements ContextableInterface {
  collection: Collection

  todoId: string
  contextId: string

  // Constructor
  constructor(contextable: ContextableInterface, collection: Collection) {
    this.collection = collection
    this.todoId = contextable.todoId
    this.contextId = contextable.contextId
  }

  // Class methods
  static where(query: object, collection: Collection) {
    return collection.find(query).map((t: ContextableInterface) => new this(t, collection))
  }

  static findOrCreateBy(query: ContextableInterface, collection: Collection) {
    let contextable = Contextable.where(query, collection)[0]
    if (!contextable) {
      contextable = new this(query, collection)
      contextable.save()
    }
    return contextable
  }

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId, useTodosStore().list)
  }

  get context() {
    return Context.find(this.contextId, useContextsStore().list)
  }

  // Instance methods: Actions
  save() {
    this.collection.insert({ ...this, ...{ collection: undefined } })
  }

  destroy() {
    this.collection.chain().find({ todoId: this.todoId, contextId: this.contextId }).remove()
  }
}

export { Contextable }
