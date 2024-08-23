<script setup>
import { useRouter } from 'vue-router'

const { lastOpened } = await useTntApi().loadConfig()

// Replace index route with lastOpened path or,
// if no lastOpened exists in config,
// replace index route with '/todo.txt' default.
const router = useRouter()
if (lastOpened) router.replace(lastOpened)
else router.replace('/todo.txt')
</script>

<template>
</template>
