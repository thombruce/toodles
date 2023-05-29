<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useTagsStore } from "../stores/tags"

import { computed } from "vue"

const store = useTagsStore()

const { list } = storeToRefs(store)

const tagList = computed(() => {
  return list.value.data
})
</script>

<template lang="pug">
ul.mb-4
  li(v-for="tag in tagList" :key="tag.id")
    span {{ tag.key }}
    | :
    span {{ tag.value }}
</template>
