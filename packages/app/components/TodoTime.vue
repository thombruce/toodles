<script setup>
import { useTodosStore } from '@/stores/todos'

const props = defineProps([
  'value',
  'todo',
  'parent',
])

const time = ref(props.value)

const increment = () => {
  time.value++
  updateTodoDescription(
    props.todo.id,
    `${props.todo.description}`.replace(/time:[^\s:]+/, `time:${time.value}`),
    props.parent
  )
}

// Store
const store = useTodosStore()
// Store: Actions
const { updateTodoDescription } = store
</script>

<template lang="pug">
span
  | time:{{ time }}
  |
  TntButton.btn-none.align-text-top(@click="increment()")
    Icon(name="fa:play")
</template>
