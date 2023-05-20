import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import db from '../plugins/loki'

import { useTodosStore } from './todos'

interface Interval {
  id: UUID,
  todoId: UUID,
  dateOf: string,
  duration?: number,
  createdAt: EpochTimeStamp,
  updatedAt: EpochTimeStamp
}

interface List extends Collection {
  insert(todo: Interval | Interval[]): Interval[] | undefined,
  update(todo: Interval | Interval[]): undefined
}

export const useIntervalsStore = defineStore('intervals', () => {
  // State
  const list = ref({} as List)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    const intervals = list.value.find({ todoId }) as Interval[]
    return intervals
  })

  const totalForTodo = computed(() => (todoId: UUID) => {
    const intervals = list.value.find({ todoId }) as Interval[]
    
    return _sumBy(intervals, 'duration') || 0
  })

  const activeForTodo = computed(() => (todoId: UUID) => {
    const interval = list.value.find({ $and: [{ todoId }, { createdAt: { $exists: true } }, { duration: { $exists: false } }] })[0] as Interval
    return interval
  })

  // Actions
  function initStore() {
    list.value = db.getCollection('intervals')

    if(!list.value){
        list.value = db.addCollection('intervals', { unique: ['id'], indices: ['id', 'todoId'], autoupdate: true })
    }
  }

  function startInterval(todoId: UUID) {
    var currentTime = Date.now()
    const todos = useTodosStore()
    let todo = todos.find(todoId)
    if (todo.done) todos.toggleTodo(todoId)
    list.value.insert({ id: uuidv4() as UUID, todoId, dateOf: new Date(currentTime).toISOString(), createdAt: currentTime, updatedAt: currentTime })
  }

  function stopInterval(id: UUID) {
    var interval = list.value.find({ id })[0] as Interval
    if (!interval.createdAt || interval.duration) return
    var currentTime = Date.now()
    var duration = currentTime - interval.createdAt
    list.value.update({ ...interval, ...{ duration, updatedAt: currentTime } })
  }

  function deleteInterval(id: UUID) {
    list.value.chain().find({ id }).remove()
  }

  // Export
  return { list, forTodo, totalForTodo, activeForTodo, initStore, startInterval, stopInterval, deleteInterval }
})
