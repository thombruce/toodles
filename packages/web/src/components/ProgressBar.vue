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
    RouterLink.block.absolute.w-full.bg-gray-200.rounded-full(:to="{ name: 'home' }" class='h-2.5 dark:bg-gray-800')
      span.sr-only {{ $t("pages.home") }}
  template(v-else-if="$route.name === 'done'")
    RouterLink.block.absolute.w-full.bg-emerald-500.rounded-full(:to="{ name: 'home' }" class='h-2.5')
      span.sr-only {{ $t("pages.home") }}
  template(v-else)
    RouterLink.block.absolute.w-full.bg-gray-200.rounded-full(:to="{ name: 'open' }" class='h-2.5 dark:bg-gray-800')
      span.sr-only {{ $t("conditions.open") }}
    RouterLink.block.absolute.bg-emerald-500.rounded-full(:to="{ name: 'done' }" class='h-2.5 transition-[width] ease-in-out duration-500' :style="'width:'+progress+'%;'")
      span.sr-only {{ $t("conditions.closed") }}
</template>
