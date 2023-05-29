<script setup lang="ts">
import { Tag } from '@/models/Tag'
import { useTagsStore } from '@/stores/tags'
import EntityList from '@/components/EntityList.vue'

// TODO: This probably isn't reactive.
const tags = Tag.all(useTagsStore().list)
</script>

<template lang="pug">
main
  EntityList(:list="tags")
</template>
