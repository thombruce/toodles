<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useTalliesStore } from "../stores/tallies"

const props = defineProps({
  todoId: String
})

const store = useTalliesStore()

const { totalForTodo } = storeToRefs(store)

function addTally() {
  store.addTally(props.todoId, new Date().toISOString())
}
</script>

<template lang="pug">
button.space-x-2.flex.items-center(@click="addTally()" :class="'bg-sky-500 hover:bg-sky-700 text-white px-2 rounded'")
  fa(icon="fa-solid fa-plus" fixed-width)
  span.grow {{ totalForTodo(todoId) }}
</template>