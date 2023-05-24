import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { UUID } from 'crypto'
import { Collection } from 'lokijs'

import { Project } from '../models/Project'
import { ProjectCollection } from '@/models/ProjectCollection'

export const useProjectsStore = defineStore('projects', () => {
  // State
  const list = ref(new ProjectCollection() as Collection)

  // Getters
  const find = computed(() => (id: UUID) => {
    return Project.find(id, list.value)
  })

  // Actions
  function addProject(name: string) {
    new Project({ name }, list.value).save()
  }

  function updateProject(id: UUID, name: string) {
    Project.find(id, list.value).update({ name })
  }

  function deleteProject(id: UUID) {
    Project.find(id, list.value).destroy()
  }

  // Export
  return { list, find, addProject, updateProject, deleteProject }
})
