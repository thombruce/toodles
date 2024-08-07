<script setup>
import { useTodosStore } from '@/stores/todos'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  parent: String,
})

// Store
const store = useTodosStore()
// Store: Actions
const { toggleTodo, toggleTodoFocus, deleteTodo } = store
</script>

<template lang="pug">
div.text-lg
  .flex.space-x-2(:class="todo.status === 'focus' ? 'font-bold' : todo.status === 'done' ? 'toodles-done' : todo.status === 'obsolete' ? 'toodles-obsolete' : ''")
    TntButton.btn-none(@click="toggleTodo(todo.id, parent)")
      Icon(v-if="todo.status === 'done'" name="fa:check-square")
      Icon(v-else-if="todo.status === 'obsolete'" name="fa:minus-square")
      Icon(v-else name="fa:square")
    TntButton.btn-none(@click="toggleTodoFocus(todo.id, parent)")
      Icon(name="fa:exclamation" :class="todo.status === 'focus' ? '' : 'opacity-30'")
    span.toodles-description.grow
      span.mr-1(v-if="todo.priority" class="font-black text-violet-800 dark:text-violet-300") ({{ todo.priority }})
      span.mr-1(v-if="todo.completed" class="text-lime-800 dark:text-lime-300") {{ todo.completed }}
      span.mr-1(v-if="todo.created" class="text-cyan-800 dark:text-cyan-300") {{ todo.created }}
      span.mr-1(v-if="todo.due" class="text-yellow-800 dark:text-yellow-300") {{ todo.due }}
      span.mr-1(v-if="todo.price" class="text-green-800 dark:text-green-300") {{ todo.price }}
      span.prose.prose-lg(v-html="todo.decorated")
      span.ml-1(v-if="todo.multiplier" class="text-pink-800 dark:text-pink-300") x{{ todo.multiplier }}
    TntButton.btn-none(@click="deleteTodo(todo.id, parent)" class="text-danger-light hover:text-danger-light-hover dark:text-danger-dark dark:hover:text-danger-dark-hover")
      Icon(name="fa:trash")
  ul.pl-12(v-if="todo.children")
    li(v-for="child in todo.children")
      TodoItem(:todo="child" :parent="todo.id")
</template>

<style lang="postcss">
.toodles-done > span.toodles-description {
  @apply
    relative
    opacity-70
    /*
      The below styles all contribute to a strikethrough effect
      which will span multiple lines and does not appear to be
      broken or interrupted by discrepancies in font size.
    */
    underline
    decoration-2
    underline-offset-[-0.4rem];
  text-decoration-skip-ink: none;
}

.toodles-obsolete > span.toodles-description {
  @apply
    relative
    opacity-60;
}

.context-span {
  @apply
    text-purple-600
    dark:text-purple-500;
}

.project-span {
  @apply
    text-teal-700
    dark:text-teal-500;
}

.hashtag-span {
  @apply
    text-indigo-600
    dark:text-indigo-400;
}

.tag-span {
  @apply
    rounded
    text-amber-700
    bg-amber-50
    dark:text-amber-500
    dark:bg-amber-950;
}
</style>