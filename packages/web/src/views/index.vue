<script setup lang="ts">
import TodoList from '../components/TodoList.vue'
import { useTodosStore } from '@/stores/todos'
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
</script>

<template lang="pug">
main
  TodoList
</template>
