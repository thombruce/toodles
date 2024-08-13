<script setup>
import { useTodosStore } from '@/stores/todos'

// Store
const store = useTodosStore()
// Store: Actions
const { addTodo } = store

const newTodo = ref({ priority: undefined, due: undefined, description: "" })

function addTodoAndClear() {
  if (newTodo.value.description.length === 0) {
    return
  }

  addTodo(newTodo.value)
  clear()
}

function clear() {
  newTodo.value = { priority: undefined, due: undefined, description: "" }
  // search()
}
</script>

<template lang="pug">
TntForm.flex.w-full.space-x-4.mb-3(@submit="addTodoAndClear()")
  TntSelect.flex-0.min-w-16(
    v-model="newTodo.priority"
    :options="['', 'A', 'B', 'C']"
  )

  TntInput.flex-0(
    v-model="newTodo.due"
    type="date"
  )

  TntInput.flex-1(
    v-model="newTodo.description"
    @keydown.esc="clear();$event.target.blur()"
  )

  TntSubmit Add
</template>
