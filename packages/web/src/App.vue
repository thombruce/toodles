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
      RouterLink(to="/projects") Projects
      RouterLink(to="/contexts") Contexts
      RouterLink(to="/tags") Tags
      RouterLink(to="/about") About

  RouterView(v-if="ready" :key="$route.fullPath")
template(v-else) Loading
</template>
