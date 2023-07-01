<template lang="pug">
div
  label.mr-1(for="localeSelect")
    fa(icon="fa-solid fa-language")
  select#localeSelect(v-model="$i18n.locale")
    option(v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale") {{ locale }}
</template>
