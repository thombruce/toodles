import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import { Interval } from '@/models/interval'
import { IntervalCollection } from '@/models/IntervalCollection'

export const useIntervalsStore = defineStore('intervals', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    return Interval.where({ todoId }, list.value)
  })

  const totalForTodo = computed(() => (todoId: UUID) => {
    const intervals = Interval.where({ todoId }, list.value)
    
    return _sumBy(intervals, 'duration') || 0
  })

  const activeForTodo = computed(() => (todoId: UUID) => {
    return Interval.where({ $and: [{ todoId }, { createdAt: { $exists: true } }, { duration: { $exists: false } }] }, list.value)[0]
  })

  // Actions
  function initStore() {
    list.value = new IntervalCollection() as Collection
  }

  function addInterval(todoId: UUID, dateOf: string, duration: number) {
    new Interval({ todoId, dateOf, duration }, list.value).save()
  }

  function startInterval(todoId: UUID) {
    new Interval({ todoId }, list.value).start()
  }

  function stopInterval(id: UUID) {
    Interval.find(id, list.value).stop()
  }

  function deleteInterval(id: UUID) {
    Interval.find(id, list.value).destroy()
  }

  // Export
  return { list, forTodo, totalForTodo, activeForTodo, initStore, addInterval, startInterval, stopInterval, deleteInterval }
})
