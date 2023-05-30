<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})
</script>

<template lang="pug">
ul.mb-4.flex.space-x-4
  li.inline(v-for="entity in list" :key="entity.id")
    RouterLink(:to="{ name: entity.klass.toLowerCase(), params: { id: entity.id }}") {{ entity.displayName }}
</template>
