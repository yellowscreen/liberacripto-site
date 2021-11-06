import { acceptHMRUpdate, defineStore } from 'pinia'

import { postAOrder } from '@services/order/index'
import { Router } from 'vue-router'
import { useUIStore } from './ui'
import { STEP_TO_BUY, PaymentMethod } from '@/@types/payments'
import { convertCurrencyToRAWNumber } from '@/composables/useFormat'

import type { BuyOrder, Summary } from '@/@types/payments'

type StepToBuyKeys = keyof typeof STEP_TO_BUY

type State = {
  step: StepToBuyKeys
  buy: BuyOrder
  summary?: Partial<Summary>

}

export const useOrderStore = defineStore('order', {
  state: (): State => ({
    step: 'CHOOSE_METHOD',

    buy: {
      crypto: '',
      value: '',
      method: 'boleto',
      email: undefined,
      wallet: undefined,
      blockchain: undefined,
      extras: undefined,
    },

    summary: {
      // id: 18,
      // value: 5544,
      // type: 'buy',
      // crypto: 'btc',
      // status: 'pending',
      // payment_method: 'billet',
      // extras: 'synthesize array',
      // shareable_code: '3-T76008',
      // wallet: '1dmT3s12Ky9nnJEJqJffeLy7WzJpe2NX',
      // payable: 'https://sandbox.asaas.com/b/pdf/7037412952907212',

    },

  }),

  actions: {
    storeOrder(order: State['buy']) {
      Object.keys(order).forEach((key) => {
        const keyHack = key as keyof State['buy']

        if (keyHack === 'method')
          this.$state.buy[keyHack] = order[keyHack]
        else
          this.$state.buy[keyHack] = order[keyHack]!
      })
    },

    async fetchStoreOrder() {
      const ui = useUIStore()

      try {
        ui.toggleLoader(true)

        const { data } = await postAOrder({
          type: 'buy',
          crypto: this.$state.buy.crypto,
          email: this.$state.buy.email || undefined,
          extras: this.$state.buy.extras || undefined,
          wallet: this.$state.buy.wallet || undefined,
          payment_method: PaymentMethod[this.$state.buy.method],
          value: convertCurrencyToRAWNumber(this.$state.buy.value),
        })

        this.$state.summary = data
        this.setCurrentStep('CHECK_PAY')
      }
      catch (error) {
        console.error('[Error on post order] ', error)
      }
      finally {
        ui.toggleLoader(false)
      }
    },

    goBackStep(router: Router) {
      const stepNumber = STEP_TO_BUY[this.$state.step]

      if (stepNumber - 1 <= 0)
        router.push({ name: 'BuyMethod' })

      else
        this.$state.step = STEP_TO_BUY[stepNumber - 1] as StepToBuyKeys
    },

    setReceipt(receipt?: State['summary']) {
      this.summary = receipt
    },

    setCurrentStep(currentStep: StepToBuyKeys) {
      this.step = currentStep
    },
  },

  getters: {
    currentStepPosition: state => STEP_TO_BUY[state.step],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot))
