<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const text = ref("")

const store = useTodosStore()

function search(q: string) {
  store.searchTodos(q)
}

function globalSearch(q: string) {
  router.push('/')
  store.searchTodos(q)
}

function addTodoAndClear(item: string) {
  if (item.length === 0) {
    return
  }

  store.addTodo(item)
  text.value = ""
  search(text.value)
}

function clear() {
  text.value = ""
  search(text.value)
}
</script>

<template lang="pug">
form.flex.w-full.space-x-4(@submit.prevent="addTodoAndClear(text)")
  input.grow(v-model="text" type="text" class="border rounded py-2 px-3 text-gray-700" @input="search(text)" @keydown.ctrl.enter="globalSearch(text)" @keydown.esc="clear();$event.target.blur()")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Add
</template>
