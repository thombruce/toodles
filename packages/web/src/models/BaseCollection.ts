import db from '../plugins/loki'

interface Options {
  unique?: string[]
  indices?: string[]
}

class BaseCollection {
  // Constructor
  constructor(name: string, options = { unique: ['id'], indices: ['id'] } as Options) {
    var collection = db.getCollection(name)

    if(!collection){
      collection = db.addCollection(name, { ...options, autoupdate: true })
    }

    return collection
  }
}

export { BaseCollection }
