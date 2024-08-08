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
      .replace(/(?<=^|\s)(every:[^\s:]+)/, '<span class="every-span">$1</span>')
      .replace(/(?<=^|\s)(\w+(?<!https?|mailto|count|time):[^\s:]+)/, '<span class="tag-span">$1</span>')
  ).split(/(?<=^|\s)((?:count|time):[^\s:]+)/g).filter(n => n)

})
</script>

<template lang="pug">
span
  template(v-for="item in decorated")
    TodoCount.count-span(v-if="/^count:[^\s:]+$/.test(item)" v-model="item.match(/count:([^\s:]+)/)[1]")
    TodoTime.time-span(v-else-if="/^time:[^\s:]+$/.test(item)" v-model="item.match(/time:([^\s:]+)/)[1]")
    span(v-else v-html="item")
</template>
