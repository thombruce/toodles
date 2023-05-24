<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useGlobalsStore } from './stores/globals'

const store = useGlobalsStore()
const { ready } = storeToRefs(store)
</script>

<template lang="pug">
header.mb-4
  strong Toodles
  nav.space-x-4
    RouterLink(to="/") Home
    RouterLink(to="/about") About

RouterView(v-if="ready")
p(v-else) Loading
</template>
