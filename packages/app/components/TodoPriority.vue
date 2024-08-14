<script setup>
const props = defineProps(['priority'])

const klass = computed(() => {
  switch(props.priority) {
    case "A":
      return "high"
    case "B":
      return "medium"
    case "C":
      return "low"
    default:
      return ""
  }
})
</script>

<template lang="pug">
span.mr-1.font-black(:class="klass") ({{ priority }})
</template>

<style lang="postcss" scoped>
span {
  @apply
    text-neutral-light
    dark:text-neutral-dark;
}

span.low {
  @apply
    text-yellow-500
    dark:text-yellow-600;
}

span.medium {
  @apply
    text-orange-500
    dark:text-orange-600;
}

span.high {
  @apply
    text-red-500
    dark:text-red-600;
}
</style>
