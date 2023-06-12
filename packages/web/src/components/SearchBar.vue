<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const query = ref("")

const store = useTodosStore()

function search(q: string) {
  if (q.length === 0) {
    return
  }

  // router.push({ query: { q } })

  store.searchTodos(q)

  // query.value = ""
}
</script>

<template lang="pug">
form.flex.w-full.space-x-4.mb-4(@submit.prevent="search(query)")
  input.grow(v-model="query" type="search" class="border rounded py-2 px-3 text-gray-700" @input="search(query)")
  button(class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded") Search
</template>
