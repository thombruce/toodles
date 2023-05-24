import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'

import { List } from '../models/List'
import { ListCollection } from '@/models/ListCollection'

export const useListsStore = defineStore('lists', () => {
  // State
  const list = ref(new ListCollection() as Collection)

  // Getters
  const find = computed(() => (id: UUID) => {
    return List.find(id, list.value)
  })

  // Actions
  function addList(name: string) {
    new List({ name }, list.value).save()
  }

  function updateList(id: UUID, name: string) {
    List.find(id, list.value).update({ name })
  }

  function deleteList(id: UUID) {
    List.find(id, list.value).destroy()
  }

  // Export
  return { list, find, addList, updateList, deleteList }
})
