<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
RouterLink.tag.hashtag(:to="{ name: 'hashtag', params: { hashtag: tag }}") {{ tag }}
</template>
