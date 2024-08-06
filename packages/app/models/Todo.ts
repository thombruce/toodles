import { uniqueId as _uniqueId } from 'lodash'

export class Todo {
  id?: string
  description!: string
  state?: string
  priority?: string
  completed?: string
  created?: string
  due?: string
  price?: string
  multiplier?: string
  projects?: string[]
  contexts?: string[]
  hashtags?: string[]
  tags?: object[]
  // tokens?: string[] // We are not yet implementing search

  // Constructor
  constructor(todo: string | any) {
    if (typeof todo === 'string') {
      this.id = _uniqueId() // nanoid()
      this.string = todo
    } else {
      this.id = (todo.id || _uniqueId()) // (todo.id || nanoid())
      this.description = todo.description
      this.state = todo.state || '*'
      this.priority = todo.priority
      this.completed = todo.completed
      this.created = todo.created || new Date().toISOString().substring(0, 10)
      this.due = todo.due
      this.price = todo.price
      this.multiplier = todo.multiplier
    }
    this.setTags()
  }

  // Class methods
  // None

  // Instance methods: Getters
  get string() {
    let str = ''
    if (this.state && this.state !== '*') str += `${this.state} `
    if (this.priority) str += `(${this.priority}) `
    if (this.completed) str += `${this.completed} `
    if (this.created) str += `${this.created} `
    if (this.due) str += `${this.due} `
    if (this.price) str += `${this.price} `
    str += this.description
    if (this.multiplier) str += ` x${this.multiplier}`
    return str
  }

  set string(string) {
    this.state = string.match(/^([!Xx~-])\s/)?.[1] || '*'
    this.priority = string.match(/^(?:[!Xx~-]\s)?\(([A-Z])\)\s/)?.[1]

    const dates = string.match(/(?<=^ *(?:[!Xx~-] )?(?:\([A-Z]\) )?(?:\d{4}-\d{2}-\d{2} ){0,2})\d{4}-\d{2}-\d{2}\b/)
    if (this.state && ['X', 'x'].includes(this.state)) {
      this.completed = string.match(/^(?:[Xx]\s)(?:\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2})\s/)?.[1]
      this.created = string.match(/^(?:[Xx]\s)?(?:\([A-Z]\)\s)?(?:\d{4}-\d{2}-\d{2}\s)(\d{4}-\d{2}-\d{2})\s/)?.[1]
      this.due = string.match(/^(?:[Xx]\s)?(?:\([A-Z]\)\s)?(?:\d{4}-\d{2}-\d{2}\s){2}(\d{4}-\d{2}-\d{2})\s/)?.[1]
    } else {
      this.created = string.match(/^(?:[!~-]\s)?(?:\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2})\s/)?.[1]
      this.due = string.match(/^(?:[!~-]\s)?(?:\([A-Z]\)\s)?(?:\d{4}-\d{2}-\d{2}\s)(\d{4}-\d{2}-\d{2})\s/)?.[1]
    }

    this.price = string.match(/^ *(?:[!Xx~-] )?(?:\([A-Z]\) )?(?:\d{4}-\d{2}-\d{2} ){0,3}((?:[$£€]\d*[.,]?\d{1,2}-)?[$£€]\d*[.,]?\d{1,2})(?= )/)?.[1]
    this.description = string.match(/^ *(?:[!Xx~-] )?(?:\([A-Z]\) )?(?:\d{4}-\d{2}-\d{2} ){0,3}(?:(?:[$£€]\d*[.,]?\d{1,2}-)?[$£€]\d*[.,]?\d{1,2} )?(.*?)(?:\sx\d+)?$/)?.[1] || ''
    this.multiplier = string.match(/(?<=\bx)(\d+)(?=$)/)?.[1]
  }

  get status() {
    switch(this.state) {
      case '!':
        return 'focus'
      case 'X':
      case 'x':
        return 'done'
      case '~':
        return 'obsolete'
      case '*':
      case '-':
      default:
        return 'open'
    }
  }

  // Instance methods: Actions
  toggle() {
    var currentDate = new Date().toISOString().substring(0, 10)
    if (this.status === 'done') {
      this.state = '*'
      this.completed = undefined
    } else {
      this.state = 'x'
      if (this.created) this.completed = currentDate
    }
  }

  toggleFocus() {
    if (this.status === 'focus') {
      this.state = '*'
    } else {
      this.state = '!'
      this.completed = undefined
    }
  }

  setTags() {
    // [...str.matchAll(regex)] returns an array in all cases, empty if no matches
    this.projects = [...this.description.matchAll(/(?:^|\s)\+(\S+)/g)].map(i => i[1])
    this.contexts = [...this.description.matchAll(/(?:^|\s)@(\S+)/g)].map(i => i[1])
    this.hashtags = [...this.description.matchAll(/(?:^|\s)#(\S+)/g)].map(i => i[1])
    this.tags = [...this.description.matchAll(/(?:^|\s)([^\s:]+?:[^\s:]+)/g)].map(t => {
      let [key, value] = t[1].split(':')
      return { key, value }
    })
  }

}
