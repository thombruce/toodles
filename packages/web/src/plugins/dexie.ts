import Dexie, { type Table } from 'dexie'
import { Todo } from '@/models/Todo'

export class Database extends Dexie {
  todos!: Table<Todo>

  constructor() {
    super('toodles')
    this.version(1).stores({
      todos: 'id, description, priority, done, created'
    })
    this.todos.mapToClass(Todo)
  }
}

export const db = new Database()
