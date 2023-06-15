<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "@/stores/todos"

import TodoList from "@/components/TodoList.vue"

const store = useTodosStore()

store.fetchTodos()

const { activeQuery, all, allSearch } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList.mb-4(v-if="activeQuery && allSearch().length" :todos="allSearch()")
  .opacity-50(v-else-if="activeQuery")
    TodoList.mb-4(:todos="all()")
  TodoList.mb-4(v-else :todos="all()")
</template>
