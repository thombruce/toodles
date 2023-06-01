import { nanoid } from 'nanoid'
import { Collection } from 'lokijs'

interface BaseInterface {
  id?: string
  meta?: any
  $loki?: number
  [key: string]: any
}

class Base implements BaseInterface {
  collection: Collection

  id: string
  meta?: any
  $loki?: number
  [key: string]: any

  // Constructor
  constructor(base: BaseInterface, collection: Collection) {
    if (new.target === Base) {
      throw Error('Not allowed to instantiate Base')
    }

    this.collection = collection

    this.id = (base.id || nanoid())
    this.meta = base.meta
    this.$loki = base.$loki
  }

  // Class methods
  static all(collection: Collection) {
    return collection.data.map((t: BaseInterface) => new this(t, collection))
  }

  static where(query: object, collection: Collection) {
    return collection.find(query).map((t: BaseInterface) => new this(t, collection))
  }

  static find(id: string, collection: Collection) {
    const entity = collection.find({ id })[0]
    if (entity) return new this(entity, collection)
  }

  static destroyWhere(query: object, collection: Collection) {
    collection.findAndRemove(query)
  }

  // Instance methods: Getters
  get klass() {
    return this.constructor.name
  }

  get createdAt() {
    return this.meta?.created
  }

  get updatedAt() {
    return this.meta?.updated
  }

  // Instance methods: Actions
  save() {
    // TODO: Handle save of existing Base
    this.collection.insert({ ...this, ...{ collection: undefined } })
  }

  update(properties: {}) {
    Object.assign(this, properties)
    this.collection.update({ ...this, ...{ ...properties, collection: undefined } })
  }

  destroy() {
    this.collection.chain().find({ id: this.id }).remove()
  }
}

export { Base, type BaseInterface }
