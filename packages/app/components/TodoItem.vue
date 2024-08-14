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
const { toggleTodoDone, toggleTodoFocus, deleteTodo } = store
</script>

<template lang="pug">
div.text-lg
  .flex.space-x-2(:class="todo.status === 'focus' ? 'font-bold' : todo.status === 'done' ? 'toodles-done' : todo.status === 'obsolete' ? 'toodles-obsolete' : ''")
    TntButton.btn-none(@click="toggleTodoDone(todo.id, parent)")
      Icon(v-if="todo.status === 'done'" name="fa6-solid:square-check")
      Icon(v-else-if="todo.status === 'obsolete'" name="fa6-solid:square-minus")
      Icon(v-else name="fa6-solid:square")
    TntButton.btn-none(@click="toggleTodoFocus(todo.id, parent)")
      Icon(name="fa6-solid:exclamation" :class="todo.status === 'focus' ? '' : 'opacity-30'")
    span.toodles-description.grow
      TodoPriority(v-if="todo.priority" :priority="todo.priority")
      | {{ " " }}
      span(v-if="todo.completed" class="text-lime-800 dark:text-lime-300") {{ todo.completed }}
      | {{ " " }}
      span(v-if="todo.created" class="text-cyan-800 dark:text-cyan-300") {{ todo.created }}
      | {{ " " }}
      TodoDue(v-if="todo.due" :todo="todo")
      span(v-if="todo.price" class="text-green-800 dark:text-green-300") {{ todo.price }}
      | {{ " " }}
      TodoDescription(:description="todo.description" :todo="todo" :parent="parent")
      | {{ " " }}
      span(v-if="todo.multiplier" class="text-pink-800 dark:text-pink-300") x{{ todo.multiplier }}
    TntButton.btn-none(@click="deleteTodo(todo.id, parent)" class="text-danger-light hover:text-danger-light-hover dark:text-danger-dark dark:hover:text-danger-dark-hover")
      Icon(name="fa6-solid:trash-can")
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

.count-span {
  @apply
    rounded
    text-yellow-700
    bg-yellow-50
    dark:text-yellow-500
    dark:bg-yellow-950;
}

.time-span {
  @apply
    rounded
    text-lime-700
    bg-lime-50
    dark:text-lime-500
    dark:bg-lime-950;
}

.every-span {
  @apply
    rounded
    text-purple-700
    bg-purple-50
    dark:text-purple-500
    dark:bg-purple-950;
}
</style>