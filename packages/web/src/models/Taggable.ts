import { Collection } from 'lokijs'

import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Tag } from './Tag'
import { useTagsStore } from '@/stores/tags'

interface TaggableInterface {
  todoId: string
  tagId: string
}

class Taggable implements TaggableInterface {
  collection: Collection

  todoId: string
  tagId: string

  // Constructor
  constructor(taggable: TaggableInterface, collection: Collection) {
    this.collection = collection
    this.todoId = taggable.todoId
    this.tagId = taggable.tagId
  }

  // Class methods
  static where(query: object, collection: Collection) {
    return collection.find(query).map((t: TaggableInterface) => new this(t, collection))
  }

  static findOrCreateBy(query: TaggableInterface, collection: Collection) {
    let taggable = Taggable.where(query, collection)[0]
    if (!taggable) {
      taggable = new this(query, collection)
      taggable.save()
    }
    return taggable
  }

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId, useTodosStore().list)
  }

  get tag() {
    return Tag.find(this.tagId, useTagsStore().list)
  }

  // Instance methods: Actions
  save() {
    this.collection.insert({ ...this, ...{ collection: undefined } })
  }

  destroy() {
    this.collection.chain().find({ todoId: this.todoId, tagId: this.tagId }).remove()
  }
}

export { Taggable }
