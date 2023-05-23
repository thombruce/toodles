import type { UUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { Collection } from 'lokijs'

import { Interval } from './interval'
import { Tally } from './tally'
import { Comment } from './comment'

// TODO: Prefer not to do this; what alternatives exist?
import { useIntervalsStore } from '@/stores/intervals'
import { useTalliesStore } from '@/stores/tallies'
import { useCommentsStore } from '@/stores/comments'

interface TodoInterface {
  id?: UUID
  text: string
  done?: EpochTimeStamp | null
  meta?: any
  $loki?: number
}

class Todo implements TodoInterface {
  collection: Collection

  id: UUID
  text: string
  done: EpochTimeStamp | null
  meta?: any
  $loki?: number

  // Constructor
  constructor(todo: string | TodoInterface, collection: Collection) {
    this.collection = collection

    if (typeof todo === 'string') {
      this.id = uuidv4() as UUID
      this.text = todo
      this.done = null
    } else {
      this.id = (todo.id || uuidv4()) as UUID
      this.text = todo.text
      this.done = todo.done || null
      this.meta = todo.meta
      this.$loki = todo.$loki
    }
  }

  // Class methods
  static all(collection: Collection) {
    collection.data.map((t: TodoInterface) => new Todo(t, collection))
  }

  static where() {}

  static find(id: UUID, collection: Collection) {
    return new Todo(collection.find({ id })[0], collection)
  }

  // Instance methods: Getters
  get intervals() {
    return Interval.where({ todoId: this.id }, useIntervalsStore().list)
  }

  get tallies() {
    return Tally.where({ todoId: this.id }, useTalliesStore().list)
  }

  get comments() {
    return Comment.where({ todoId: this.id }, useCommentsStore().list)
  }

  get activeInterval() {
    return Interval.where({ $and: [{ todoId: this.id }, { duration: { $exists: false } }] }, useIntervalsStore().list)[0]
  }

  get createdAt() {
    return this.meta?.created
  }

  get updatedAt() {
    return this.meta?.updated
  }

  // Instance methods: Actions
  save() {
    // TODO: Handle save of existing Todo
    this.collection.insert({ id: this.id, text: this.text, done: this.done })
  }

  update(text: string) {
    var todo = Todo.find(this.id, this.collection)
    this.collection.update({ ...todo, ...{ text, collection: undefined } })
  }

  toggle() {
    var currentTime = Date.now()
    var todo = Todo.find(this.id, this.collection)
    if (todo.done) {
      this.collection.update({ ...todo, ...{ done: null, collection: undefined } })
    } else {
      this.activeInterval?.stop()
      this.collection.update({ ...todo, ...{ done: currentTime, collection: undefined } })
    }
  }

  destroy() {
    Interval.destroyWhere({ todoId: this.id }, useIntervalsStore().list)
    Tally.destroyWhere({ todoId: this.id }, useTalliesStore().list)
    Comment.destroyWhere({ todoId: this.id }, useCommentsStore().list)
    this.collection.chain().find({ id: this.id }).remove()
  }
}

export { Todo }
