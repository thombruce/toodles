<script setup lang="ts">
import { ref } from 'vue'

const theme = ref(localStorage.theme || 'system')

const toggleDarkMode = (event: any) => {
  if (event.target.value === 'system') {
    localStorage.removeItem('theme')
  } else {
    localStorage.theme = event.target.value
  }

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template lang="pug">
.space-x-4
  .inline.space-x-1
    input(type="radio" id="light" name="darkmode" value="light" v-model="theme" @change="toggleDarkMode($event)")
    label(for="light") {{ $t("conditions.light") }}
  .inline.space-x-1
    input(type="radio" id="dark" name="darkmode" value="dark" v-model="theme" @change="toggleDarkMode($event)")
    label(for="dark") {{ $t("conditions.dark") }}
  .inline.space-x-1
    input(type="radio" id="system" name="darkmode" value="system" v-model="theme" @change="toggleDarkMode($event)")
    label(for="system") {{ $t("conditions.system") }}
</template>
