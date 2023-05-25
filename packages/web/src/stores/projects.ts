import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'

import { Project } from '../models/Project'
import { ProjectCollection } from '@/models/ProjectCollection'
import { ProjectableCollection } from '@/models/ProjectableCollection'

export const useProjectsStore = defineStore('projects', () => {
  // State
  const list = ref(new ProjectCollection() as Collection)
  const projectables = ref(new ProjectableCollection() as Collection)

  // Getters
  const find = computed(() => (shortName: string) => {
    return Project.find(shortName, list.value)
  })

  // Actions
  // TODO:
  // function addProject(shortName: string) {
  //   new Project({ shortName }, list.value).save()
  // }

  // TODO:
  // function updateProject(shortName: string, name: string) {
  //   Project.find(shortName, list.value)?.update({ name })
  // }

  // TODO:
  // function deleteProject(shortName: string) {
  //   Project.find(shortName, list.value)?.destroy()
  // }

  // Export
  return { list, projectables, find }
})
