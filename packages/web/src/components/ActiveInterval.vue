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

let timer = ref(totalForTodo.value(props.todoId))

setInterval(() => {
  timer.value = Date.now() - props.startedAt + totalForTodo.value(props.todoId)
}, 1000)
</script>

<template lang="pug">
span {{ timepiece(timer) }}
</template>