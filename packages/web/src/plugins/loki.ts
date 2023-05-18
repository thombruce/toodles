import pinia from './pinia'
import { useTodosStore } from '../stores/todos'

import loki from 'lokijs'

let dbName = 'toodles.db', db: any

db = new loki(dbName, { autosave: true, autoload: true, autoloadCallback: initStore })

function initStore() {
  const store = useTodosStore(pinia)
  store.initStore()
}

export default db
