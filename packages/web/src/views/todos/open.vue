<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "@/stores/todos"

import MultiBar from "@/components/MultiBar.vue"
import TodoList from "@/components/TodoList.vue"

const store = useTodosStore()

store.fetchTodos()

const { activeQuery, open, openSearch } = storeToRefs(store)
</script>

<template lang="pug">
main
  MultiBar.mb-4
  TodoList.mb-4(v-if="activeQuery && openSearch().length" :todos="openSearch()")
  .opacity-50(v-else-if="activeQuery")
    TodoList.mb-4(:todos="open()")
  TodoList.mb-4(v-else :todos="open()")
</template>
