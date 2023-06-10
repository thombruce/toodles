<script setup lang="ts">
import { useTodosStore } from "../stores/todos"

import TodoPriority from "./TodoPriority.vue"
import TodoText from "./TodoText.vue"

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const store = useTodosStore()
const { toggleTodo, deleteTodo } = store

const updateTodo = (e: Event) => {
  const input = e.target as HTMLElement
  store.updateTodo(props.todo.id, input.innerText.trim())
  input.blur()
}
</script>

<template lang="pug">
.space-x-4.mb-1.flex.items-center
  button(@click="toggleTodo(todo.id)")
    fa(v-if="todo.done" icon="fa-solid fa-square-check")
    fa(v-else icon="fa-regular fa-square")
  RouterLink.opacity-50(v-if="todo.done" :to="{ name: 'done' }")
    time.text-gray-500(:datetime="todo.done") {{ new Date(todo.done).toDateString() }}
  TodoText(v-model="todo.editable" @blur="updateTodo" @keydown.enter="$event.target.blur()" :class="todo.done ? 'opacity-50 line-through decoration-gray-500' : ''")
  //- RouterLink(:to="{ name: 'todo', params: { id: todo.id }}") Link
  button.text-red-600(@click="deleteTodo(todo.id)") Delete
</template>