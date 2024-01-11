import { describe, it, expect } from 'vitest'
import { sanitizeNumberInput } from './helpers'

describe('Helpers', () => {
  describe('sanitizeNumberInput', () => {
    it('number', () => expect(sanitizeNumberInput(10.5)).to.equal(10.5))
    it('string', () => expect(sanitizeNumberInput('10.5')).to.equal(10.5))
    it('null', () => expect(sanitizeNumberInput(null)).to.equal(0))
    it('object', () => expect(sanitizeNumberInput({})).to.equal(0))
  })
})
