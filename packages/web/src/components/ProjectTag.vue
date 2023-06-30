<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.text-teal-700.font-bold.cursor-pointer(:to="{ name: 'project', params: { project: tag }}") {{ tag }}
</template>