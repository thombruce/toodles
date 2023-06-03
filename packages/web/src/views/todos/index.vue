<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "@/stores/todos"

import TodoList from "@/components/TodoList.vue"
import TodoForm from '@/components/TodoForm.vue'

const store = useTodosStore()

const { all } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList.mb-4(:todos="all()")
  TodoForm
</template>
