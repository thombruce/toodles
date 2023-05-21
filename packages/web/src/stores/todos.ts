import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'

import db from '../plugins/loki'

import { useIntervalsStore } from './intervals'

interface Todo {
  id: UUID,
  text: string,
  done: EpochTimeStamp | null,
  createdAt: EpochTimeStamp,
  updatedAt: EpochTimeStamp
}

interface List extends Collection {
  insert(todo: Todo | Todo[]): Todo[] | undefined,
  update(todo: Todo | Todo[]): undefined
}

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref({} as List)

  // Getters
  const find = computed(() => (id: UUID) => {
    const todo = list.value.find({ id })[0] as Todo
    return todo
  })

  // Actions
  function initStore() {
    list.value = db.getCollection('todos')

    if(!list.value){
        list.value = db.addCollection('todos', { unique: ['id'], indices: ['id'], autoupdate: true })
    }
  }

  function addTodo(text: string) {
    var currentTime = Date.now()
    list.value.insert({ id: uuidv4() as UUID, text, done: null, createdAt: currentTime, updatedAt: currentTime })
  }

  function updateTodo(id: UUID, text: string) {
    var currentTime = Date.now()
    var todo = list.value.find({ id })[0] as Todo
    list.value.update({ ...todo, ...{ text, updatedAt: currentTime } })
  }

  function toggleTodo(id: UUID) {
    var currentTime = Date.now()
    var todo = list.value.find({ id })[0] as Todo
    if (todo.done) {
      list.value.update({ ...todo, ...{ done: null, updatedAt: currentTime } })
    } else {
      const intervals = useIntervalsStore()
      let activeInterval
      if (activeInterval = intervals.activeForTodo(todo.id)) intervals.stopInterval(activeInterval.id)
      list.value.update({ ...todo, ...{ done: currentTime, updatedAt: currentTime } })
    }
  }

  function deleteTodo(id: UUID) {
    const intervals = useIntervalsStore()
    intervals.deleteForTodo(id)
    list.value.chain().find({ id }).remove()
  }

  // Export
  return { list, find, initStore, addTodo, updateTodo, toggleTodo, deleteTodo }
})
