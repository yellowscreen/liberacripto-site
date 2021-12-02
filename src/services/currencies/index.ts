import type { AxiosResponse } from 'axios'

import { fetch } from '../'

export function getCurrency(currency = 'bitcoin', value: number): Promise<AxiosResponse<{ current_price: number }>> {
  return fetch({
    path: `/cryptos/${String(currency).toLocaleLowerCase()}`,
    params: {
      value,
    },
  })
}

export function getCryptosAvailable(): Promise<AxiosResponse<{ id: number; name: string; symbol: string }>> {
  return fetch({
    path: '/user/cryptos',
  })
}
