<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

import { useTodosStore } from "@/stores/todos"

import TodoList from "@/components/TodoList.vue"
import TodoForm from '@/components/TodoForm.vue'

const route = useRoute()
const { priority } = route.params

const store = useTodosStore()

const { forPriority } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList.mb-4(:todos="forPriority(priority)")
  TodoForm
</template>
