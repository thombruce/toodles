<script setup lang="ts">
import { useRoute } from "vue-router"

import TodoList from "@/components/TodoList.vue"

const route = useRoute()
const { context } = route.params
</script>

<template lang="pug">
main
  TodoList(:context="context")
</template>
