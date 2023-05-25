import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import { Interval } from '@/models/Interval'
import { IntervalCollection } from '@/models/IntervalCollection'
import { Todo } from '@/models/Todo'
import { useTodosStore } from './todos'

export const useIntervalsStore = defineStore('intervals', () => {
  // State
  const list = ref(new IntervalCollection() as Collection)

  // Getters
  const forTodo = computed(() => (todoId: string) => {
    return Interval.where({ todoId }, list.value)
  })

  const totalForTodo = computed(() => (todoId: string) => {
    const intervals = Interval.where({ todoId }, list.value)
    
    return _sumBy(intervals, 'duration') || 0
  })

  const activeForTodo = computed(() => (todoId: string) => {
    return Todo.find(todoId, useTodosStore().list)?.activeInterval
  })

  // Actions
  function addInterval(todoId: string, dateOf: string, duration: number) {
    new Interval({ todoId, dateOf, duration }, list.value).save()
  }

  function startInterval(todoId: string) {
    new Interval({ todoId }, list.value).start()
  }

  function stopInterval(id: string) {
    Interval.find(id, list.value)?.stop()
  }

  function deleteInterval(id: string) {
    Interval.find(id, list.value)?.destroy()
  }

  // Export
  return { list, forTodo, totalForTodo, activeForTodo, addInterval, startInterval, stopInterval, deleteInterval }
})
