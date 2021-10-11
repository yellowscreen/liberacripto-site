import { acceptHMRUpdate, defineStore } from 'pinia'
import { getXCurrency } from '@/services/currencies'

type CryptoData = {
  id: string
  name: string
  symbol: string
  toUSD: number
  toBRL: number
}

export const useCryptosStore = defineStore('user', {
  state: () => ({
    availables: [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
      },
      {
        id: 'axie-infinity',
        symbol: 'axs',
        name: 'Axie Infinity',
      },

      {
        id: 'tether',
        symbol: 'usdt',
        name: 'Tether',
      },

      { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
    ],

    cryptos: {} as Record<string, CryptoData>,
  }),

  actions: {
    storeCrypto(crypto: string) {
      getXCurrency(crypto).then(({ data }) => {
        this.$state.cryptos = {
          ...this.$state.cryptos,
          [data.id]: {
            id: data.id,
            name: data.name,
            symbol: data.symbol,
            toUSD: data.market_data.current_price.usd,
            toBRL: data.market_data.current_price.brl,
          },
        }
      })
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptosStore, import.meta.hot))
