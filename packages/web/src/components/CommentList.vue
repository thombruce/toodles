<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { useCommentsStore } from "../stores/comments"

import CommentEditor from "./CommentEditor.vue"

const props = defineProps({
  todoId: {
    type: String,
    required: true
  }
})

const comment = ref({ dateOf: { date: '', time: '' }, text: '' })

const store = useCommentsStore()

const { forTodo } = storeToRefs(store)

const { deleteComment } = store

function addCommentAndClear(item: { dateOf: { date: string, time: string }, text: string}) {
  if (item.text.length === 0) {
    return
  }

  let text = item.text, dateOf

  // TODO: DRY this; it's identical to code in IntervalList and TallyList
  if (item.dateOf.date.length && item.dateOf.time.length) {
    dateOf = new Date(item.dateOf.date + "T" + item.dateOf.time).toISOString()
  } else if (/^\d{4}-[0-1]\d-[0-3]\d$/.test(item.dateOf.date)) {
    dateOf = item.dateOf.date
  } else if (/^[0-2]\d:[0-5]\d(?::[0-5]\d)?$/.test(item.dateOf.time)) {
    const [hours, minutes, seconds] = item.dateOf.time.split(':').map(n => Number(n))
    const date = new Date()
    date.setHours(hours, minutes, seconds || 0, 0)
    dateOf = date.toISOString()
  } else {
    dateOf = new Date().toISOString()
  }

  store.addComment(props.todoId, dateOf, text)
  comment.value = { dateOf: { date: '', time: '' }, text: '' }
}
</script>

<template lang="pug">
h2.text-lg.font-bold Comments

form(@submit.prevent="addCommentAndClear(comment)")
  .space-x-4.mb-2
    label
      span.text-gray-700.text-sm.font-bold.mr-2 Date
      input(v-model="comment.dateOf.date" type="date" class="border rounded py-2 px-3 text-gray-700")
    label
      span.text-gray-700.text-sm.font-bold.mr-2 Time
      input(v-model="comment.dateOf.time" type="time" class="border rounded py-2 px-3 text-gray-700")
  label.block.mb-2
    span.block.text-gray-700.text-sm.font-bold.mb-2 Text
    CommentEditor(v-model="comment.text" class="border rounded py-2 px-3 text-gray-700")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add

ul.mb-4
  li(v-for="comment in forTodo(todoId)" :key="comment.id")
    .space-x-4.mb-1.flex.items-center
      div {{ comment.text }}
      span {{ new Date(comment.dateOf) }}
      button.text-red-600(@click="deleteComment(comment.id)") Delete
</template>
