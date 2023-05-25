import { Collection } from 'lokijs'

import { Interval } from './Interval'
import { Tally } from './Tally'
import { Comment } from './Comment'

// TODO: Prefer not to do this; what alternatives exist?
import { useIntervalsStore } from '@/stores/intervals'
import { useTalliesStore } from '@/stores/tallies'
import { useCommentsStore } from '@/stores/comments'
import { Base, type BaseInterface } from './Base'
import { Projectable } from './Projectable'
import { useProjectsStore } from '@/stores/projects'
import { Project } from './Project'

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

  get intervals() {
    return Interval.where({ todoId: this.id }, useIntervalsStore().list)
  }

  get tallies() {
    return Tally.where({ todoId: this.id }, useTalliesStore().list)
  }

  get comments() {
    return Comment.where({ todoId: this.id }, useCommentsStore().list)
  }

  get activeInterval() {
    return Interval.where({ $and: [{ todoId: this.id }, { duration: { $exists: false } }] }, useIntervalsStore().list)[0] as Interval
  }

  // Instance methods: Actions
  save() {
    this.parseProjects()
    super.save()
  }

  update(text: string) {
    super.update({ text })
    this.parseProjects()
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
    Tally.destroyWhere({ todoId: this.id }, useTalliesStore().list)
    Comment.destroyWhere({ todoId: this.id }, useCommentsStore().list)
    super.destroy()
  }

  parseProjects() {
    const shortNames = this.text.match(/(?<=(?:^|\s)\+)\S+/g)
    shortNames?.forEach(shortName => {
      const project = Project.findOrCreate(shortName, useProjectsStore().list)
      new Projectable({ todoId: this.id, projectId: project.shortName }, useProjectsStore().projectables).save()
    })
  }
}

export { Todo }
