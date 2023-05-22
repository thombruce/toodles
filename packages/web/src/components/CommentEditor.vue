<script setup lang="ts">
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value: string) {
  emit('update:modelValue', value)
}

const toolbars = {
  bold: true,
  italic: true,
  header: true,
  underline: false,
  strikethrough: false,
  mark: false,
  superscript: false,
  subscript: false,
  quote: true,
  ol: true,
  ul: true,
  link: true,
  imagelink: false,
  code: true,
  table: false,
  fullscreen: false,
  readmodel: false,
  htmlcode: false,
  help: false,
  /* 1.3.5 */
  undo: true,
  redo: true,
  trash: true,
  save: false,
  /* 1.4.2 */
  navigation: false,
  /* 2.1.8 */
  alignleft: false,
  aligncenter: false,
  alignright: false,
  /* 2.2.1 */
  subfield: true,
  preview: true
}
</script>

<template lang="pug">
mavon-editor(
  v-model="props.modelValue"
  language="en"
  :subfield="false"
  placeholder="Add a comment..."
  :html="true"
  :toolbars="toolbars"
  class="border rounded py-2 px-3 text-gray-700"
  v-on:input="updateValue($event.target.value)"
)
</template>
