<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  priority: {
    type: String,
    required: true
  }
})

const color = computed(() => {
  switch(props.priority) {
    case '(A)':
      return 'text-red-600'
    case '(B)':
      return 'text-yellow-600'
    case '(C)':
      return 'text-green-600'
    default:
      return 'text-gray-500'
  }
})
</script>

<template lang="pug">
RouterLink.font-bold.cursor-pointer(:class="color" :to="{ name: 'priority', params: { priority: priority }}") {{ priority }}
</template>
