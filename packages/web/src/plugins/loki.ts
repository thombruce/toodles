import pinia from './pinia'
import { useTodosStore } from '../stores/todos'

import loki from 'lokijs'
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter'
// import { LokiPartitioningAdapter } from 'lokijs'

let dbName = 'toodles.db', db: any

var idbAdapter = new LokiIndexedAdapter('toodles')
// var partitionAdapter = new LokiPartitioningAdapter(idbAdapter) // Add { paging: true } if collections anticipated over 50Mb

db = new loki(dbName, {
  adapter: idbAdapter, // Comment out if using partitionAdapter instead
  // adapter: partitionAdapter,
  autosave: true,
  autoload: true,
  autoloadCallback: initStore
})

function initStore() {
  const store = useTodosStore(pinia)
  store.initStore()
}

export default db
