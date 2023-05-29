<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCommentsStore } from "../stores/comments"

const props = defineProps({
  todoId: String
})

const store = useCommentsStore()

const { countForTodo } = storeToRefs(store)
</script>

<template lang="pug">
RouterLink.space-x-2.flex.items-center(:to="{ name: 'todo', params: { id: todoId }}" :class="'hover:bg-gray-200 px-2 rounded'")
  fa(icon="fa-regular fa-message" fixed-width)
  span.grow {{ countForTodo(todoId) }}
</template>
