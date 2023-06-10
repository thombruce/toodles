<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<template lang="pug">
RouterLink.block.w-full.bg-gray-200.rounded-full(:to="{ name: 'open' }" class='h-2.5')
  RouterLink.block.bg-emerald-500.rounded-full(:to="{ name: 'done' }" class='h-2.5 transition-[width] ease-in-out duration-500' :style="'width:'+progress+'%;'")
</template>
