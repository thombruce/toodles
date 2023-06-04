<script setup lang="ts">
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<template lang="pug">
.w-full.bg-gray-200.rounded-full(class='h-2.5')
  .bg-emerald-500.rounded-full(class='h-2.5 transition-[width] ease-in-out duration-500' :style="'width:'+progress+'%;'")
</template>
