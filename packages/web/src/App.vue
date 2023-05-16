<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template lang="pug">
header.mb-4
  strong Toodles
  nav.space-x-4
    RouterLink(to="/") Home
    RouterLink(to="/about") About

RouterView
</template>
