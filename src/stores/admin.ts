import { acceptHMRUpdate, defineStore } from 'pinia'

import type { RemoveableRef } from '@vueuse/core'
import { useUIStore } from './ui'
import type { Order, Crypto } from '@/@types/admin'
import { getCryptoList, GetOrderListParameters, getOrdersList } from '@/services/admin'

type State = {
  token: string | RemoveableRef<string>
  listOrders: Order[]
  listCryptos: Crypto[]
  filtersUI: {
    type: Order['type']
    method: Order['payment_method']
  }
}

type DictionaryGetter = {
  type: 'type' | 'plural-type' | 'method' | 'status'
  text: string
}

export const useAdminStore = defineStore('admin', {
  state: (): State => ({
    token: useStorage<string>('token', ''),
    filtersUI: {
      method: 'pix',
      type: 'buy',
    },

    listOrders: [],
    listCryptos: [],
  }),

  actions: {
    async fetchCryptoList() {
      const ui = useUIStore()
      try {
        ui.toggleLoader(true)

        const { data } = await getCryptoList()
        this.listCryptos = data
      }
      catch (er) { }
      finally {
        ui.toggleLoader(false)
      }
    },

    getOrdersHistory({ page = 1, limit = 10, ...search }: Partial<GetOrderListParameters>) {
      const ui = useUIStore()
      ui.toggleLoader(true)

      this.filtersUI.type = search?.type ?? this.filtersUI.type
      this.filtersUI.method = search?.method ?? this.filtersUI.method

      getOrdersList({
        ...search,
        page,
        limit,
        method: this.filtersUI.method,
        type: this.filtersUI.type,
      }).then(({ data }) => {
        this.listOrders = data.data
      }).finally(() => {
        ui.toggleLoader(false)
      })
    },

  },

  getters: {
    isAuth: state => !!state.token,

    dictionary: () => (translate: DictionaryGetter): string => {
      if (translate.type === 'plural-type') {
        const dic = {
          sell: 'Vendas',
          buy: 'Compras',
          payment: 'Pagamentos',
        }

        return dic?.[translate?.text] ?? translate.text
      }
      else if (translate.type === 'type') {
        const dic = {
          sell: 'Venda',
          buy: 'Compra',
          payment: 'Pagamento',
        }

        return dic?.[translate?.text] ?? translate.text
      }
      else if (translate.type === 'method') {
        const dic = {
          billet: 'Boleto',
          usd: 'Dólar',
          pix: 'Pix',
          transfer: 'Transferência',
        }

        return dic?.[translate?.text] ?? translate.text
      }
      else if (translate.type === 'status') {
        const dic = {
          finished: 'Aprovada',
          pending: 'Em aguardo',
          blocked: 'Bloqueada',
          canceled: 'Cancelada',
        }

        return dic?.[translate?.text] ?? translate.text
      }
      return translate.text
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
