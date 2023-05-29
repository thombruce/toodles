<script setup lang="ts">
import { Context } from '@/models/Context'
import { useContextsStore } from '@/stores/contexts'
import EntityList from '@/components/EntityList.vue'

// TODO: This probably isn't reactive.
const contexts = Context.all(useContextsStore().list)
</script>

<template lang="pug">
main
  EntityList(:list="contexts")
</template>
