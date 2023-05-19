<script setup lang="ts">
import { computed, ref } from "vue"
import { useIntervalsStore } from "../stores/intervals"
import { timepiece } from "@/plugins/timepiece"

const props = defineProps({
  todoId: String,
  startedAt: {
    type: Number,
    required: true
  }
})

const store = useIntervalsStore()

const total = store.totalForTodo(props.todoId)

let timer = ref(total)

setInterval(() => {
  timer.value = Date.now() - props.startedAt + total
}, 1000)

const formatted = computed(() => {
  return timepiece(timer.value)
})
</script>

<template lang="pug">
span {{ formatted }}
</template>