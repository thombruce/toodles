import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'

import db from '../plugins/loki'

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
  // const first = computed(() => list.value[0])

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
    list.value.update({ ...todo, ...{ done: todo.done ? null : currentTime, updatedAt: currentTime } })
  }

  function deleteTodo(id: UUID) {
    list.value.chain().find({ id }).remove()
  }

  // Export
  return { list, initStore, addTodo, updateTodo, toggleTodo, deleteTodo }
})
