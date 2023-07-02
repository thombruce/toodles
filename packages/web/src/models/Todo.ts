import { nanoid } from "nanoid"

interface TodoInterface {
  id?: string
  description: string
  priority?: string
  done?: string // ISO-8601
  created: string // ISO-8601
  projects?: string[]
  contexts?: string[]
  hashtags?: string[]
  tags?: object[]
  tokens?: string[]
}

class Todo implements TodoInterface {
  id?: string
  description!: string
  priority?: string
  done?: string
  created: string
  projects?: string[]
  contexts?: string[]
  hashtags?: string[]
  tags?: object[]
  tokens?: string[]

  // Constructor
  constructor(todo: string | TodoInterface) {
    if (typeof todo === 'string') {
      this.id = nanoid()
      this.editable = todo
      this.created = new Date().toISOString()
    } else {
      this.id = (todo.id || nanoid())
      this.description = todo.description
      this.priority = todo.priority
      this.done = todo.done
      this.created = todo.created || new Date().toISOString()
    }

    // TODO: This all works great! But it only works on initial creation.
    //       You need this to also work for updating.
    this.projects = this.description.match(/(?<=(?:^|\s)\+)\S+/g) || undefined
    this.contexts = this.description.match(/(?<=(?:^|\s)@)\S+/g) || undefined
    this.hashtags = this.description.match(/(?<=(?:^|\s)#)\S+/g) || undefined
    this.tags = this.description.match(/(?<=^|\s)[^\s:]+?:[^\s:]+(?=$|\s)/g)?.map(t => {
      let [key, value] = t.split(':')
      console.log({ key, value })
      return { key, value }
    }) || undefined
  }

  // Class methods

  // Instance methods: Getters
  get editable() {
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

  // Instance methods: Actions
  toggle() {
    var currentTime = new Date().toISOString()
    if (this.done) {
      this.done = undefined
    } else {
      this.done = currentTime
    }
  }
}

export { Todo, type TodoInterface }
