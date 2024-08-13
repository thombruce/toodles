<script setup>
import { useTodosStore } from '@/stores/todos'

// Store
const store = useTodosStore()
// Store: Actions
const { addTodo } = store

const showAdvanced = ref(false)

const newTodo = ref({
  priority: undefined,
  due: undefined,
  description: "",
  price: undefined,
  multiplier: undefined
})

function addTodoAndClear() {
  if (newTodo.value.description.length === 0) {
    return
  }

  addTodo(newTodo.value)
  clear()
}

function clear() {
  newTodo.value = {
    priority: undefined,
    due: undefined,
    description: "",
    price: undefined,
    multiplier: undefined
  }
  // search()
}
</script>

<template lang="pug">
TntForm.mb-3(@submit="addTodoAndClear()")
  .flex.w-full.space-x-4
    TntInput.flex-1(
      v-model="newTodo.description"
      @keydown.esc="clear();$event.target.blur()"
    )

    TntButton.btn-none.text-primary(@click="showAdvanced = !showAdvanced") Advanced

    TntSubmit Add

  .flex.w-full.space-x-4(v-show="showAdvanced")
    TntSelect.flex-1(
      v-model="newTodo.priority"
      label="Priority"
      :options="['', 'A', 'B', 'C']"
    )

    TntInput.flex-1(
      v-model="newTodo.due"
      label="Due"
      type="date"
    )

    //- TODO: Better money inputs! This should validate as a number,
    //-       but still result in a string with a supported currency
    //-       symbol.
    TntInput.flex-1(
      v-model="newTodo.price"
      label="Price"
    )

    TntInput.flex-1(
      v-model="newTodo.multiplier"
      label="Amount"
      type="number"
    )
</template>
