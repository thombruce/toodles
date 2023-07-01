<script setup lang="ts">
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<template lang="pug">
.relative.w-full(class="h-2.5")
  template(v-if="$route.name === 'open'")
    RouterLink.progress.open(:to="{ name: 'home' }")
      span.sr-only {{ $t("pages.home") }}
  template(v-else-if="$route.name === 'done'")
    RouterLink.progress.closed(:to="{ name: 'home' }")
      span.sr-only {{ $t("pages.home") }}
  template(v-else)
    RouterLink.progress.open(:to="{ name: 'open' }")
      span.sr-only {{ $t("conditions.open") }}
    RouterLink.progress.closed(:to="{ name: 'done' }" :style="'width:'+progress+'%;'")
      span.sr-only {{ $t("conditions.closed") }}
</template>
