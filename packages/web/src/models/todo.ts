import type { UUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { Collection } from 'lokijs'

import db from '../plugins/loki'
import { Interval } from './interval'

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
  constructor(todo: string | TodoInterface) {
    this.collection = Todo.init()

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
  static init() {
    var collection = db.getCollection('todos')

    if(!collection){
      collection = db.addCollection('todos', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    return collection
  }

  static all() {
    this.init().data.map((t: TodoInterface) => new Todo(t))
  }

  static where() {}

  static find(id: UUID) {
    return new Todo(Todo.init().find({ id })[0])
  }

  // Instance methods: Getters
  get intervals() {
    return Interval.where({ todoId: this.id })
  }

  get tallies() {
    return [] // TODO
  }

  get todos() {
    return [] // TODO
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
    var todo = Todo.find(this.id)
    this.collection.update({ ...todo, ...{ text } })
  }

  toggle() {
    var currentTime = Date.now()
    var todo = Todo.find(this.id)
    if (todo.done) {
      this.collection.update({ ...todo, ...{ done: null } })
    } else {
      // const intervals = useIntervalsStore()
      // let activeInterval
      // if (activeInterval = intervals.activeForTodo(todo.id)) intervals.stopInterval(activeInterval.id)
      this.collection.update({ ...todo, ...{ done: currentTime } })
    }
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }
}

export { Todo }
