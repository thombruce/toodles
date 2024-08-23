<script setup>
// TODO: Hide sidebar by default when default page issue is resolved (see below)
const sidebar = useSidebar()
sidebar.value = true
</script>

<template lang="pug">
NuxtLayout(name="default")
  h1 Welcome to Toodles
  p Use the sidebar to navigate to or create your first document.
  //- Note: The use may already have a document they would like
  //- open, and we should treat todo.txt as the default if not.
  //- The above text is inappropriate for our needs.
</template>
