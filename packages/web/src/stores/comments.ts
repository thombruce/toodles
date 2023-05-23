import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'
import { Comment } from '@/models/comment'

export const useCommentsStore = defineStore('comments', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    return Comment.where({ todoId })
  })

  const countForTodo = computed(() => (todoId: UUID) => {
    return Comment.where({ todoId }).length
  })

  // Actions
  function initStore() {
    Comment.init()
  }

  function addComment(todoId: UUID, dateOf: string, text: string) {
    new Comment({ todoId, dateOf, text }).save()
  }

  function deleteComment(id: UUID) {
    Comment.find(id).destroy()
  }

  function deleteForTodo(todoId: UUID) {
    // TODO: This should be a static method
    new Comment({ todoId, text: 'Foo' }).destroyWhere({ todoId })
  }

  // Export
  return { list, forTodo, countForTodo, initStore, addComment, deleteComment, deleteForTodo }
})
