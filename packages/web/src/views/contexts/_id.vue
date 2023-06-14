<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

import { useTodosStore } from "@/stores/todos"

import MultiBar from "@/components/MultiBar.vue"
import TodoList from "@/components/TodoList.vue"

const route = useRoute()
const { context } = route.params

const store = useTodosStore()

store.fetchTodos()

const { activeQuery, forContext, forContextSearch } = storeToRefs(store)
</script>

<template lang="pug">
main
  MultiBar.mb-4
  TodoList.mb-4(v-if="activeQuery && forContextSearch(context).length" :todos="forContextSearch(context)")
  .opacity-50(v-else-if="activeQuery")
    TodoList.mb-4(:todos="forContext(context)")
  TodoList.mb-4(v-else :todos="forContext(context)")
</template>
