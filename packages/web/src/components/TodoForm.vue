<script setup lang="ts">
import { ref } from "vue"

import { useTodosStore } from "../stores/todos"

const todo = ref("")

const store = useTodosStore()

function addTodoAndClear(item: string) {
  if (item.length === 0) {
    return
  }

  store.addTodo(item)
  todo.value = ""
}
</script>

<template lang="pug">
form.space-x-4(@submit.prevent="addTodoAndClear(todo)")
  input(v-model="todo" type="text" class="border rounded py-2 px-3 text-gray-700" ref="newTodo")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add
</template>
