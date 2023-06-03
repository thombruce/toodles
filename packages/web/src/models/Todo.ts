import { Collection } from 'lokijs'

// TODO: Prefer not to do this; what alternatives exist?
import { Base, type BaseInterface } from './Base'

interface TodoInterface extends BaseInterface {
  raw: string
  done?: string | null // ISO-8601 or null
  created: string // ISO-8601
}

class Todo extends Base implements TodoInterface {
  raw: string
  done?: string | null
  created: string

  // Constructor
  constructor(todo: string | TodoInterface, collection: Collection) {
    if (typeof todo === 'string') {
      super({}, collection)

      this.raw = todo
      this.created = new Date().toISOString()
    } else {
      super(todo, collection)

      this.raw = todo.raw
      this.done = todo.done
      this.created = todo.created || new Date().toISOString()
    }
  }

  // Class methods

  // Instance methods: Getters
  get priority() {
    return this.raw.match(/^\([A-Z]\)(?=\s)/)?.[0]
  }

  get projects() {
    return this.raw.match(/(?<=(?:^|\s)\+)\S+/g)
  }

  get contexts() {
    return this.raw.match(/(?<=(?:^|\s)@)\S+/g)
  }

  get tags() {
    return this.raw.match(/(?<=^|\s)[^\s:]+?:[^\s:]+(?=$|\s)/g)
  }

  // Instance methods: Actions
  save() {
    super.save()
  }

  update(raw: string) {
    this.raw = raw
    super.update({ raw: this.raw })
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
