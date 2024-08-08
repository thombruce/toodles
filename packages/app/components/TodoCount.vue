<script setup>
const props = defineProps([
  'modelValue'
])

const count = ref(props.modelValue)

const increment = () => count.value++
</script>

<template lang="pug">
span
  | count:{{ count }}
  |
  TntButton.btn-none.align-text-top(@click="increment()")
    Icon(name="fa:plus")
</template>
