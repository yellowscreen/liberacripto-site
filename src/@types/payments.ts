
export enum PaymentMethod {
  boleto = 'billet',
  pix = 'pix'
}

export type BuyOrder = {
  crypto: string
  email?: string
  value: string
  wallet?: string
  method: keyof typeof PaymentMethod
  blockchain?: string
  extras?: string
}

export type Summary = {
  type: string
  payment_method: string
  crypto: string
  value: number
  wallet: string
  extras: string
  shareable_code: string
  status: string
  id: number
  payable: string
}

export enum STEP_TO_BUY {
  CHOOSE_METHOD,
  PAYMENT,
  SUMMARY,
  CHECK_PAY
}
