/* eslint-disable import/prefer-default-export */

// Currency API
// https://github.com/fawazahmed0/currency-api?tab=readme-ov-file#readme
//
// Endpoint example
// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json
export const CURRENCY_API = {
  host: 'https://cdn.jsdelivr.net/',
  endpoints: {
    list: 'gh/fawazahmed0/currency-api@1/latest/currencies.min.json',
    exchange: (currency: string) =>
      `gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.min.json`,
  },
} as const

export const DEFAULT_LOCALE = 'en-US'
