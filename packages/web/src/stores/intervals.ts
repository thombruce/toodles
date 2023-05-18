import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'

import db from '../plugins/loki'

interface Interval {}

interface List extends Collection {
  insert(todo: Interval | Interval[]): Interval[] | undefined,
  update(todo: Interval | Interval[]): undefined
}

export const useIntervalsStore = defineStore('intervals', () => {
  // State
  const list = ref({} as List)

  // Getters
  // const first = computed(() => list.value[0])

  // Actions
  function initStore() {
    list.value = db.getCollection('intervals')

    if(!list.value){
        list.value = db.addCollection('intervals', { unique: ['id'], indices: ['id', 'todoId'], autoupdate: true })
    }
  }

  // Export
  return { list, initStore }
})
