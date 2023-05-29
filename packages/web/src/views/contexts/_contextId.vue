<script setup lang="ts">
import { useRoute } from "vue-router"

import TodoList from "@/components/TodoList.vue"
import { useContextsStore } from "@/stores/contexts";
import { storeToRefs } from "pinia";

const route = useRoute()
const { contextId } = route.params

const store = useContextsStore()
const { find } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList(:context="find(contextId)")
</template>
