import db from '../plugins/loki'

class TodoCollection {
  // Constructor
  constructor() {
    var collection = db.getCollection('todos')

    if(!collection){
      collection = db.addCollection('todos', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    return collection
  }
}

export { TodoCollection }
