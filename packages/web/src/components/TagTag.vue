<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
span.text-amber-500.font-bold.rounded.bg-amber-50 {{ tag }}
</template>