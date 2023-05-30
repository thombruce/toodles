import { Collection } from 'lokijs'

import { Base, type BaseInterface } from './Base'
import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Taggable } from './Taggable'
import { useTagsStore } from '@/stores/tags'

interface TagInterface extends BaseInterface {
  key: string
  value: string
}

class Tag extends Base implements TagInterface {
  key: string
  value: string

  // Constructor
  constructor(tag: TagInterface, collection: Collection) {
    super(tag, collection)

    this.key = tag.key
    this.value = tag.value
  }

  // Class methods
  static find(query: string | object, collection: Collection) {
    if (typeof query === 'string') query = { id: query }
    const tag = collection.find(query)[0]
    if (tag) return new this(tag, collection)
  }

  static findOrCreateBy(query: TagInterface, collection: Collection) {
    let tag = Tag.find(query, collection)
    if (!tag) {
      tag = new this(query, collection)
      tag.save()
    }
    return tag
  }

  // Instance methods: Getters
  get displayName() {
    return this.key + ':' + this.value
  }

  get todos() {
    // TODO: We should probably be using eqJoin for this.
    return Taggable.where({ tagId: this.id }, useTagsStore().taggables).map((p) => {
      // TODO: Since where will yield an array, and find should accept an array of IDs...
      //       Try to make this more efficient by performing a single query.
      return Todo.find(p.todoId, useTodosStore().list)
    })
  }

  // Instance methods: Actions
  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }
}

export { Tag }
