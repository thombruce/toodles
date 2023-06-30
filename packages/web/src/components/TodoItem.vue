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
.flex.flex-row.gap-x-4.mb-1.items-center
  button(@click="toggleTodo(todo.id)" :aria-label="$t('actions.toggle')")
    fa(v-if="todo.done" icon="fa-solid fa-square-check")
    fa(v-else icon="fa-regular fa-square")
  RouterLink.whitespace-nowrap(v-if="todo.done" :to="{ name: 'done' }")
    time.text-gray-500(:datetime="todo.done") {{ new Date(todo.done).toDateString() }}
  TodoText.grow.overflow-hidden.break-words(v-model="todo.editable" @blur="updateTodo" @keydown.enter="$event.target.blur()" :class="todo.done ? 'text-gray-500 line-through decoration-gray-500' : ''")
  button.text-red-300.text-sm(@click="deleteTodo(todo.id)" class="hover:text-red-500" :aria-label="$t('actions.delete')")
    fa(icon="fa-solid fa-trash-can")
</template>
