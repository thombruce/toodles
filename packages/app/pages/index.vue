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
  form.flex.w-full.space-x-4.mb-3
    TntInput.grow(
      type="text"
    )
    TntButton(@click="addTodo('! (B) 2024-01-01 2024-12-31 £1.00-£5.00 This #programmaticallyAdded and #focused +Todo has @Everything including:tags x2')") Add

  ProgressBar.mb-3(value="50")

  ul
    li(v-for="item in todos")
      TodoItem(:todo="item")
</template>
