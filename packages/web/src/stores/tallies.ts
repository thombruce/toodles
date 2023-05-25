import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import { Tally } from '@/models/Tally'
import { TallyCollection } from '@/models/TallyCollection'

export const useTalliesStore = defineStore('tallies', () => {
  // State
  const list = ref(new TallyCollection() as Collection)

  // Getters
  const forTodo = computed(() => (todoId: string) => {
    return Tally.where({ todoId }, list.value)
  })

  const totalForTodo = computed(() => (todoId: string) => {
    const tallies = Tally.where({ todoId }, list.value)
    
    return _sumBy(tallies, 'count') || 0
  })

  // Actions
  function addTally(todoId: string, dateOf: string, count = 1 as number) {
    new Tally({ todoId, dateOf, count }, list.value).save()
  }

  function deleteTally(id: string) {
    Tally.find(id, list.value)?.destroy()
  }

  // Export
  return { list, forTodo, totalForTodo, addTally, deleteTally }
})
