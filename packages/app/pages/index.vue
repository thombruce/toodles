<script setup>
import { useTodosStore } from '@/stores/todos'
import { storeToRefs } from 'pinia'

// Store
const store = useTodosStore()
// Store: State/Getters
const { all: todos } = storeToRefs(store)
// Store: Actions
const { fetchTodos, addTodo } = store

// Init
fetchTodos()

const text = ref("")

const progress = computed(() => {
  const count = todos.value.length
  const done = todos.value.filter(t => ["done", "obsolete"].includes(t.status)).length
  return done / count * 100
})

function addTodoAndClear() {
  if (text.value.length === 0) {
    return
  }

  addTodo(text.value)
  clear()
}

function clear() {
  text.value = ""
  // search()
}
</script>

<template lang="pug">
div
  //- TntForm not working here - investigate
  form.flex.w-full.space-x-4.mb-3(@submit.prevent="addTodoAndClear()")
    //- TntInput does not clear when text model is cleared ???
    input.grow(
      v-model="text"
      type="text"
      @keydown.esc="clear();$event.target.blur()"
    )
    //- TntSubmit depends on TntForm because of isDirty check (which should probably be optional?)
    button(type="submit") Add

  ProgressBar.mb-3(:value="progress")

  ul
    li(v-for="item in todos")
      TodoItem(:todo="item")
</template>
