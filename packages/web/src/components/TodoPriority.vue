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
      return 'text-rose-700 dark:text-rose-500'
    case '(B)':
      return 'text-yellow-700 dark:text-yellow-500'
    case '(C)':
      return 'text-green-700 dark:text-green-500'
    default:
      return 'text-gray-500 dark:text-gray-400'
  }
})
</script>

<template lang="pug">
RouterLink.font-bold.cursor-pointer(:class="color" :to="{ name: 'priority', params: { priority: priority }}") {{ priority }}
</template>
