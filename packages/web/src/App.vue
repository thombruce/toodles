<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/default.vue'

const route = useRoute()
const layout = ref(DefaultLayout)

watch(
  () => route.meta,
  async meta => {
    try {
      const component = await import(`@/layouts/${meta.layout}.vue`)
      layout.value = component?.default || DefaultLayout
    } catch (e) {
      layout.value = DefaultLayout
    }
  },
  { immediate: true }
)
</script>

<template lang="pug">
.max-w-4xl.mx-auto.my-4
  header.mb-4
    strong {{ $t("app.name") }}
    nav.space-x-4
      RouterLink(to="/") {{ $t("pages.home") }}
      RouterLink(to="/settings") {{ $t("pages.settings") }}
      RouterLink(to="/about") {{ $t("pages.about") }}
  component(:is="layout")
    RouterView(:layout.sync="layout" :key="$route.fullPath")
</template>
