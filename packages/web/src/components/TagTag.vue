<script setup lang="ts">
import { Tag } from '@/models/Tag'
import { useTagsStore } from '@/stores/tags'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  tag: {
    type:String,
    required:true
  }
})

const store = useTagsStore()

const tag = computed(() => {
  const [key, value] = props.tag.split(':')
  const tag = Tag.find({ key, value }, useTagsStore().list)
  return tag
})
</script>

<template lang="pug">
RouterLink.text-amber-500.font-bold.rounded.bg-amber-50.px-1(:to="{ name: 'tag', params: { id: tag.id }}") {{ tag.displayName }}
</template>