import { describe, it, expect } from 'vitest'
import { BaseCollection } from '../BaseCollection'

describe('BaseCollection', () => {
  it('cannot be instantiated directly', () => {
    expect(() => new BaseCollection('baseCollections', {})).toThrowError(
      /^Not allowed to instantiate/
    )
  })
})
