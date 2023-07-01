<script setup lang="ts">
const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})
</script>

<template lang="pug">
span.text-amber-700.font-bold.rounded.bg-amber-50(class="dark:text-amber-500 dark:bg-amber-950") {{ tag }}
</template>