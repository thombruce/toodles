<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.text-purple-600.font-bold.cursor-pointer(:to="{ name: 'context', params: { context: tag }}") {{ tag }}
</template>