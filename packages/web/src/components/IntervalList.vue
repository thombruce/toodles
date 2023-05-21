<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { timepiece, untimepiece } from "@/plugins/timepiece"

import { useIntervalsStore } from "../stores/intervals"

const props = defineProps({
  todoId: {
    type: String,
    required: true
  }
})

const interval = ref({ dateOf: '', duration: '' })

const store = useIntervalsStore()

const { forTodo } = storeToRefs(store)

const { deleteInterval } = store

function addIntervalAndClear(item: { dateOf: string, duration: string}) {
  if (!/^\d+(?:(?::[0-5]\d){0,2}|\.\d{1,2})?$/.test(item.duration)) {
    return
  }

  let duration

  if (duration = Number(item.duration)) {
    duration = Number((duration * 3600000).toFixed())
  } else {
    duration = untimepiece(item.duration)
  }

  store.addInterval(props.todoId, item.dateOf, duration)
  interval.value = { dateOf: '', duration: '' }
}
</script>

<template lang="pug">
ul.mb-4
  li(v-for="interval in forTodo(todoId)" :key="interval.id")
    .space-x-4.mb-1.flex.items-center
      span {{ timepiece(interval.duration) }}
      span {{ new Date(interval.dateOf) }}
      button.text-red-600(@click="deleteInterval(interval.id)") Delete

//- TODO: Add labels
form.space-x-4(@submit.prevent="addIntervalAndClear(interval)")
  //- TODO: Allow time value
  input(v-model="interval.dateOf" type="date" class="border rounded py-2 px-3 text-gray-700" ref="newIntervalDateOf")
  input(v-model="interval.duration" type="text" class="border rounded py-2 px-3 text-gray-700" ref="newIntervalDuration")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add
</template>
