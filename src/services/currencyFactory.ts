/* eslint-disable import/prefer-default-export */
import CurrencyService from './currencyService'

let instance: CurrencyService | undefined

export function useCurrencyService(): CurrencyService {
  if (!instance) {
    instance = new CurrencyService()
  }

  return instance
}
