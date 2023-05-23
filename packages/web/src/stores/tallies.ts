import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import { Tally } from '@/models/Tally'
import { TallyCollection } from '@/models/TallyCollection'

export const useTalliesStore = defineStore('tallies', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    return Tally.where({ todoId }, list.value)
  })

  const totalForTodo = computed(() => (todoId: UUID) => {
    const tallies = Tally.where({ todoId }, list.value)
    
    return _sumBy(tallies, 'count') || 0
  })

  // Actions
  function initStore() {
    list.value = new TallyCollection() as Collection
  }

  function addTally(todoId: UUID, dateOf: string, count = 1 as number) {
    new Tally({ todoId, dateOf, count }, list.value).save()
  }

  function deleteTally(id: UUID) {
    Tally.find(id, list.value).destroy()
  }

  // Export
  return { list, forTodo, totalForTodo, initStore, addTally, deleteTally }
})
