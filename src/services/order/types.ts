import { AxiosResponse } from 'axios'

export type OrderStatuses =
  'pending' |
  'canceled' |
  'finished' |
  'blocked'

export type OrderPaymentMethods = 'billet' | 'pix'

export type PostAOrder = {
  type: 'buy' | 'sell'
  payment_method: OrderPaymentMethods
  crypto: string
  wallet: string
  extras: string
  value: number
}

export type PostAOrderData = PostAOrder & {
  id: number
  created_at: string
  updated_at: string
  shareable_code: string
  status: OrderStatuses
}

export type ResponsePostAOrder = Promise<AxiosResponse<PostAOrderData>>
