import { Collection } from 'lokijs'

import { Interval } from './Interval'

// TODO: Prefer not to do this; what alternatives exist?
import { useIntervalsStore } from '@/stores/intervals'
import { useTalliesStore } from '@/stores/tallies'
import { Base, type BaseInterface } from './Base'
import { Projectable } from './Projectable'
import { useProjectsStore } from '@/stores/projects'
import { Project } from './Project'
import { Context } from './Context'
import { useContextsStore } from '@/stores/contexts'
import { Contextable } from './Contextable'
import { useTagsStore } from '@/stores/tags'
import { Taggable } from './Taggable'
import { Tag } from './Tag'

interface TodoInterface extends BaseInterface {
  text: string
  done?: EpochTimeStamp | null
}

class Todo extends Base implements TodoInterface {
  text: string
  done: EpochTimeStamp | null

  // Constructor
  constructor(todo: string | TodoInterface, collection: Collection) {
    if (typeof todo === 'string') {
      super({}, collection)

      this.text = todo
      this.done = null
    } else {
      super(todo, collection)

      this.text = todo.text
      this.done = todo.done || null
    }
  }

  // Class methods

  // Instance methods: Getters
  get projects() {
    // TODO: We should probably be using eqJoin for this.
    return Projectable.where({ todoId: this.id }, useProjectsStore().projectables).map((p) => {
      // TODO: Since where will yield an array, and find should accept an array of IDs...
      //       Try to make this more efficient by performing a single query.
      return Project.find(p.projectId, useProjectsStore().list)
    })
  }

  // TODO: Add contexts

  get tags() {
    // TODO: We should probably be using eqJoin for this.
    return Taggable.where({ todoId: this.id }, useTagsStore().taggables).map((p) => {
      // TODO: Since where will yield an array, and find should accept an array of IDs...
      //       Try to make this more efficient by performing a single query.
      return Tag.find(p.tagId, useTagsStore().list)
    })
  }

  get intervals() {
    return Interval.where({ todoId: this.id }, useIntervalsStore().list)
  }

  get activeInterval() {
    return Interval.where({ $and: [{ todoId: this.id }, { duration: { $exists: false } }] }, useIntervalsStore().list)[0] as Interval
  }

  // Instance methods: Actions
  save() {
    this.parseTags()
    this.parseProjects()
    this.parseContexts()
    super.save()
  }

  update(text: string) {
    super.update({ text })
    this.parseTags()
    this.parseProjects()
    this.parseContexts()
  }

  toggle() {
    var currentTime = Date.now()
    var todo = Todo.find(this.id, this.collection) as Todo
    if (todo.done) {
      this.collection.update({ ...todo, ...{ done: null, collection: undefined } })
    } else {
      this.activeInterval?.stop()
      this.collection.update({ ...todo, ...{ done: currentTime, collection: undefined } })
    }
  }

  destroy() {
    Interval.destroyWhere({ todoId: this.id }, useIntervalsStore().list)
    super.destroy()
  }

  parseTags() {
    const tagStrings = this.text.match(/(?<=^|\s)[^\s:]+?:[^\s:]+(?=$|\s)/g)
    tagStrings?.forEach(tagString => {
      const [key, value] = tagString.split(':')
      const tag = Tag.findOrCreateBy({ key, value }, useTagsStore().list)
      Taggable.findOrCreateBy({ todoId: this.id, tagId: tag.id }, useTagsStore().taggables)
    })
  }

  parseProjects() {
    const shortNames = this.text.match(/(?<=(?:^|\s)\+)\S+/g)
    shortNames?.forEach(shortName => {
      const project = Project.findOrCreateBy({ shortName }, useProjectsStore().list)
      Projectable.findOrCreateBy({ todoId: this.id, projectId: project.id }, useProjectsStore().projectables)
    })
  }

  parseContexts() {
    const shortNames = this.text.match(/(?<=(?:^|\s)@)\S+/g)
    shortNames?.forEach(shortName => {
      const context = Context.findOrCreateBy({ shortName }, useContextsStore().list)
      Contextable.findOrCreateBy({ todoId: this.id, contextId: context.id }, useContextsStore().contextables)
    })
  }
}

export { Todo }
