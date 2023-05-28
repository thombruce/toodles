import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'

import { Context } from '../models/Context'
import { ContextCollection } from '@/models/ContextCollection'
import { ContextableCollection } from '@/models/ContextableCollection'

export const useContextsStore = defineStore('contexts', () => {
  // State
  const list = ref(new ContextCollection() as Collection)
  const contextables = ref(new ContextableCollection() as Collection)

  // Getters
  const find = computed(() => (shortName: string) => {
    return Context.find(shortName, list.value)
  })

  // Actions
  // TODO:
  // function addContext(shortName: string) {
  //   new Context({ shortName }, list.value).save()
  // }

  // TODO:
  // function updateContext(shortName: string, name: string) {
  //   Context.find(shortName, list.value)?.update({ name })
  // }

  // TODO:
  // function deleteContext(shortName: string) {
  //   Context.find(shortName, list.value)?.destroy()
  // }

  // Export
  return { list, contextables, find }
})
