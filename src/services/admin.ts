import type { AxiosResponse } from 'axios'

import { fetch } from '@services/index'
import { Crypto, Order } from '@/@types/admin'
import { Status } from '@/@types/payments'

export type GetOrderListParameters = {
  page: number
  limit?: number
  method: Order['payment_method']
  type: Order['type']
  search?: string
}

export function getAuth(): Promise<AxiosResponse<{ current_price: number }>> {
  return fetch({
    path: '/admin/auth/google/redirect',
  })
}

export type ResponseGetOrderList = Promise<AxiosResponse<{
  meta: {
    total: number
    current_page: number
  }
  data: Order[]
}>>
export function getOrdersList({ ...search }: GetOrderListParameters): ResponseGetOrderList {
  return fetch({
    path: '/admin/orders',
    params: search,
  })
}

export type ResponseGetCryptoList = Promise<AxiosResponse<Crypto[]>>
export function getCryptoList(): ResponseGetCryptoList {
  return fetch({
    path: '/admin/config/cryptos',
  })
}

export function putOrderStatus(id: number | string, status: Status): Promise<AxiosResponse> {
  return fetch({
    method: 'PUT',
    path: `/admin/orders/${id}/update-status`,
    data: {
      status,
    },
  })
}
