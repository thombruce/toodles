import { Collection } from 'lokijs'

// TODO: Prefer not to do this; what alternatives exist?
import { Base, type BaseInterface } from './Base'

interface TodoInterface extends BaseInterface {
  name: string
  done?: EpochTimeStamp | null
}

class Todo extends Base implements TodoInterface {
  name: string
  done: EpochTimeStamp | null

  // Constructor
  constructor(todo: string | TodoInterface, collection: Collection) {
    if (typeof todo === 'string') {
      super({}, collection)

      this.name = todo
      this.done = null
    } else {
      super(todo, collection)

      this.name = todo.name
      this.done = todo.done || null
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
    var currentTime = Date.now()
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
