import { AxiosResponse } from 'axios'
import { fetch } from '../'

type Currency = 'bitcoin'

export function getCurrency(currency: Currency): Promise<AxiosResponse> {
  return fetch({
    path: `/cryptos/${currency}`,
  })
}

export function getXCurrency(currency = 'bitcoin'): Promise<AxiosResponse> {
  return fetch({
    baseURL: `https://api.coingecko.com/api/v3/coins/${currency}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`,
  })
}
