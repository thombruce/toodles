<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "@/stores/todos"

import TodoList from "@/components/TodoList.vue"

const store = useTodosStore()

store.fetchTodos()

const { open } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList.mb-4(:todos="open()")
</template>
