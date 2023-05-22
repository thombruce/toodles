import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'

import db from '../plugins/loki'

interface Comment {
  id: UUID,
  todoId: UUID,
  dateOf: string,
  text: string,
  createdAt: EpochTimeStamp,
  updatedAt: EpochTimeStamp
}

interface List extends Collection {
  insert(todo: Comment | Comment[]): Comment[] | undefined,
  update(todo: Comment | Comment[]): undefined
}

export const useCommentsStore = defineStore('comments', () => {
  // State
  const list = ref({} as List)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    const comments = list.value.find({ todoId }) as Comment[]
    return comments
  })

  // Actions
  function initStore() {
    list.value = db.getCollection('comments')

    if(!list.value){
        list.value = db.addCollection('comments', { unique: ['id'], indices: ['id', 'todoId'], autoupdate: true })
    }
  }

  function addComment(todoId: UUID, dateOf: string, text: string) {
    var currentTime = Date.now()
    list.value.insert({ id: uuidv4() as UUID, todoId, dateOf, text, createdAt: currentTime, updatedAt: currentTime })
  }

  function deleteComment(id: UUID) {
    list.value.chain().find({ id }).remove()
  }

  function deleteForTodo(todoId: UUID) {
    list.value.findAndRemove({ todoId })
  }

  // Export
  return { list, forTodo, initStore, addComment, deleteComment, deleteForTodo }
})
