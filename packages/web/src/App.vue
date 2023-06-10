<script setup lang="ts">
</script>

<template lang="pug">
header.mb-4
  strong Toodles
  nav.space-x-4
    RouterLink(to="/") Home
    RouterLink(to="/about") About
RouterView(:key="$route.fullPath")
</template>
