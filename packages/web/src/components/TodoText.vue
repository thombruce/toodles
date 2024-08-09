<script setup lang="ts">
import { computed } from "vue"

import TodoPriority from "./TodoPriority.vue"
import ProjectTag from "./ProjectTag.vue"
import ContextTag from "./ContextTag.vue"
import HashTag from "./HashTag.vue"
import TagTag from "./TagTag.vue"

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function update(e: Event) {
  const input = e.target as HTMLElement
  emit('update:modelValue', input.innerText.trim())
}

const items = computed(() => {
  let priority, description
  const split = props.modelValue.split(/(^\([A-Z]\))(?=\s)/)

  if (split.length > 1) {
    priority = split[1]
    description = split[2]
  } else {
    description = split[0]
  }

  return [priority, ...description.split(/(^|\s)((?:\+|@|#|[^ :]+?:)\S+)/g).filter(n => n)]
})

const priorityMatcher = (item: string) => /^\([A-Z]\)$/.test(item)
const projectMatcher = (item: string) => /^\+\S+$/.test(item)
const contextMatcher = (item: string) => /^@\S+$/.test(item)
const hashMatcher = (item: string) => /^#\S+$/.test(item)
const tagMatcher = (item: string) => /^[^ :]+?:[^ :]+$/.test(item)
</script>

<template lang="pug">
p(contenteditable spellcheck="false" :key="modelValue")
  template(v-for="item in items")
    TodoPriority(v-if="priorityMatcher(item)" :priority="item" @input="update")
    ProjectTag(v-else-if="projectMatcher(item)" :tag="item" @input="update")
    ContextTag(v-else-if="contextMatcher(item)" :tag="item" @input="update")
    HashTag(v-else-if="hashMatcher(item)" :tag="item" @input="update")
    TagTag(v-else-if="tagMatcher(item)" :tag="item" @input="update")
    span(v-else) {{ item }}
</template>
