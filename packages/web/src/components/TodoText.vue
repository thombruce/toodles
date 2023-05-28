<script setup lang="ts">
import { computed } from "vue"
import { Project } from "@/models/Project"
import { useProjectsStore } from "@/stores/projects"

import ProjectTag from "./ProjectTag.vue"
import ContextTag from "./ContextTag.vue"

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function update(e: Event) {
  const input = e.target as HTMLElement
  emit('update:modelValue', input.innerText.trim())
}

const items = computed(() => {
  return props.modelValue?.split(/((?<=^|\s)(?:\+|@)\S+)/g)
})

const projectMatcher = (item: string) => /^\+\S+$/.test(item)
const contextMatcher = (item: string) => /^@\S+$/.test(item)
</script>

<template lang="pug">
span(contenteditable spellcheck="false" :key="modelValue")
  template(v-for="item in items")
    ProjectTag(v-if="projectMatcher(item)" :tag="item" @input="update")
    ContextTag(v-else-if="contextMatcher(item)" :tag="item" @input="update")
    span(v-else) {{ item }}
</template>
