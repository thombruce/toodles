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
NuxtLayout(name="default")
  .not-prose
    TodoForm

    ProgressBar.mb-3(:value="progress")

    ul.space-y-2
      li(v-for="item in todos")
        TodoItem(:todo="item" :key="`todo-${item.id}`")
</template>
