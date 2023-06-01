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
RouterLink.text-purple-500.font-bold.cursor-pointer(:to="{ name: 'context', params: { context: tag }}") {{ tag }}
</template>