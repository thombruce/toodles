<script setup>
import { useTodosStore } from '@/stores/todos'
import { storeToRefs } from 'pinia'

// Store
const store = useTodosStore()
// Store: State/Getters
const { all: todos, progress } = storeToRefs(store)
// Store: Actions
const { fetchTodos, addTodo } = store

// Init
fetchTodos()

const newTodo = ref({ priority: undefined, description: "" })

function addTodoAndClear() {
  if (newTodo.value.description.length === 0) {
    return
  }

  addTodo(newTodo.value)
  clear()
}

function clear() {
  newTodo.value = { priority: undefined, description: "" }
  // search()
}
</script>

<template lang="pug">
div
  //- TntForm not working here - investigate
  form.flex.w-full.space-x-4.mb-3(@submit.prevent="addTodoAndClear()")
    //- TntSelect doesn't reset when model does...
    //- Will try to figure this out when we move this into own component.
    TntSelect.flex-1.min-w-16(
      v-model="newTodo.priority"
      :options="['', 'A', 'B', 'C']"
    )
    //- TntInput does not clear when text model is cleared ???
    input.flex-0(
      v-model="newTodo.description"
      type="text"
      @keydown.esc="clear();$event.target.blur()"
    )
    //- TntSubmit depends on TntForm because of isDirty check (which should probably be optional?)
    button(type="submit") Add

  ProgressBar.mb-3(:value="progress")

  ul.space-y-2
    li(v-for="item in todos")
      TodoItem(:todo="item" :key="`todo-${item.id}`")
</template>
