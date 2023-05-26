<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useTodosStore } from "../stores/todos"

import IntervalTimer from "../components/IntervalTimer.vue"
import TallyCounter from "../components/TallyCounter.vue"
import CommentCount from "./CommentCount.vue"
import { computed } from "vue"
import { Project } from "@/models/Project"
import { useProjectsStore } from "@/stores/projects"

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const store = useTodosStore()
const { toggleTodo, deleteTodo } = store

const updateTodoAndBlur = (e: Event) => {
  const input = e.target as HTMLElement
  store.updateTodo(props.todo.id, input.innerText.trim())
  input.blur()
}

const todoHTML = computed(() => {
  const decorated = props.todo.text.replace(/(?<=(?:^|\s)\+)\S+/g, (m: string) => {
    const project = Project.find({ shortName: m }, useProjectsStore().list)
    return `<a href="/projects/${project?.id}" class="project-tag">${project?.shortName}</a>`
  })
  return decorated
})
</script>

<template lang="pug">
.space-x-4.mb-1.flex.items-center
  button(@click="toggleTodo(todo.id)")
    fa(v-if="todo.done" icon="fa-solid fa-square-check")
    fa(v-else icon="fa-regular fa-square")
  span(@keydown.enter="updateTodoAndBlur" contenteditable spellcheck="false" v-html="todoHTML")
  RouterLink(:to="{ name: 'todo', params: { todoId: todo.id }}") Link
  IntervalTimer(:todoId="todo.id" class="w-1/5 sm:w-1/6 xl:w-1/12")
  TallyCounter(:todoId="todo.id" class="w-20 min-w-fit")
  CommentCount(:todoId="todo.id" class="w-16 min-w-fit")
  button.text-red-600(@click="deleteTodo(todo.id)") Delete
</template>