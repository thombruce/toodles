<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const text = ref("")

const store = useTodosStore()

function search() {
  store.searchTodos(text.value)
}

function globalSearch() {
  router.push('/')
  store.searchTodos(text.value)
}

function addTodoAndClear() {
  // TODO:
  // if (text.value.length === 0) {
  //   return
  // }

  store.addTodo(text.value)
  text.value = ""
  search()
}

function clear() {
  text.value = ""
  search()
}
</script>

<template lang="pug">
form.flex.w-full.space-x-4(@submit.prevent="addTodoAndClear()")
  input.grow(
    v-model="text"
    type="text"
    @input="search()"
    @keydown.ctrl.enter="globalSearch()"
    @keydown.esc="clear();$event.target.blur()"
    aria-labelledby="addTodo"
    :placeholder="$t('hints.multi')"
  )
  button#addTodo {{ $t("actions.add") }}
</template>
