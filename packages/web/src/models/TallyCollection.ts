import db from '../plugins/loki'

class TallyCollection {
  // Constructor
  constructor() {
    var collection = db.getCollection('tallies')

    if(!collection){
      collection = db.addCollection('tallies', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    return collection
  }
}

export { TallyCollection }
