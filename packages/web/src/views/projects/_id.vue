<script setup lang="ts">
import { useRoute } from "vue-router"

import TodoList from "@/components/TodoList.vue"

const route = useRoute()
const { project } = route.params
</script>

<template lang="pug">
main
  TodoList(:project="project")
</template>
