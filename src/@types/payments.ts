
export enum PaymentMethod {
  boleto = 'billet',
  pix = 'pix',
  dolar = 'usd'
}

export type Status =
  'pending' |
  'canceled' |
  'finished' |
  'blocked'

export type BuyOrder = {
  crypto: string
  email?: string
  value: string
  wallet?: string
  method: keyof typeof PaymentMethod
  network?: string
  extras?: string
}

export type Summary = {
  type: string
  payment_method: string
  id: number
  status: Status

  crypto: string

  wallet: string
  network?: string
  crypto_value?: number

  value: number
  extras: string
  shareable_code: string
  payable: string

  client_email?: string
  client_pix?: string
  receipt_url?: string

  created_at: string
  updated_at: string
}

export enum STEP_TO_BUY {
  CHOOSE_METHOD,
  PAYMENT,
  SUMMARY,
  CHECK_PAY
}
