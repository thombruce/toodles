import { Collection } from 'lokijs'

import { Base, type BaseInterface } from './Base'
import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Contextable } from './Contextable'
import { useContextsStore } from '@/stores/contexts'

interface ContextInterface extends BaseInterface {
  shortName: string
}

class Context extends Base implements ContextInterface {
  shortName: string

  // Constructor
  constructor(context: ContextInterface, collection: Collection) {
    super(context, collection)

    this.shortName = context.shortName
  }

  // Class methods
  static find(query: string | object, collection: Collection) {
    if (typeof query === 'string') query = { id: query }
    const context = collection.find(query)[0]
    if (context) return new this(context, collection)
  }

  static findOrCreateBy(query: ContextInterface, collection: Collection) {
    let context = Context.find(query, collection)
    if (!context) {
      context = new this(query, collection)
      context.save()
    }
    return context
  }

  // Instance methods: Getters
  get displayName() {
    return this.shortName
  }

  get todos() {
    // TODO: We should probably be using eqJoin for this.
    return Contextable.where({ contextId: this.id }, useContextsStore().contextables).map((p) => {
      // TODO: Since where will yield an array, and find should accept an array of IDs...
      //       Try to make this more efficient by performing a single query.
      return Todo.find(p.todoId, useTodosStore().list)
    })
  }

  // Instance methods: Actions
  destroy() {
    this.collection.chain().find({ shortName: this.shortName }).remove()
  }
}

export { Context }
