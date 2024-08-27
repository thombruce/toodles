<script setup>
import { useTodosStore } from '@/stores/todos'
import { storeToRefs } from 'pinia'

const { path, params } = useRoute()

useTntApi().updateConfig({ lastOpened: path })

// Store
const store = useTodosStore()
// Store: State/Getters
const { all: todos, progress } = storeToRefs(store)
// Store: Actions
const { fetchTodos } = store

// Init
fetchTodos(path.replace(/^\/|\/$/, ''))
</script>

<template lang="pug">
NuxtLayout(name="application")
  .px-4.pt-2.pb-3.sticky.top-0.z-40.backdrop-blur-md
    TodoForm
    ProgressBar(:value="progress")

  ul.px-4.space-y-2
    li(v-for="item in todos")
      TodoItem(:todo="item" :key="`todo-${item.id}`")
</template>
