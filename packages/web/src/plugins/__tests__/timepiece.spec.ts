import { describe, it, expect } from 'vitest'
import { timepiece } from '../timepiece'

describe('Timepiece Formatter', () => {
  it('formats time', () => {
    expect(timepiece(1000)).toBe("0:01")
    expect(timepiece(60000)).toBe("1:00")
  })
})
