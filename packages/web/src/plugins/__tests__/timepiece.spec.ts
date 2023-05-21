import { describe, it, expect } from 'vitest'
import { timepiece } from '../timepiece'

describe('Timepiece Formatter', () => {
  it('returns "0:00:00" if zero is given', () => {
    expect(timepiece(0)).toBe("0:00:00")
  })

  it('formats time in minutes and seconds', () => {
    expect(timepiece(1000)).toBe("0:00:01")
    expect(timepiece(60000)).toBe("0:01:00")
    expect(timepiece(3600000)).toBe("1:00:00")
  })
})
