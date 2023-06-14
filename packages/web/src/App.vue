<script setup lang="ts">
import MultiBar from "@/components/MultiBar.vue"
</script>

<template lang="pug">
header.mb-4
  strong Toodles
  nav.space-x-4
    RouterLink(to="/") Home
    RouterLink(to="/about") About
MultiBar.mb-4
RouterView(:key="$route.fullPath")
</template>
