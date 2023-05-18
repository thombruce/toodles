import pinia from './pinia'
import { useTodosStore } from '../stores/todos'

import loki from 'lokijs'
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter'

let dbName = 'toodles.db', db: any

var idbAdapter = new LokiIndexedAdapter('toodles')

db = new loki(dbName, {
  adapter: idbAdapter,
  autosave: true,
  autoload: true,
  autoloadCallback: initStore
})

function initStore() {
  const store = useTodosStore(pinia)
  store.initStore()
}

export default db
