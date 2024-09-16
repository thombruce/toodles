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
  TntButton.btn-none.align-text-top.ml-1(@click.stop="incrementTodoCount(todo.id, parent)")
    Icon(name="fa6-solid:plus")
</template>
