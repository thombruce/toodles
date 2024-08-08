<script setup>
import { useTodosStore } from '@/stores/todos'

const props = defineProps([
  'value',
  'todo',
  'parent',
])

const count = ref(props.value)

const increment = () => {
  count.value++
  updateTodoDescription(
    props.todo.id,
    `${props.todo.description}`.replace(/count:[^\s:]+/, `count:${count.value}`),
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
  | count:{{ count }}
  |
  TntButton.btn-none.align-text-top(@click="increment()")
    Icon(name="fa:plus")
</template>
