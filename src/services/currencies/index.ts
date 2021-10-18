import type { AxiosResponse } from 'axios'

import { fetch } from '../'

export function getCurrency(currency = 'bitcoin'): Promise<AxiosResponse<{ current_price: number }>> {
  return fetch({
    path: `/cryptos/${currency}`,
  })
}
