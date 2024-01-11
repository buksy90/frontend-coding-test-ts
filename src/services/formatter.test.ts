import { describe, it, expect } from 'vitest'
import { formatCurrency } from './formatter'

describe('Formatter', () => {
  describe('sanitizeNumberInput', () => {
    it('eur', () => expect(formatCurrency(10.5, 'eur')).to.equal('€10.50'))
    it('usd', () => expect(formatCurrency(10.5, 'usd')).to.equal('$10.50'))
    it('unknown', () =>
      expect(formatCurrency(10.5, 'unknown')).to.equal('unknown 10.5'))
  })
})
