<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.tag.context(:to="{ name: 'context', params: { context: tag }}") {{ tag }}
</template>