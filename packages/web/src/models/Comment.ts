import { Collection } from 'lokijs'

import { Todo } from './Todo'
import { useTodosStore } from '@/stores/todos'
import { Base, type BaseInterface } from './Base'

interface CommentInterface extends BaseInterface {
  todoId: string,
  dateOf?: string,
  text: string,
}

class Comment extends Base implements CommentInterface {
  todoId: string
  dateOf: string
  text: string

  // Constructor
  constructor(comment: CommentInterface, collection: Collection) {
    super(comment, collection)

    this.todoId = comment.todoId
    this.dateOf = comment.dateOf || new Date().toISOString()
    this.text = comment.text
  }

  // Class methods

  // Instance methods: Getters
  get todo() {
    return Todo.find(this.todoId, useTodosStore().list)
  }

  // Instance methods: Actions
}

export { Comment }
