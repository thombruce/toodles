<script setup>
import { useTodosStore } from '@/stores/todos'
import { storeToRefs } from 'pinia'

// Store
const store = useTodosStore()
// Store: State/Getters
const { all: todos } = storeToRefs(store)
// Store: Actions
const { fetchTodos, addTodo } = store

// Init
fetchTodos()
</script>

<template lang="pug">
div
  ul
    li(v-for="item in todos") {{ item }}
  TntButton(@click="addTodo('foo')") Add todo
</template>
