<script setup lang="ts">
import DarkMode from '@/components/DarkMode.vue'
import LocaleSelect from '@/components/LocaleSelect.vue'
</script>

<template lang="pug">
main
  h1.text-xl.font-bold.mb-4 {{ $t("pages.settings") }}
  .mb-4
    h2.text-lg {{ $t("conditions.darkMode") }}
    DarkMode
  .mb-4
    h2.text-lg {{ $t("conditions.language") }}
    LocaleSelect
</template>
