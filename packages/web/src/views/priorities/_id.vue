<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

import { useTodosStore } from "@/stores/todos"

import MultiBar from "@/components/MultiBar.vue"
import TodoList from "@/components/TodoList.vue"

const route = useRoute()
const { priority } = route.params

const store = useTodosStore()

store.fetchTodos()

const { activeQuery, forPriority, forPrioritySearch } = storeToRefs(store)
</script>

<template lang="pug">
main
  MultiBar.mb-4
  TodoList.mb-4(v-if="activeQuery && forPrioritySearch(priority).length" :todos="forPrioritySearch(priority)")
  .opacity-50(v-else-if="activeQuery")
    TodoList.mb-4(:todos="forPriority(priority)")
  TodoList.mb-4(v-else :todos="forPriority(priority)")
</template>
