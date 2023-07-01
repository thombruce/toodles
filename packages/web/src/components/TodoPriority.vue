<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  priority: {
    type: String,
    required: true
  }
})

const alpha = computed(() => {
  return props.priority.replace(/[()]/g, '')
})
</script>

<template lang="pug">
RouterLink.tag.priority(:class="alpha" :to="{ name: 'priority', params: { priority: priority }}") {{ priority }}
</template>
