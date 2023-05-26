<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useProjectsStore } from "../stores/projects"

const store = useProjectsStore()

const { list } = storeToRefs(store)
</script>

<template lang="pug">
ul.mb-4.flex.space-x-4
  li.inline(v-for="project in list?.data" :key="project.id")
    RouterLink(:to="{ name: 'project', params: { projectId: project.id }}") {{ project.shortName }}
</template>
