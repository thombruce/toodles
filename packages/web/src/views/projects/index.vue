<script setup lang="ts">
import { Project } from '@/models/Project'
import { useProjectsStore } from '@/stores/projects'
import EntityList from '@/components/EntityList.vue'

// TODO: This probably isn't reactive.
const projects = Project.all(useProjectsStore().list)
</script>

<template lang="pug">
main
  EntityList(:list="projects")
</template>
