<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useGlobalsStore } from './stores/globals'

import ProjectList from './components/ProjectList.vue';
import ContextList from './components/ContextList.vue';

const store = useGlobalsStore()
const { ready } = storeToRefs(store)
</script>

<template lang="pug">
template(v-if="ready")
  header.mb-4
    strong Toodles
    nav.space-x-4
      RouterLink(to="/") Home
      RouterLink(to="/about") About

  ProjectList
  ContextList
  RouterView(v-if="ready" :key="$route.fullPath")
template(v-else) Loading
</template>
