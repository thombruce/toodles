import { Collection } from 'lokijs'

// TODO: Prefer not to do this; what alternatives exist?
import { Base, type BaseInterface } from './Base'

interface TodoInterface extends BaseInterface {
  description: string
  priority?: string
  done?: string // ISO-8601
  created: string // ISO-8601
}

class Todo extends Base implements TodoInterface {
  description!: string
  priority?: string
  done?: string
  created: string

  // Constructor
  constructor(todo: string | TodoInterface, collection: Collection) {
    if (typeof todo === 'string') {
      super({}, collection)

      this.editable = todo
      this.created = new Date().toISOString()
    } else {
      super(todo, collection)

      this.description = todo.description
      this.priority = todo.priority
      this.done = todo.done
      this.created = todo.created || new Date().toISOString()
    }
  }

  // Class methods

  // Instance methods: Getters
  get editable() {
    // return this.description.match(/^\([A-Z]\)(?=\s)/)?.[0]
    return `${this.priority ? '(' + this.priority + ') ' : ''}${this.description}`
  }

  set editable(editable) {
    const split = editable.split(/^\(([A-Z])\)\s/)

    if (split.length > 1) {
      this.priority = split[1]
      this.description = split[2]
    } else {
      this.priority = undefined
      this.description = split[0]
    }
  }

  get projects() {
    return this.description.match(/(?<=(?:^|\s)\+)\S+/g)
  }

  get contexts() {
    return this.description.match(/(?<=(?:^|\s)@)\S+/g)
  }

  get tags() {
    return this.description.match(/(?<=^|\s)[^\s:]+?:[^\s:]+(?=$|\s)/g)
  }

  // Instance methods: Actions
  save() {
    super.save()
  }

  update(editable: string) {
    this.editable = editable
    super.update({ description: this.description, priority: this.priority })
  }

  toggle() {
    var currentTime = new Date().toISOString()
    var todo = Todo.find(this.id, this.collection) as Todo
    if (todo.done) {
      super.update({ done: undefined })
    } else {
      super.update({ done: currentTime })
    }
  }

  destroy() {
    super.destroy()
  }
}

export { Todo }
