import { AxiosResponse } from 'axios'
import { Summary } from '@/@types/payments'

export type OrderStatuses =
  'pending' |
  'canceled' |
  'finished' |
  'blocked'

export type OrderPaymentMethods = 'billet' | 'pix'

export type PostAOrder = {
  type: 'buy' | 'sell'
  crypto: string
  wallet: string
  extras: string
  value: number
  network?: string
  client_email?: string
  payment_method: OrderPaymentMethods
}

export type ResponsePostAOrder = Promise<AxiosResponse<Summary>>

export type S3Fields = {
  'acl': string
  'bucket': string
  'Content-Type': string
  'X-Amz-Algorithm': string
  'X-Amz-Credential': string
  'X-Amz-Date': string
  'key': string
  'Policy': string
  'X-Amz-Signature': string
}

export type ResponseS3Fields = Promise<AxiosResponse<{
  'url': string
  'fields': S3Fields
}>>

export type SellOrderPix = {
  type: 'sell'
  payment_method: 'pix'
  crypto: string
  value: number
  client_pix: string
  extras?: string
}

export type ResponseSellOrderPix = Promise<AxiosResponse<{
  type: string
  payment_method: string
  crypto: string
  value: number
  crypto_value: number
  extras: string
  client_pix: string
  shareable_code: string
  status: OrderStatuses
  created_at: string
  updated_at: string
  id: number
  payable?: string
}
>>
