import Dexie, { type Table } from 'dexie'
import { Todo } from '@/models/Todo'

import { tokenize } from './lunr'

export class Database extends Dexie {
  todos!: Table<Todo>

  constructor() {
    super('toodles')
    this.version(1).stores({
      todos: 'id, description, priority, done, created, *tokens'
    })
    this.todos.mapToClass(Todo)
  }
}

export const db = new Database()

db.todos.hook("creating", function (primKey, obj, trans) {
  if (typeof obj.description == 'string') obj.tokens = tokenize(obj.description)
})

db.todos.hook("updating", function (mods: any, primKey, obj, trans) {
  if (mods.hasOwnProperty("description")) {
    if (typeof mods.description == 'string')
      return { tokens: tokenize(mods.description) }
    else
      return { tokens: [] }
  }
})
