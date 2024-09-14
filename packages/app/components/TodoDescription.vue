<script setup>
import markdownit from 'markdown-it'

const md = markdownit({
  html: true,
  linkify: true,
})

var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // Set target="_blank" on links unless they start with mailto
  if (!/^mailto:/.test(tokens[idx].attrGet('href'))) tokens[idx].attrSet('target', '_blank')

  // Pass the token to the default renderer.
  return defaultRender(tokens, idx, options, env, self)
}

const props = defineProps([
  'description',
  'todo',
  'parent',
  'editable'
])

const decorated = computed(() => {
  // Basic regexes for potentially matching/stripping Markdown prior to description splitting.
  // const code = /(``.*?``|`.*?`)/g
  // const bold = /([*_]{2}.*?[*_]{2})/g
  // const emphasis = /([*_].*?[*_])/g
  // const link = /(\[.*?\]\(.*?\))/g
  // const linkAlt = /(<?(?:https?|mailto):\S+>?)/g

  return md.renderInline(
    props.description
      .replace(/(?<=^|\s)(\@\S+)/, '<span class="context-span">$1</span>')
      .replace(/(?<=^|\s)(\+\S+)/, '<span class="project-span">$1</span>')
      .replace(/(?<=^|\s)(\#\S+)/, '<span class="hashtag-span">$1</span>')
      .replace(/(?<=^|\s)(every:[^ :]+)/, '<span class="every-span text-nowrap">$1</span>')
      .replace(/(?<=^|\s)(\w+(?<!https?|mailto|count|time):[^ :]+)/, '<span class="tag-span text-nowrap">$1</span>')
  ).split(/(?<=^|\s)((?:count|time):[^ :]+)/g).filter(n => n)

})

const innerDesc = ref(null)

defineExpose({
  innerDesc,
})

defineEmits(['blur'])
</script>

<template lang="pug">
span.px-2.py-1(
  :contenteditable="editable"
  spellcheck="false"
  ref="innerDesc"
  @blur="$emit('blur', $event)"
)
  template(v-for="item in decorated")
    TodoCount.count-span.text-nowrap(v-if="/^count:[^ :]+$/.test(item)" :todo="todo" :parent="parent")
    TodoTime.time-span.text-nowrap(v-else-if="/^time:[^ :]+$/.test(item)" :todo="todo" :parent="parent")
    span(v-else v-html="item")
</template>
