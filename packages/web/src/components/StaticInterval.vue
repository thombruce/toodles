<script setup lang="ts">
import { ref } from "vue";
import { useIntervalsStore } from "../stores/intervals"
import { computed } from "vue"
import { timepiece } from "@/plugins/timepiece"

const props = defineProps({
  todoId: String
})

const store = useIntervalsStore()

const total = store.totalForTodo(props.todoId)

let timer = ref(total)

const formatted = computed(() => {
  return timepiece(timer.value)
})
</script>

<template lang="pug">
span {{ formatted }}
</template>