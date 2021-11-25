export function convertCurrencyToRAWNumber(currency: string): number {
  return Number(currency.replace(/([^,\d]*)/g, '').replace(/,/, '.'))
}

export function convertNumberToCurrency(number: number): string {
  return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(number) ?? 'R$ 0,00'
}
