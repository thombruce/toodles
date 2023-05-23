import db from '../plugins/loki'

class CommentCollection {
  // Constructor
  constructor() {
    var collection = db.getCollection('comments')

    if(!collection){
      collection = db.addCollection('comments', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    return collection
  }
}

export { CommentCollection }
