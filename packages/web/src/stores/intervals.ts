import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import { Interval } from '@/models/interval'

export const useIntervalsStore = defineStore('intervals', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    return Interval.where({ todoId })
  })

  const totalForTodo = computed(() => (todoId: UUID) => {
    const intervals = Interval.where({ todoId })
    
    return _sumBy(intervals, 'duration') || 0
  })

  const activeForTodo = computed(() => (todoId: UUID) => {
    return Interval.where({ $and: [{ todoId }, { createdAt: { $exists: true } }, { duration: { $exists: false } }] })[0]
  })

  // Actions
  function initStore() {
    Interval.init()
  }

  function addInterval(todoId: UUID, dateOf: string, duration: number) {
    new Interval({ todoId, dateOf, duration }).save()
  }

  function startInterval(todoId: UUID) {
    new Interval({ todoId }).start()
  }

  function stopInterval(id: UUID) {
    Interval.find(id).stop()
  }

  function deleteInterval(id: UUID) {
    Interval.find(id).destroy()
  }

  // Export
  return { list, forTodo, totalForTodo, activeForTodo, initStore, addInterval, startInterval, stopInterval, deleteInterval }
})
