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
    this.version(2).stores({
      todos: `
        id,
        description,
        priority,
        done,
        created,
        *projects,
        *contexts,
        *hashtags,
        *tokens
      `
      // TODO: Tags omitted; objects in array can't be indexed.
      //       If indexing required, consider storing array of strings,
      //       for example: *tagKeys
    })
    this.todos.mapToClass(Todo)
  }
}

export const db = new Database()

// TODO: Repetition of tags code
db.todos.hook("creating", function (primKey, obj, trans) {
  if (typeof obj.description == 'string') {
    obj.tokens = tokenize(obj.description)
  }
})

// TODO: Repetition of tags code
db.todos.hook("updating", function (mods: any, primKey, obj, trans) {
  if (mods.hasOwnProperty("description")) {
    if (typeof mods.description == 'string')
      return {
        tokens: tokenize(mods.description)
      }
    else
      return {
        tokens: []
      }
  }
})

// Searches for todos matching ALL words
export function advancedSearch(query: string) {
  const prefixes = tokenize(query)
  return db.transaction('r', db.todos, function*(): any {
    // Parallell search for all prefixes - just select resulting primary keys
    const results = yield Dexie.Promise.all(prefixes.map(prefix =>
      db.todos
        .where('tokens')
        .startsWith(prefix)
        .primaryKeys()))

    // Intersect result set of primary keys
    const reduced = results
      .reduce((a: string[], b: string[]) => {
        const set = new Set(b)
        return a.filter((k: string) => set.has(k))
      })

    // Finally select entire documents from intersection
    return yield db.todos.where('id').anyOf(reduced).toArray()
  })
}
