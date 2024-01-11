import {
  getCurrenciesList,
  getCurrencyEchange,
  DTOCurrencyExchange,
} from './currencyApi'

export default class CurrencyService {
  private readonly currencies = new Map<string, string>()

  private readonly exchanges = new Map<string, Record<string, number>>()

  public async loadCurrencies() {
    if (this.currencies.size === 0) {
      const list = await getCurrenciesList()
      Object.keys(list).forEach((key) => {
        this.currencies.set(key, list[key])
      })
    }
  }

  public getCurrencies() {
    return this.currencies
  }

  public async loadCurrencyExchange(base: string) {
    if (!this.hasRate(base)) {
      const rates = await getCurrencyEchange(base)
      this.addRate(base, rates)
    }
  }

  public convert(input: number, base: string, target: string): number {
    const rate = this.getRate(base, target)

    return CurrencyService.format(input * rate)
  }

  public deconvert(input: number, base: string, target: string): number {
    const rate = this.getRate(base, target)

    return CurrencyService.format(input / rate)
  }

  public hasRate(base: string): boolean {
    const baseNormalized = base.toLowerCase()
    return this.exchanges.has(baseNormalized)
  }

  public getCurrencyName(base: string) {
    const baseNormalized = base.toLowerCase()
    return this.currencies.get(baseNormalized)
  }

  private addRate(base: string, rates: DTOCurrencyExchange): void {
    const baseNormalized = base.toLowerCase()
    this.exchanges.set(baseNormalized, rates[baseNormalized])
  }

  private getRate(base: string, target: string): number {
    const baseNormalized = base.toLowerCase()
    const targetNormalized = target.toLowerCase()

    if (this.exchanges.has(baseNormalized)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const baseExchanges = this.exchanges.get(baseNormalized)!
      if (typeof baseExchanges[targetNormalized] === 'number') {
        return baseExchanges[targetNormalized]
      }
    }

    throw new Error(
      `Exchange rate for ${baseNormalized} into ${targetNormalized} is missing`,
    )
  }

  private static format(input: number): number {
    return Number(input.toFixed(3))
  }
}
