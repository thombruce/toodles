import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'
import { sumBy as _sumBy } from 'lodash'
import { Comment } from '@/models/Comment'
import { CommentCollection } from '@/models/CommentCollection'

export const useCommentsStore = defineStore('comments', () => {
  // State
  const list = ref(new CommentCollection() as Collection)

  // Getters
  const forTodo = computed(() => (todoId: string) => {
    return Comment.where({ todoId }, list.value)
  })

  const countForTodo = computed(() => (todoId: string) => {
    return Comment.where({ todoId }, list.value).length
  })

  // Actions
  function addComment(todoId: string, dateOf: string, text: string) {
    new Comment({ todoId, dateOf, text }, list.value).save()
  }

  function deleteComment(id: string) {
    Comment.find(id, list.value)?.destroy()
  }

  // Export
  return { list, forTodo, countForTodo, addComment, deleteComment }
})
