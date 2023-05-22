import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import db from '../plugins/loki'

interface Tally {
  id: UUID,
  todoId: UUID,
  dateOf: string,
  count: number,
  createdAt: EpochTimeStamp,
  updatedAt: EpochTimeStamp
}

interface List extends Collection {
  insert(todo: Tally | Tally[]): Tally[] | undefined,
  update(todo: Tally | Tally[]): undefined
}

export const useTalliesStore = defineStore('tallies', () => {
  // State
  const list = ref({} as List)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    const tallies = list.value.find({ todoId }) as Tally[]
    return tallies
  })

  const totalForTodo = computed(() => (todoId: UUID) => {
    const tallies = list.value.find({ todoId }) as Tally[]
    
    return _sumBy(tallies, 'count') || 0
  })

  // Actions
  function initStore() {
    list.value = db.getCollection('tallies')

    if(!list.value){
        list.value = db.addCollection('tallies', { unique: ['id'], indices: ['id', 'todoId'], autoupdate: true })
    }
  }

  function addTally(todoId: UUID, dateOf: string, count = 1 as number) {
    var currentTime = Date.now()
    list.value.insert({ id: uuidv4() as UUID, todoId, dateOf, count, createdAt: currentTime, updatedAt: currentTime })
  }

  function deleteTally(id: UUID) {
    list.value.chain().find({ id }).remove()
  }

  function deleteForTodo(todoId: UUID) {
    list.value.findAndRemove({ todoId })
  }

  // Export
  return { list, forTodo, totalForTodo, initStore, addTally, deleteTally, deleteForTodo }
})
