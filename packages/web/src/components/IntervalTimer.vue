<script setup lang="ts">
import { useIntervalsStore } from "../stores/intervals"

import ActiveInterval from "./ActiveInterval.vue"
import StaticInterval from "./StaticInterval.vue"

const props = defineProps({
  todoId: String
})

const store = useIntervalsStore()

function toggleTimer() {
  if (!store.activeForTodo(props.todoId)) {
    store.startInterval(props.todoId)
  } else {
    store.stopInterval(store.activeForTodo(props.todoId).id)
  }
}

const { activeForTodo } = store
</script>

<template lang="pug">
button.space-x-2.flex.items-center(@click="toggleTimer()" :class="activeForTodo(todoId) ? 'bg-green-500 hover:bg-green-700 text-white px-2 rounded' : 'bg-gray-500 hover:bg-gray-700 text-white px-2 rounded'")
  fa(v-if="!activeForTodo(todoId)" icon="fa-solid fa-clock" fixed-width)
  fa(v-else icon="fa-solid fa-pause" fixed-width)
  ActiveInterval.grow(v-if="activeForTodo(todoId)" :todoId="todoId" :startedAt="activeForTodo(todoId).startedAt")
  StaticInterval.grow(v-else :todoId="todoId")
</template>