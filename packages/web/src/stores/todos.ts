import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Collection } from 'lokijs'

import { Todo } from '../models/Todo'
import { TodoCollection } from '@/models/TodoCollection'

const sortFunction = (obj1:any,obj2:any) => {
  if (obj1.done == obj2.done) {
    if (obj1.priority > obj2.priority) return 1
    if ((obj1.priority < obj2.priority) || (obj1.priority && !obj2.priority)) return -1
    return 0
    // TODO: After sorting by priority, also sort by created
    //       This is presently happening by default
  }

  if ((obj1.done > obj2.done) || (!obj1.done && obj2.done)) return -1
  if ((obj1.done < obj2.done) || (obj1.done && !obj2.done)) return 1
  return 0
}

export const useTodosStore = defineStore('todos', () => {
  // State
  const list = ref(new TodoCollection() as Collection)

  // Getters
  const all = computed(() => () => {
    return list.value.chain()
      .sort((obj1,obj2) => sortFunction(obj1,obj2))
      .data()
      .map((t) => new Todo(t, list.value))
  })

  const find = computed(() => (id: string) => {
    return Todo.find(id, list.value)
  })

  const forProject = computed(() => (project: string) => {
    return list.value.chain()
      .find({'description': { '$regex' : new RegExp(`\\${project}`) }})
      .sort((obj1,obj2) => sortFunction(obj1,obj2))
      .data()
      .map((t) => new Todo(t, list.value))
  })

  const forContext = computed(() => (context: string) => {
    return list.value.chain()
      .find({'description': { '$regex' : new RegExp(`${context}`) }})
      .sort((obj1,obj2) => sortFunction(obj1,obj2))
      .data()
      .map((t) => new Todo(t, list.value))
  })

  const forPriority = computed(() => (priority: string) => {
    return list.value.chain()
      .find({ 'priority': priority.replace(/[()]/g, '') })
      .sort((obj1,obj2) => sortFunction(obj1,obj2))
      .data()
      .map((t) => new Todo(t, list.value))
  })

  // Actions
  function addTodo(editable: string) {
    new Todo(editable, list.value).save()
  }

  function updateTodo(id: string, editable: string) {
    Todo.find(id, list.value)?.update(editable)
  }

  function toggleTodo(id: string) {
    Todo.find(id, list.value)?.toggle()
  }

  function deleteTodo(id: string) {
    Todo.find(id, list.value)?.destroy()
  }

  // Export
  return { list, all, find, forProject, forContext, forPriority, addTodo, updateTodo, toggleTodo, deleteTodo }
})
