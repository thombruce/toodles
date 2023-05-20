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

const store = useIntervalsStore()

const { forTodo } = storeToRefs(store)

const { deleteInterval } = store
</script>

<template lang="pug">
ul.mb-4
  li(v-for="interval in forTodo(todoId)" :key="interval.id")
    .space-x-4.mb-1.flex.items-center
      span {{ timepiece(interval.duration) }}
      span {{ new Date(interval.dateOf) }}
      button.text-red-600(@click="deleteInterval(interval.id)") Delete
</template>
