<script setup lang="ts">
import { useIntervalsStore } from "../stores/intervals"
import { timepiece } from "@/plugins/timepiece"
import { storeToRefs } from "pinia"

const props = defineProps({
  todoId: String
})

const store = useIntervalsStore()
const { totalForTodo } = storeToRefs(store)
</script>

<template lang="pug">
span {{ timepiece(totalForTodo(todoId)) }}
</template>