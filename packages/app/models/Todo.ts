import { default as _uniqueId } from 'lodash/uniqueId'

import dayjs, { Dayjs } from 'dayjs'
import { default as dayjsDuration, Duration } from 'dayjs/plugin/duration'

import { Schedule } from '../utils/tntSchedule'

dayjs.extend(dayjsDuration)

export class Todo {
  id: string
  description!: string
  state: string
  priority?: string
  price?: string
  multiplier?: string
  projects?: string[]
  contexts?: string[]
  hashtags?: string[]
  tags?: object[]
  children?: Todo[]
  // Dates
  dateCompleted?: Dayjs
  dateCreated?: Dayjs
  dateDue?: Dayjs
  // Search
  // tokens?: string[] // We are not yet implementing search
  // Count `count:0`
  count?: number
  // Timer `time:0h0m`
  timer?: string
  timerDuration?: Duration
  timerStartedAt?: Dayjs | null
  timerLastTick?: Dayjs
  timerInterval?: any
  // Recurrence `every:*`
  schedule?: Schedule

  // Constructor
  constructor(todo: string | Todo) {
    if (typeof todo === 'string') {
      this.id = _uniqueId() // nanoid()
      this.string = todo
    } else {
      this.id = todo.id || _uniqueId() // (todo.id || nanoid())
      this.description = todo.description
      this.state = todo.state || '*'
      this.priority = todo.priority || undefined
      this.completed = todo.completed || undefined
      this.created = todo.created || dayjs().format('YYYY-MM-DD')
      this.due = todo.due || undefined
      this.price = todo.price || undefined
      this.multiplier = todo.multiplier || undefined
      this.children = this.children || undefined
    }
    this.count = Number(this.description.match(/count:(\d+)/)?.[1])
    this.timer = this.description.match(/time:([^ :]+)/)?.[1]
    this.every = this.description.match(/every:([^ :]+)/)?.[1]
    this.setTags()
  }

  // Class methods
  static toFile(todos: Todo[]):String {
    return todos.map(todo => todo.string).join('\n')
  }

  static fromFile(file: String):Todo[] {
    return file.trim().split(/\n(?=\S)/).map(string => new Todo(string))
  }

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
    if (this.children?.length) str += `\n    ${this.children.map((c) => c.string).join('\n    ')}`
    return str
  }

  set string(string) {
    const multiline = string.split('\n')
    const parent = multiline[0].trim()
    const children = multiline.slice(1)

    this.state = parent.match(/^([!Xx~-])\s/)?.[1] || '*'
    this.priority = parent.match(/^(?:[!Xx~-]\s)?\(([A-Z])\)\s/)?.[1]

    // const dates = parent.match(/(?<=^ *(?:[!Xx~-] )?(?:\([A-Z]\) )?(?:\d{4}-\d{2}-\d{2} ){0,2})\d{4}-\d{2}-\d{2}\b/)
    if (this.state && ['X', 'x'].includes(this.state)) {
      this.completed = parent.match(/^(?:[Xx]\s)(?:\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2})\s/)?.[1]
      this.created = parent.match(/^(?:[Xx]\s)?(?:\([A-Z]\)\s)?(?:\d{4}-\d{2}-\d{2}\s)(\d{4}-\d{2}-\d{2})\s/)?.[1]
      this.due = parent.match(/^(?:[Xx]\s)?(?:\([A-Z]\)\s)?(?:\d{4}-\d{2}-\d{2}\s){2}(\d{4}-\d{2}-\d{2})\s/)?.[1]
    } else {
      this.created = parent.match(/^(?:[!~-]\s)?(?:\([A-Z]\)\s)?(\d{4}-\d{2}-\d{2})\s/)?.[1]
      this.due = parent.match(/^(?:[!~-]\s)?(?:\([A-Z]\)\s)?(?:\d{4}-\d{2}-\d{2}\s)(\d{4}-\d{2}-\d{2})\s/)?.[1]
    }

    this.price = parent.match(/^ *(?:[!Xx~-] )?(?:\([A-Z]\) )?(?:\d{4}-\d{2}-\d{2} ){0,3}((?:[$£€]\d*[.,]?\d{1,2}-)?[$£€]\d*[.,]?\d{1,2})(?= )/)?.[1]
    this.description = parent.match(/^ *(?:[!Xx~-] )?(?:\([A-Z]\) )?(?:\d{4}-\d{2}-\d{2} ){0,3}(?:(?:[$£€]\d*[.,]?\d{1,2}-)?[$£€]\d*[.,]?\d{1,2} )?(.*?)(?:\sx\d+)?$/)?.[1] || ''
    this.multiplier = parent.match(/(?<=\bx)(\d+)(?=$)/)?.[1]

    this.children = children.map((c) => new Todo(c))
  }

  get completed() { return this.dateCompleted?.format('YYYY-MM-DD') }
  set completed(completed) { if (completed) this.dateCompleted = dayjs(completed) }

  get created() { return this.dateCreated?.format('YYYY-MM-DD') }
  set created(created) { if (created) this.dateCreated = dayjs(created) }

  get due() { return this.dateDue?.format('YYYY-MM-DD') || undefined }
  set due(due: string | undefined) { this.dateDue = due ? dayjs(due) : undefined }

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

  get duration() {
    if (this.timerDuration) return this.timerDuration
    if (this.timer) {
      let milliseconds = 0
      const hours = this.timer.match(/(\d+)h/)
      const minutes = this.timer.match(/(\d+)m/)
      if (hours) milliseconds += parseInt(hours[1]) * 3_600_000
      if (minutes) milliseconds += parseInt(minutes[1]) * 60_000
      return dayjs.duration(milliseconds)
    }
    return
  }

  set duration(duration: Duration | undefined) {
    this.timerDuration = duration
  }

  get isActive():boolean {
    return Boolean(this.timerStartedAt)
  }

  get every():Schedule|undefined {
    return this.schedule
  }

  set every(every: string | undefined) {
    if (!every) return

    let schedule = Schedule.fromString(every)
    schedule.start = this.dateDue?.toDate() || this.dateCreated?.toDate() || dayjs().toDate()
    this.schedule = schedule
  }

  // Instance methods: Actions
  toggleDone() {
    if (this.status === 'done') {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    if (this.status === 'done') this.state = '*'
    this.dateCompleted = undefined
  }

  close() {
    if (this.isActive) this.stopTimer()
    this.state = 'x'
    if (this.created) this.dateCompleted = dayjs()
  }

  toggleFocus() {
    if (this.status === 'focus') {
      this.state = '*'
    } else {
      this.state = '!'
      this.completed = undefined
    }
  }

  incrementCount() {
    this.count = (this.count || 0) + 1
    this.description = `${this.description}`.replace(/count:[^: ]+/, `count:${this.count}`)
  }

  toggleTimer() {
    if (this.isActive) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  startTimer() {
    this.timerStartedAt = dayjs()
    this.timerLastTick = this.timerStartedAt

    this.timerInterval = setInterval(() => {
      const current = dayjs()
      const durSinceLastTick = dayjs.duration(current.diff(this.timerLastTick))
      this.duration = this.duration?.add(durSinceLastTick)
      this.timer = this.duration?.format('H[h]m[m]')
      this.timerLastTick = current
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.timerInterval)
    this.timerStartedAt = null

    this.description = `${this.description}`.replace(/time:[^ :]+/, `time:${this.timer}`)
  }

  next() {
    if (!this.schedule) return

    return new Todo({ ...this, ...{
      id: undefined,
      state: ['X', 'x'].includes(this.state) ? undefined : this.state,
      completed: undefined,
      created: undefined,
      due: dayjs(this.schedule.next()).format('YYYY-MM-DD'),
      description: this.description.replace(/count:[^: ]+/, 'count:0').replace(/time:[^ :]+/, 'time:0h0m'),
    } })
  }

  setTags() {
    // [...str.matchAll(regex)] returns an array in all cases, empty if no matches
    this.projects = [...this.description.matchAll(/(?:^|\s)\+(\S+)/g)].map(i => i[1])
    this.contexts = [...this.description.matchAll(/(?:^|\s)@(\S+)/g)].map(i => i[1])
    this.hashtags = [...this.description.matchAll(/(?:^|\s)#(\S+)/g)].map(i => i[1])
    this.tags = [...this.description.matchAll(/(?:^|\s)(\w+(?<!https?|mailto):[^ :]+)/g)].map(t => {
      let [key, value] = t[1].split(':')
      return { key, value }
    })
  }
}
