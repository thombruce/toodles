<script setup lang="ts">
import { useRoute } from "vue-router"

import TodoList from "@/components/TodoList.vue"
import { useTagsStore } from "@/stores/tags";
import { storeToRefs } from "pinia";

const route = useRoute()
const { tagId } = route.params

const store = useTagsStore()
const { find } = storeToRefs(store)
</script>

<template lang="pug">
main
  TodoList(:tag="find(tagId)")
</template>
