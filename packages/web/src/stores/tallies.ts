import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import { Tally } from '@/models/tally'

export const useTalliesStore = defineStore('tallies', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    return Tally.where({ todoId })
  })

  const totalForTodo = computed(() => (todoId: UUID) => {
    const tallies = Tally.where({ todoId })
    
    return _sumBy(tallies, 'count') || 0
  })

  // Actions
  function initStore() {
    Tally.init()
  }

  function addTally(todoId: UUID, dateOf: string, count = 1 as number) {
    new Tally({ todoId, dateOf, count }).save()
  }

  function deleteTally(id: UUID) {
    Tally.find(id).destroy()
  }

  function deleteForTodo(todoId: UUID) {
    // TODO: This should be a static method
    new Tally({ todoId }).destroyWhere({ todoId })
  }

  // Export
  return { list, forTodo, totalForTodo, initStore, addTally, deleteTally, deleteForTodo }
})
