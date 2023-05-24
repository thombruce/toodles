import { describe, it, expect } from 'vitest'
import { Base } from '../Base'
import type { Collection } from 'lokijs'

describe('Base', () => {
    it('cannot be instantiated directly', () => {
      expect(() => new Base({}, {} as Collection)).toThrowError(
        /^Not allowed to instantiate/
      )
    })
})
