<script setup lang="ts">
import { computed, ref } from "vue"
import { useIntervalsStore } from "../stores/intervals"
import { timepiece } from "@/plugins/timepiece"
import { storeToRefs } from "pinia";

const props = defineProps({
  todoId: String,
  startedAt: {
    type: Number,
    required: true
  }
})

const store = useIntervalsStore()
const { totalForTodo } = storeToRefs(store)

const total = totalForTodo.value(props.todoId)

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