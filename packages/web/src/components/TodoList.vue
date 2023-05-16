<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "../stores/todos"

const todo = ref("")

const store = useTodosStore()

const { list } = storeToRefs(store)

function addTodoAndClear(item: string) {
  if (item.length === 0) {
    return
  }

  store.addTodo(item)
  todo.value = ""
}

const { toggleTodo, deleteTodo } = store
</script>

<template lang="pug">
ul
  li.space-x-4(v-for="todo in list" :key="todo.text")
    button(@click="toggleTodo(todo.text)")
      fa(v-if="todo.done" icon="fa-solid fa-square-check")
      fa(v-else icon="fa-regular fa-square")
    span {{ todo.text }}
    button.text-red-600(@click="deleteTodo(todo.text)") Delete

  form(@submit.prevent="addTodoAndClear(todo)")
    input(v-model="todo" type="text")
    button Add
</template>
