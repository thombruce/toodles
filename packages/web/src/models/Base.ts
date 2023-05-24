import type { UUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { Collection } from 'lokijs'

interface BaseInterface {
  id?: UUID
  meta?: any
  $loki?: number
  [key: string]: any
}

class Base implements BaseInterface {
  collection: Collection

  id: UUID
  meta?: any
  $loki?: number

  // Constructor
  constructor(base: BaseInterface, collection: Collection) {
    this.collection = collection

    this.id = (base.id || uuidv4()) as UUID
    this.meta = base.meta
    this.$loki = base.$loki
  }

  // Class methods
  static all(collection: Collection) {
    collection.data.map((t: BaseInterface) => new this(t, collection))
  }

  static where() {}

  static find(id: UUID, collection: Collection) {
    return new this(collection.find({ id })[0], collection)
  }

  // Instance methods: Getters
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
    this.collection.update({ ...this, ...{ ...properties, collection: undefined } })
  }

  destroy() {
    // Interval.destroyWhere({ baseId: this.id }, useIntervalsStore().list)
    // Tally.destroyWhere({ baseId: this.id }, useTalliesStore().list)
    // Comment.destroyWhere({ baseId: this.id }, useCommentsStore().list)
    this.collection.chain().find({ id: this.id }).remove()
  }
}

export { Base, type BaseInterface }
