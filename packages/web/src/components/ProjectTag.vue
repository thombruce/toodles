<script setup lang="ts">
import { Project } from '@/models/Project'
import { useProjectsStore } from '@/stores/projects'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})

const store = useProjectsStore()

const project = computed(() => {
  const project = Project.find({ shortName: props.tag.replace(/^\+/, "") }, useProjectsStore().list)
  return project
})
</script>

<template lang="pug">
RouterLink.text-teal-500.font-bold(:to="{ name: 'project', params: { projectId: project.id }}") {{ tag }}
</template>