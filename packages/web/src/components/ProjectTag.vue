<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.text-teal-500.font-bold.cursor-pointer(:to="{ name: 'project', params: { project: tag }}") {{ tag }}
</template>