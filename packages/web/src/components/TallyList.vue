<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { useTalliesStore } from "../stores/tallies"

const props = defineProps({
  todoId: {
    type: String,
    required: true
  }
})

const tally = ref({ dateOf: { date: '', time: '' }, count: 1 })

const store = useTalliesStore()

const { forTodo } = storeToRefs(store)

const { deleteTally } = store

function addTallyAndClear(item: { dateOf: { date: string, time: string }, count: number}) {
  if (isNaN(item.count)) {
    return
  }

  let count = item.count, dateOf

  // TODO: DRY this; it's identical to code in IntervalList
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

  store.addTally(props.todoId, dateOf, count)
  tally.value = { dateOf: { date: '', time: '' }, count: 1 }
}
</script>

<template lang="pug">
h2.text-lg.font-bold Tallies

form.space-x-4(@submit.prevent="addTallyAndClear(tally)")
  label
    span.text-gray-700.text-sm.font-bold.mr-2 Date
    input(v-model="tally.dateOf.date" type="date" class="border rounded py-2 px-3 text-gray-700")
  label
    span.text-gray-700.text-sm.font-bold.mr-2 Time
    input(v-model="tally.dateOf.time" type="time" class="border rounded py-2 px-3 text-gray-700")
  label
    span.text-gray-700.text-sm.font-bold.mr-2 Count
    input(v-model="tally.count" type="number" class="border rounded py-2 px-3 text-gray-700" required)
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add

ul.mb-4
  li(v-for="tally in forTodo(todoId)" :key="tally.id")
    .space-x-4.mb-1.flex.items-center
      span {{ tally.count }}
      span {{ new Date(tally.dateOf) }}
      button.text-red-600(@click="deleteTally(tally.id)") Delete
</template>
