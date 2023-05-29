<script setup lang="ts">
import { Context } from '@/models/Context'
import { useContextsStore } from '@/stores/contexts'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})

const store = useContextsStore()

const context = computed(() => {
  const context = Context.find({ shortName: props.tag.replace(/^@/, "") }, useContextsStore().list)
  return context
})
</script>

<template lang="pug">
RouterLink.text-purple-500.font-bold(:to="{ name: 'context', params: { id: context.id }}") {{ tag }}
</template>