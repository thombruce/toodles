<script setup>
import dayjs from 'dayjs'

const props = defineProps(['todo'])

const klass = computed(() => {
  const today = dayjs()
  const dueDate = dayjs(props.todo.due)
  if (props.todo.status === 'done') {
    return ""
  }
  if (dueDate.isBefore(today, 'day')) {
    return "overdue"
  } else if (dueDate.isBefore(today.add(1, 'week'), 'day')) {
    return "soon"
  } else {
    return ""
  }
})
</script>

<template lang="pug">
span(:class="klass") {{ todo.due }}
</template>

<style lang="postcss" scoped>
span {
  @apply
    text-lime-400
    dark:text-lime-600;
}

span.soon {
  @apply
    text-amber-500
    dark:text-amber-600;
}

span.overdue {
  @apply
    text-rose-500
    dark:text-rose-600;
}
</style>
