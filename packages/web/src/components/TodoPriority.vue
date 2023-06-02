<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  priority: {
    type: String,
    required: false
  }
})

const color = computed(() => {
  switch(props.priority) {
    case 'A':
      return 'text-red-500'
    case 'B':
      return 'text-amber-500'
    case 'C':
      return 'text-yellow-500'
    default:
      return 'text-gray-500'
  }
})
</script>

<template lang="pug">
span.font-mono.font-bold(:class="color") {{ priority }}
</template>
