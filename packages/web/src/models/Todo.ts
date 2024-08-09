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
      this.setTags()
      this.priority = todo.priority
      this.done = todo.done
      this.created = todo.created || new Date().toISOString()
    }
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

    this.setTags()
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

  setTags() {
    // [...str.matchAll(regex)] returns an array in all cases, empty if no matches
    this.projects = [...this.description.matchAll(/(?:^|\s)\+(\S+)/g)].map(i => i[1])
    this.contexts = [...this.description.matchAll(/(?:^|\s)@(\S+)/g)].map(i => i[1])
    this.hashtags = [...this.description.matchAll(/(?:^|\s)#(\S+)/g)].map(i => i[1])
    this.tags = [...this.description.matchAll(/(?:^|\s)([^ :]+?:[^ :]+)/g)].map(t => {
      let [key, value] = t[1].split(':')
      return { key, value }
    })
  }
}

export { Todo, type TodoInterface }
