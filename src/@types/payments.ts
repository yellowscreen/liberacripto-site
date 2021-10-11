export type Crypto = 'Bitcoin' | 'Ethereum' | 'AXS' | 'USD'

export type UserData = {
  crypto: Crypto
  value: string
  wallet: string
  email?: string
  infos?: string
  willReceive?: string
}

export type Pix = UserData
export type Boleto = UserData

export type StableCoin = UserData & {
  blockchain: 'BEP' | 'BEP20' | 'ERC20'
}
