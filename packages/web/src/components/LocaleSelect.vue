<template lang="pug">
div
  label.mr-1(for="localeSelect")
    fa(icon="fa-solid fa-language")
  select#localeSelect.bg-transparent(v-model="$i18n.locale")
    option.bg-white.text-black(v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale" class="dark:bg-gray-900 dark:text-white") {{ locale }}
</template>
