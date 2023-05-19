<script setup lang="ts">
import { computed, ref } from "vue"
import { useIntervalsStore } from "../stores/intervals"

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
  var minutes = Math.floor(timer.value / 60000)
  var seconds = ((timer.value % 60000) / 1000).toFixed(0)
  return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds
})
</script>

<template lang="pug">
span {{ formatted }}
</template>