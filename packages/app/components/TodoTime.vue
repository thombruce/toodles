<script setup>
import { useTodosStore } from '@/stores/todos'

import dayjs from 'dayjs'
import { default as dayjsDuration } from 'dayjs/plugin/duration'
dayjs.extend(dayjsDuration)

const props = defineProps([
  'value',
  'todo',
  'parent',
])

const time = ref(props.value)

const startedAt = ref(null)

const duration = computed(() => {
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
  return duration.value.format('H[h]m[m]')
})

let tick

const lastTick = ref(null)
const activeDuration = ref(dayjs.duration(0))

const startTimer = () => {
  startedAt.value = dayjs(new Date())
  activeDuration.value = duration.value
  lastTick.value = startedAt.value

  tick = setInterval(() => {
    const current = dayjs(new Date())
    const durSinceLastTick = dayjs.duration(current.diff(lastTick.value))
    activeDuration.value = activeDuration.value.add(durSinceLastTick)
    time.value = activeDuration.value.format('H[h]m[m]')
    lastTick.value = current
  }, 1000)
}

const stopTimer = () => {
  clearInterval(tick)
  startedAt.value = null
  activeDuration.value = dayjs.duration(0)
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
  TntButton.btn-none.align-text-top(v-if="startedAt" @click="stopTimer()")
    Icon(name="fa:pause")
</template>

<style lang="postcss">
span.is-active {
  @apply
    animate-pulse;
}
</style>
