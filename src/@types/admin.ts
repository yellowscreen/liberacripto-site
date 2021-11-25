import type { Status } from './payments'

export type Order = {
  id: string
  type: 'sell' | 'buy' | 'payment'
  payment_method: 'pix' | 'billet' | 'transfer' | 'usd'
  crypto: string
  value: number
  crypto_value: number
  wallet?: string
  extras: string
  status: Status
  shareable_code: string
  payable: string
  receipt_url?: string
  client_pix?: string
  network?: string
  created_at: string
  updated_at: string
  client_email?: string
  billet?: string
}

export type Crypto = {
  id: string
  name: string
  code: string
  api_id: string
  wallet: string
}
