<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

import { useTodosStore } from "@/stores/todos"

import TodoList from "@/components/TodoList.vue"

const route = useRoute()
const { hashtag } = route.params

const store = useTodosStore()

store.fetchTodos()

const { activeQuery, forHashtag, forHashtagSearch } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList.mb-4(v-if="activeQuery && forHashtagSearch(hashtag).length" :todos="forHashtagSearch(hashtag)")
  .opacity-50(v-else-if="activeQuery")
    TodoList.mb-4(:todos="forHashtag(hashtag)")
  TodoList.mb-4(v-else :todos="forHashtag(hashtag)")
</template>
