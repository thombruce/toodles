<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { timepiece } from "@/plugins/timepiece"

import { useIntervalsStore } from "../stores/intervals"

const props = defineProps({
  todoId: {
    type: String,
    required: true
  }
})

const interval = ref({ dateOf: '', duration: null })

const store = useIntervalsStore()

const { forTodo } = storeToRefs(store)

const { deleteInterval } = store

function addIntervalAndClear(item: { dateOf: string, duration: number}) {
  if (item.dateOf.length === 0) {
    return
  }

  store.addInterval(props.todoId, item.dateOf, item.duration)
  interval.value = { dateOf: '', duration: null }
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
  //- TODO: Input as string
  input(v-model="interval.duration" type="number" class="border rounded py-2 px-3 text-gray-700" ref="newIntervalDuration")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add
</template>
