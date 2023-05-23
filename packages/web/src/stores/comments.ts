import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'
import { Comment } from '@/models/comment'
import { CommentCollection } from '@/models/CommentCollection'

export const useCommentsStore = defineStore('comments', () => {
  // State
  const list = ref({} as Collection)

  // Getters
  const forTodo = computed(() => (todoId: UUID) => {
    return Comment.where({ todoId }, list.value)
  })

  const countForTodo = computed(() => (todoId: UUID) => {
    return Comment.where({ todoId }, list.value).length
  })

  // Actions
  function initStore() {
    list.value = new CommentCollection() as Collection
  }

  function addComment(todoId: UUID, dateOf: string, text: string) {
    new Comment({ todoId, dateOf, text }, list.value).save()
  }

  function deleteComment(id: UUID) {
    Comment.find(id, list.value).destroy()
  }

  // Export
  return { list, forTodo, countForTodo, initStore, addComment, deleteComment }
})
