<script setup>
const props = defineProps([
  'modelValue'
])

const time = ref(props.modelValue)

const increment = () => time.value++
</script>

<template lang="pug">
span
  | time:{{ time }}
  |
  TntButton.btn-none.align-text-top(@click="increment()")
    Icon(name="fa:play")
</template>
