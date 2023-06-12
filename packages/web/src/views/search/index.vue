<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useTodosStore } from "@/stores/todos"

import SearchBar from "@/components/SearchBar.vue"
import TodoList from "@/components/TodoList.vue"
import { useRoute } from "vue-router"

const store = useTodosStore()

const route = useRoute()

store.searchTodos(String(route.query.s))

const { results } = storeToRefs(store)
</script>

<template lang="pug">
main
  SearchBar
  TodoList.mb-4(:todos="results")
</template>
