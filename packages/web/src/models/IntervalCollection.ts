import db from '../plugins/loki'

class IntervalCollection {
  // Constructor
  constructor() {
    var collection = db.getCollection('intervals')

    if(!collection){
      collection = db.addCollection('intervals', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    return collection
  }
}

export { IntervalCollection }
