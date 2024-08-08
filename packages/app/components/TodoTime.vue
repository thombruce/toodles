<script setup>
import { useTodosStore } from '@/stores/todos'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const props = defineProps([
  'value',
  'todo',
  'parent',
])

const time = ref(props.value)

const startedAt = ref(null)

const dur = computed(() => {
  let milliseconds = 0
  const hours = time.value.match(/(\d+)h/)
  const minutes = time.value.match(/(\d+)m/)
  const seconds = time.value.match(/(\d+)s/)
  if (hours) milliseconds += parseInt(hours[1]) * 3_600_000
  if (minutes) milliseconds += parseInt(minutes[1]) * 60_000
  if (seconds) milliseconds += parseInt(seconds[1]) * 1_000
  return dayjs.duration(milliseconds)
})

const toString = computed(() => {
  return dur.value.format('H[h]m[m]s[s]')
})

const startTimer = () => {
  startedAt.value = dayjs(new Date())
}

const stopTimer = () => {
  const endedAt = dayjs(new Date)
  const durSinceStart = dayjs.duration(endedAt.diff(startedAt.value))
  time.value = dur.value.add(durSinceStart).format('H[h]m[m]s[s]')
  startedAt.value = null
  updateTodoDescription(
    props.todo.id,
    `${props.todo.description}`.replace(/time:[^\s:]+/, `time:${toString.value}`),
    props.parent
  )
}

// Store
const store = useTodosStore()
// Store: Actions
const { updateTodoDescription } = store
</script>

<template lang="pug">
span(:class="startedAt ? 'is-active' : ''")
  | time:{{ time }}
  |
  TntButton.btn-none.align-text-top(v-if="!startedAt" @click="startTimer()")
    Icon(name="fa:play")
  TntButton.btn-none.align-text-top.animate-pulse(v-if="startedAt" @click="stopTimer()")
    Icon(name="fa:pause")
</template>

<style lang="postcss">
span.is-active {
  @apply
    text-orange-700
    bg-orange-50
    dark:text-orange-500
    dark:bg-orange-950;
}
</style>