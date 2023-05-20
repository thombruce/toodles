<script setup lang="ts">
import { useRoute } from "vue-router"

import { useTodosStore } from "../stores/todos"

import TodoItem from "../components/TodoItem.vue"
import IntervalList from "../components/IntervalList.vue"

const route = useRoute()
const { todoId } = route.params

const store = useTodosStore()

const { find } = store
</script>

<template lang="pug">
main
  TodoItem(:todo="find(todoId)")
  IntervalList(:todoId="todoId")
</template>
