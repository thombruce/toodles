<script setup lang="ts">
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"

import { useTodosStore } from "../stores/todos"

import TodoItem from "../components/TodoItem.vue"
import IntervalList from "../components/IntervalList.vue"
import TallyList from "../components/TallyList.vue"
import CommentList from "@/components/CommentList.vue"

// import { useTodosStore } from '@/stores/todos'
import { useIntervalsStore } from '@/stores/intervals'
import { useTalliesStore } from '@/stores/tallies'
import { useCommentsStore } from '@/stores/comments'

const todos = useTodosStore()
todos.initStore()
const intervals = useIntervalsStore()
intervals.initStore()
const tallies = useTalliesStore()
tallies.initStore()
const comments = useCommentsStore()
comments.initStore()

const route = useRoute()
const { todoId } = route.params

const store = useTodosStore()
const { find } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoItem(:todo="find(todoId)")
  //- TODO: Combine lists
  CommentList(:todoId="todoId")
  IntervalList(:todoId="todoId")
  TallyList(:todoId="todoId")
</template>
