import { Collection } from 'lokijs'

// TODO: Prefer not to do this; what alternatives exist?
import { Base, type BaseInterface } from './Base'

interface TodoInterface extends BaseInterface {
  name: string
  done?: string | null // ISO-8601 or null
  created: string // ISO-8601
}

class Todo extends Base implements TodoInterface {
  name: string
  done: string | null
  created: string

  // Constructor
  constructor(todo: string | TodoInterface, collection: Collection) {
    if (typeof todo === 'string') {
      super({}, collection)

      this.name = todo
      this.done = null
      this.created = new Date().toISOString()
    } else {
      super(todo, collection)

      this.name = todo.name
      this.done = todo.done || null
      this.created = todo.created || new Date().toISOString()
    }
  }

  // Class methods

  // Instance methods: Getters
  get projects() {
    return this.name.match(/(?<=(?:^|\s)\+)\S+/g)
  }

  get contexts() {
    return this.name.match(/(?<=(?:^|\s)@)\S+/g)
  }

  get tags() {
    return this.name.match(/(?<=^|\s)[^\s:]+?:[^\s:]+(?=$|\s)/g)
  }

  // Instance methods: Actions
  save() {
    super.save()
  }

  update(name: string) {
    super.update({ name })
  }

  toggle() {
    var currentTime = new Date().toISOString()
    var todo = Todo.find(this.id, this.collection) as Todo
    if (todo.done) {
      this.collection.update({ ...todo, ...{ done: null, collection: undefined } })
    } else {
      this.collection.update({ ...todo, ...{ done: currentTime, collection: undefined } })
    }
  }

  destroy() {
    super.destroy()
  }
}

export { Todo }
