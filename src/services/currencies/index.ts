import { AxiosResponse } from 'axios'
import { fetch } from '../'

type Currency = 'bitcoin'

export function getCurrency(currency: Currency): Promise<AxiosResponse> {
  return fetch({
    path: `/cryptos/${currency}`,
  })
}
