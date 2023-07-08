<script setup lang="ts">
import { computed } from "vue"

import ProgressBar from "./ProgressBar.vue"
import TodoItem from "./TodoItem.vue"

import type { Todo } from "@/models/Todo"

const props = defineProps({
  todos: {
    type: Array<Todo>,
    required: true
  }
})

const progress = computed(() => {
  const count = props.todos.length
  const done = props.todos.filter(t => t.done).length
  return done / count * 100
})
</script>

<template lang="pug">
ProgressBar.mb-4(:progress="progress")
.w-full(v-for="todo in todos" :key="todo.id")
  TodoItem(:todo="todo")
</template>
