<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"

import { useTodosStore } from "@/stores/todos"

import TodoList from "@/components/TodoList.vue"
import TodoForm from '@/components/TodoForm.vue'

const store = useTodosStore()

const { list } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList(:todos="list.data")
  TodoForm
</template>
