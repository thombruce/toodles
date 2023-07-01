<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.tag.project(:to="{ name: 'project', params: { project: tag }}") {{ tag }}
</template>