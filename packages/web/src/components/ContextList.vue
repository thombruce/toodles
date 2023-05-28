<script setup lang="ts">
import { storeToRefs } from "pinia"

import { useContextsStore } from "../stores/contexts"

const store = useContextsStore()

const { list } = storeToRefs(store)
</script>

<template lang="pug">
ul.mb-4.flex.space-x-4
  li.inline(v-for="context in list?.data" :key="context.id")
    RouterLink(:to="{ name: 'context', params: { contextId: context.id }}") {{ context.shortName }}
</template>
