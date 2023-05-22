<script setup lang="ts">
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"

import { useTodosStore } from "../stores/todos"

import TodoItem from "../components/TodoItem.vue"
import IntervalList from "../components/IntervalList.vue"
import TallyList from "../components/TallyList.vue"

const route = useRoute()
const { todoId } = route.params

const store = useTodosStore()
const { find } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoItem(:todo="find(todoId)")
  //- TODO: Combine interval and tally lists
  IntervalList(:todoId="todoId")
  TallyList(:todoId="todoId")
</template>
