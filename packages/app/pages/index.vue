<script setup>
import { useTodosStore } from '@/stores/todos'
import { storeToRefs } from 'pinia'

// Store
const store = useTodosStore()
// Store: State/Getters
const { all: todos, progress } = storeToRefs(store)
// Store: Actions
const { fetchTodos, addTodo } = store

// Init
fetchTodos()

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
NuxtLayout(name="default")
  .not-prose
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

    ProgressBar.mb-3(:value="progress")

    ul.space-y-2
      li(v-for="item in todos")
        TodoItem(:todo="item" :key="`todo-${item.id}`")
</template>
