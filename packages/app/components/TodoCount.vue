<script setup>
import { useTodosStore } from '@/stores/todos'

const props = defineProps([
  'todo',
  'parent',
])

// Store
const store = useTodosStore()
// Store: Actions
const { incrementTodoCount } = store
</script>

<template lang="pug">
span
  | count:{{ todo.count }}
  |
  TntButton.btn-none.align-text-top(@click="incrementTodoCount(todo.id, parent)")
    Icon(name="fa:plus")
</template>
