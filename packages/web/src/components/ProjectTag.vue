<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.text-teal-700.font-bold.cursor-pointer(:to="{ name: 'project', params: { project: tag }}" class="dark:text-teal-500") {{ tag }}
</template>