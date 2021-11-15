import { acceptHMRUpdate, defineStore } from 'pinia'
import { getCryptosAvailable, getCurrency } from '@/services/currencies'

import type { ErrorData } from '@/services'

type CryptoData = {
  id?: string
  name?: string
  // symbol?: string
  toBRL?: number
  code: string
}

export const useCryptosStore = defineStore('cryptos', {
  state: () => ({
    available: [
      {
        id: 'bitcoin',
        // symbol: 'btc',
        name: 'Bitcoin',
        code: 'btc',
      },

    ],

    cryptos: {} as Record<string, CryptoData>,
  }),

  actions: {
    storeCrypto(crypto: string) {
      getCurrency(crypto)
        .then(({ data }) => {
          this.cryptos = {
            ...this.cryptos,
            [crypto]: data.current_price,
          }
        })
        .catch((error: ErrorData) => {
          console.error(error.response.message)
        })
    },

    storeCryptosAvailable() {
      getCryptosAvailable().then(({ data }) => {
        this.available = data
      })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptosStore, import.meta.hot))
