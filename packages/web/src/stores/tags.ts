import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'

import { Tag } from '../models/Tag'
import { TagCollection } from '@/models/TagCollection'
import { TaggableCollection } from '@/models/TaggableCollection'

export const useTagsStore = defineStore('tags', () => {
  // State
  const list = ref(new TagCollection() as Collection)
  const taggables = ref(new TaggableCollection() as Collection)

  // Getters
  const find = computed(() => (shortName: string) => {
    return Tag.find(shortName, list.value)
  })

  // Actions
  // TODO:
  // function addTag(shortName: string) {
  //   new Tag({ shortName }, list.value).save()
  // }

  // TODO:
  // function updateTag(shortName: string, name: string) {
  //   Tag.find(shortName, list.value)?.update({ name })
  // }

  // TODO:
  // function deleteTag(shortName: string) {
  //   Tag.find(shortName, list.value)?.destroy()
  // }

  // Export
  return { list, taggables, find }
})
