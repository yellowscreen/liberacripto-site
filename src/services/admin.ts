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

export function getAuth(): Promise<AxiosResponse> {
  return fetch({
    path: '/admin/auth/google/redirect',
  })
}

export function signn(): Promise<AxiosResponse> {
  return fetch({
    baseURL: 'https://liberacripto-dev.herokuapp.com/admin/auth/google/callback?state=1RfmcHRRPaZkNG-zc_cvyI715QkJs-VR&code=4%2F0AX4XfWjI0PDbEenTTfuYgEsULNpQbJv0sCw614I6QH30dPnSM4PmKVmdl2ti_CoLy2MmBQ&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=none#',
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

export function postAddACrypto(crypto: Omit<Crypto, 'id'>): Promise<AxiosResponse<Crypto>> {
  return fetch({
    method: 'POST',
    path: '/admin/config/cryptos',
    data: crypto,
  })
}

export function getCryptoTaxes(id: string) {
  return fetch({
    path: `/admin/config/cryptos/${id}/taxes`,
  })
}

export function updateCryptoTaxes(method: 'PUT' | 'POST', id: string, data: { percentage: number; from: number; to: number }) {
  return fetch({
    method: method ?? 'POST',
    path: `/admin/config/cryptos/${id}/taxes/${method === 'PUT' ? '1' : ''}`,
    data: {
      ...data,
      type: 'sell',
    },
  })
}

export function getNetworkList(): ResponseGetCryptoList {
  return fetch({
    path: '/admin/config/networks',
  })
}

export function postAddANetwork(network: Omit<Crypto, 'id'>): Promise<AxiosResponse<Crypto>> {
  return fetch({
    method: 'POST',
    path: '/admin/config/networks',
    data: network,
  })
}

export function getNetworkTaxes(id: string) {
  return fetch({
    path: `/admin/config/networks/${id}/taxes`,
  })
}

export function updateNetworkTaxes(method: 'PUT' | 'POST', id: string, data: { percentage: number; from: number; to: number }) {
  return fetch({
    method: method ?? 'POST',
    path: `/admin/config/networks/${id}/taxes/${method === 'PUT' ? '1' : ''}`,
    data: {
      ...data,
      type: 'sell',
    },
  })
}
