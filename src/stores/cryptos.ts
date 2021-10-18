import { acceptHMRUpdate, defineStore } from 'pinia'
import { getCurrency } from '@/services/currencies'

import type { ErrorData } from '@/services'

type CryptoData = {
  id?: string
  name?: string
  symbol?: string
  toUSD?: number
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
      // {
      //   id: 'axie-infinity',
      //   symbol: 'axs',
      //   name: 'Axie Infinity',
      // },

      // {
      //   id: 'tether',
      //   symbol: 'usdt',
      //   name: 'Tether',
      // },

      // { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
    ],

    cryptos: {} as Record<string, CryptoData>,
  }),

  actions: {
    storeCrypto(crypto: string) {
      getCurrency(crypto)
        .then(({ data }) => {
          const id = 'bitcoin'

          this.$state.cryptos = {
            ...this.$state.cryptos,
            [id]: {
              toBRL: data.current_price,
              // id: data.id,
              // name: data.name,
              // symbol: data.symbol,
              // toUSD: data.market_data.current_price.usd,
              // toBRL: data.market_data.current_price.brl,
            },
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
