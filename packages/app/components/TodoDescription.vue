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
  'description'
])

const decorated = computed(() => {
  return md.renderInline(
    props.description
      .replace(/(?<=^|\s)(\@\S+)/, '<span class="context-span">$1</span>')
      .replace(/(?<=^|\s)(\+\S+)/, '<span class="project-span">$1</span>')
      .replace(/(?<=^|\s)(\#\S+)/, '<span class="hashtag-span">$1</span>')
      .replace(/(?<=^|\s)(\w+(?<!https?|mailto):[^\s:]+)/, '<span class="tag-span">$1</span>')
  )
})
</script>

<template lang="pug">
span.prose.prose-lg(v-html="decorated")
</template>
