<script setup lang="ts">
import { useRoute } from "vue-router"

import TodoList from "@/components/TodoList.vue"
import TodoForm from '@/components/TodoForm.vue'

const route = useRoute()
const { context } = route.params
</script>

<template lang="pug">
main
  TodoList(:context="context")
  TodoForm
</template>
