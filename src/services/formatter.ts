/* eslint-disable import/prefer-default-export */
import { DEFAULT_LOCALE } from '../constants'

export function formatCurrency(input: number, currency: string): string {
  try {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
      style: 'currency',
      currency,
    }).format(input)
  } catch {
    return `${currency} ${input}`
  }
}
