<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useTodosStore } from "../stores/todos"

import IntervalTimer from "../components/IntervalTimer.vue"
import TallyCounter from "../components/TallyCounter.vue"

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const store = useTodosStore()
const { updateTodo, toggleTodo, deleteTodo } = store
</script>

<template lang="pug">
.space-x-4.mb-1.flex.items-center
  button(@click="toggleTodo(todo.id)")
    fa(v-if="todo.done" icon="fa-solid fa-square-check")
    fa(v-else icon="fa-regular fa-square")
  input(@input="updateTodo(todo.id, $event.target.value)" @keyup.enter="$refs.newTodo.focus()" :value="todo.text")
  RouterLink(:to="{ name: 'todo', params: { todoId: todo.id }}") Link
  IntervalTimer(:todoId="todo.id" class="w-1/5 sm:w-1/6 xl:w-1/12")
  TallyCounter(:todoId="todo.id" class="w-20 min-w-fit")
  button.text-red-600(@click="deleteTodo(todo.id)") Delete
</template>