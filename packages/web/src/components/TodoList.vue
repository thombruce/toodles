<script setup lang="ts">
import TodoItem from "./TodoItem.vue"

const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})
</script>

<template lang="pug">
ul.mb-4
  li(v-for="todo in todos" :key="todo.id")
    TodoItem(:todo="todo")
</template>
