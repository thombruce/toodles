<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "../stores/todos"

import TodoItem from "./TodoItem.vue"
import { computed } from "vue"

const props = defineProps({
  project: {
    type: String,
    required: false
  },
  context: {
    type: String,
    required: false
  }
})

const todo = ref("")

const store = useTodosStore()

const { list, forProject, forContext } = storeToRefs(store)

function addTodoAndClear(item: string) {
  if (item.length === 0) {
    return
  }

  store.addTodo(item)
  todo.value = ""
}

const todoList = computed(() => {
  if (props.project) return forProject.value(props.project)
  if (props.context) return forContext.value(props.context)
  return list.value.data
})
</script>

<template lang="pug">
ul.mb-4
  li(v-for="todo in todoList" :key="todo.id")
    TodoItem(:todo="todo")

form.space-x-4(@submit.prevent="addTodoAndClear(todo)")
  input(v-model="todo" type="text" class="border rounded py-2 px-3 text-gray-700" ref="newTodo")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add
</template>
