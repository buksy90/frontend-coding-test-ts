import { vi, describe, it, expect, beforeAll } from 'vitest'
import { AxiosResponse } from 'axios'
import RestClient from './restClient'
import CurrencyService from './currencyService'

describe('CurrencyService', () => {
  const mockedCurrencies = {
    eur: 'Euro',
    usd: 'US Dollar',
  }
  const mockedEur = {
    date: '2020-01-01',
    eur: {
      usd: 2,
    },
  }

  beforeAll(() => {
    vi.spyOn(RestClient.prototype, 'get').mockImplementation((path) => {
      const response: AxiosResponse = {
        data: path.includes('eur') ? mockedEur : mockedCurrencies,
        status: 200,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: {} as any,
        headers: {},
        statusText: 'ok',
      }
      return Promise.resolve(response)
    })
  })

  describe('sanitizeNumberInput', () => {
    const instance = new CurrencyService()

    it('load list of currencies', async () => {
      expect(instance.getCurrencyName('eur')).to.equal(undefined)
      await instance.loadCurrencies()
      expect(instance.getCurrencyName('eur')).to.equal('Euro')
    })

    it('hasRate returns false when currencies not loaded', () => {
      expect(instance.hasRate('eur')).to.equal(false)
    })

    it('convert throws when currency not loaded', () => {
      expect(() => instance.convert(1, 'eur', 'usd')).to.throw()
    })

    it('convert works when currency is loaded', async () => {
      await instance.loadCurrencyExchange('eur')
      expect(instance.convert(1, 'eur', 'usd')).to.equal(2)
    })

    it('convert formats result', async () => {
      await instance.loadCurrencyExchange('eur')
      expect(instance.convert(1.234567, 'eur', 'usd')).to.equal(2.469)
    })

    it('hasRate returns true when currencies loaded', () => {
      expect(instance.hasRate('eur')).to.equal(true)
    })

    it('deconvert works when currency is loaded', async () => {
      await instance.loadCurrencyExchange('eur')
      expect(instance.deconvert(1, 'eur', 'usd')).to.equal(0.5)
    })
  })
})
