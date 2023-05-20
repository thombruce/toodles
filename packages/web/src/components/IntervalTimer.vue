<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useIntervalsStore } from "../stores/intervals"

import ActiveInterval from "./ActiveInterval.vue"
import StaticInterval from "./StaticInterval.vue"

const props = defineProps({
  todoId: String
})

const store = useIntervalsStore()
const { activeForTodo } = storeToRefs(store)

function toggleTimer() {
  if (!activeForTodo.value(props.todoId)) {
    store.startInterval(props.todoId)
  } else {
    store.stopInterval(activeForTodo.value(props.todoId).id)
  }
}
</script>

<template lang="pug">
button.space-x-2.flex.items-center(@click="toggleTimer()" :class="activeForTodo(todoId) ? 'bg-green-500 hover:bg-green-700 text-white px-2 rounded' : 'bg-gray-500 hover:bg-gray-700 text-white px-2 rounded'")
  fa(v-if="!activeForTodo(todoId)" icon="fa-solid fa-clock" fixed-width)
  fa(v-else icon="fa-solid fa-pause" fixed-width)
  ActiveInterval.grow(v-if="activeForTodo(todoId)" :todoId="todoId" :startedAt="activeForTodo(todoId).startedAt")
  StaticInterval.grow(v-else :todoId="todoId")
</template>