import { CURRENCY_API } from '../constants'
import RestClient from './restClient'

type CurrencyKey = string // 'eur' | 'usd'

export type DTOCurrencyList = Record<string, string>

export type DTOCurrencyExchange = {
  [key: string]: {
    [key in CurrencyKey]: number
  }
} & { date: string }

const client = new RestClient(CURRENCY_API.host)

export async function getCurrenciesList(): Promise<DTOCurrencyList> {
  try {
    const response = await client.get<DTOCurrencyList>(
      CURRENCY_API.endpoints.list,
    )

    if (response.status === RestClient.RESPONSE_OK) {
      return typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data
    }
  } catch (e) {
    console.error(e)
  }

  throw new Error('Error loading currencies list')
}

export async function getCurrencyEchange(
  currency: CurrencyKey,
): Promise<DTOCurrencyExchange> {
  try {
    const response = await client.get<DTOCurrencyExchange>(
      CURRENCY_API.endpoints.exchange(currency.toLowerCase()),
    )

    if (response.status === RestClient.RESPONSE_OK) {
      return typeof response.data === 'string'
        ? JSON.parse(response.data)
        : response.data
    }
  } catch (e) {
    console.error(e)
  }

  throw new Error(`Error loading exchange rates for ${currency}`)
}
