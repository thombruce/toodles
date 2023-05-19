<script setup lang="ts">
import { ref } from "vue";
import { useIntervalsStore } from "../stores/intervals"
import { computed } from "vue"

const props = defineProps({
  todoId: String
})

const store = useIntervalsStore()

const total = store.totalForTodo(props.todoId)

let timer = ref(total)

const formatted = computed(() => {
  var minutes = Math.floor(timer.value / 60000)
  var seconds = ((timer.value % 60000) / 1000).toFixed(0)
  return Number(seconds) == 60 ? (minutes+1) + ":00" : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds
})
</script>

<template lang="pug">
span {{ formatted }}
</template>