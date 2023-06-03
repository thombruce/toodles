<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  priority: {
    type: String,
    required: true
  }
})

const color = computed(() => {
  switch(props.priority) {
    case '(A)':
      return 'text-red-500'
    case '(B)':
      return 'text-amber-500'
    case '(C)':
      return 'text-yellow-500'
    default:
      return 'text-gray-500'
  }
})
</script>

<template lang="pug">
RouterLink.font-bold.cursor-pointer(:class="color" :to="{ name: 'priority', params: { priority: priority }}") {{ priority }}
</template>
