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

export type ReponseS3Fields = Promise<AxiosResponse<{
  'url': string
  'fields': S3Fields
}>>
