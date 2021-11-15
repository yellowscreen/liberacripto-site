import { acceptHMRUpdate, defineStore } from 'pinia'
import { getCurrency } from '@/services/currencies'

import type { ErrorData } from '@/services'

type CryptoData = {
  id?: string
  name?: string
  symbol?: string
  toBRL?: number
}

export const useCryptosStore = defineStore('cryptos', {
  state: () => ({
    available: [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
      },

    ],

    cryptos: {} as Record<string, CryptoData>,
  }),

  actions: {
    storeCrypto(crypto: string) {
      getCurrency(crypto)
        .then(({ data }) => {
          this.$state.cryptos = {
            ...this.$state.cryptos,
            [crypto]: data.current_price,
          }
        })
        .catch((error: ErrorData) => {
          console.error(error.response.message)
        })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptosStore, import.meta.hot))
