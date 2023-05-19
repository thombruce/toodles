<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "../stores/todos"

import IntervalTimer from "./IntervalTimer.vue";

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

const { updateTodo, toggleTodo, deleteTodo } = store
</script>

<template lang="pug">
ul.mb-4
  li.space-x-4.mb-1.flex.items-center(v-for="todo in list?.data" :key="todo.id")
    button(@click="toggleTodo(todo.id)")
      fa(v-if="todo.done" icon="fa-solid fa-square-check")
      fa(v-else icon="fa-regular fa-square")
    input(@input="updateTodo(todo.id, $event.target.value)" @keyup.enter="$refs.newTodo.focus()" :value="todo.text")
    IntervalTimer(:todoId="todo.id" class="w-1/5 sm:w-1/6 xl:w-1/12")
    button.text-red-600(@click="deleteTodo(todo.id)") Delete

form.space-x-4(@submit.prevent="addTodoAndClear(todo)")
  input(v-model="todo" type="text" class="border rounded py-2 px-3 text-gray-700" ref="newTodo")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add
</template>
