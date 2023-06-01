<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "../stores/todos"

import TodoItem from "./TodoItem.vue"

const props = defineProps({
  project: {
    type: String,
    required: false
  },
  context: {
    type: String,
    required: false
  }
})

const store = useTodosStore()

const { list, forProject, forContext } = storeToRefs(store)

const todoList = computed(() => {
  if (props.project) return forProject.value(props.project)
  if (props.context) return forContext.value(props.context)
  return list.value.data
})
</script>

<template lang="pug">
ul.mb-4
  li(v-for="todo in todoList" :key="todo.id")
    TodoItem(:todo="todo")
</template>
