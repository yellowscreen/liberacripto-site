export function convertCurrencyToRAWNumber(currency: string): number {
  return Number(currency.replace(/([^,\d]*)/g, '').replace(/,/, '.'))
}
