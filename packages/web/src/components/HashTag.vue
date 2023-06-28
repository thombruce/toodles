<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.text-indigo-500.font-bold.cursor-pointer(:to="{ name: 'hashtag', params: { hashtag: tag }}") {{ tag }}
</template>
