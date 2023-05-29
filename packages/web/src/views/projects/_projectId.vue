<script setup lang="ts">
import { useRoute } from "vue-router"

import TodoList from "@/components/TodoList.vue"
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const route = useRoute()
const { projectId } = route.params

const store = useProjectsStore()
const { find } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList(:project="find(projectId)")
</template>
