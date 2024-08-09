<script setup>
import { useTodosStore } from '@/stores/todos'

const props = defineProps([
  'todo',
  'parent',
])

// Store
const store = useTodosStore()
// Store: Actions
const { toggleTodoTimer } = store
</script>

<template lang="pug">
span(:class="todo.isActive ? 'is-active' : ''")
  | time:{{ todo.timer }}
  |
  TntButton.btn-none.align-text-top(@click="toggleTodoTimer(todo.id, parent)")
    Icon(v-if="!todo.isActive" name="fa:play")
    Icon(v-else name="fa:pause")
</template>

<style lang="postcss">
span.is-active {
  @apply
    animate-pulse;
}
</style>
