import { acceptHMRUpdate, defineStore } from 'pinia'
import { Router } from 'vue-router'

import { getBanks, getNetworks, postAOrder, postPayABillOrder, postSellOrderPix } from '@services/order/index'
import { useUIStore } from './ui'

import { STEP_TO_BUY, PaymentMethod } from '@/@types/payments'
import { convertCurrencyToRAWNumber } from '@/composables/useFormat'

import { showSnackbar } from '@/composables/useSnackbar'

import type { BuyOrder, Summary } from '@/@types/payments'
import type { PaymentOrder, SellOrder } from '@/services/order/types'

type StepToBuyKeys = keyof typeof STEP_TO_BUY

type NetWork = {
  id: number
  name: string
  symbol: string
}

type Bank = {
  id: number
  code: string
  name: string
}

type State = {
  step: StepToBuyKeys
  buy: BuyOrder
  sell: Partial<SellOrder>
  pay: Partial<PaymentOrder>
  networks?: NetWork[]
  banks: Bank[]
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
      network: undefined,
      extras: undefined,
    },

    sell: {},

    pay: {},

    networks: [],
    banks: [],

    summary: {},

  }),

  actions: {
    storeNetworks() {
      getNetworks().then(({ data }) => {
        this.networks = data
      })
    },

    storeBanks() {
      getBanks().then(({ data }) => {
        this.banks = data
      })
    },

    storeBuyOrder(order: State['buy']) {
      Object.keys(order).forEach((key) => {
        const keyHack = key as keyof State['buy']

        if (keyHack === 'method')
          this.buy[keyHack] = order[keyHack]
        else
          this.buy[keyHack] = order[keyHack]!
      })
    },

    storeSellOrder(order: State['sell']) {
      Object.keys(order).forEach((key) => {
        const keyHack = key as keyof State['sell']

        // @ts-ignore
        this.sell[keyHack] = order[keyHack]
      })
    },

    storePaymentOrder(order: State['pay']) {
      this.pay = order
    },

    async fetchStoreBuyOrder() {
      const ui = useUIStore()

      try {
        ui.toggleLoader(true)

        const { data } = await postAOrder({
          type: 'buy',
          crypto: this.buy.crypto,
          client_email: this.buy.email || undefined,
          extras: this.buy.extras || undefined,
          wallet: this.buy.wallet || undefined,
          network: this.buy?.network || undefined,
          // @ts-ignore
          payment_method: PaymentMethod[this.buy.method],
          value: convertCurrencyToRAWNumber(this.buy.value),
        })

        showSnackbar({ title: 'Ordem feita com sucesso!', type: 'success' })

        this.summary = data
        this.setCurrentStep('CHECK_PAY')
      }
      catch (error) {
        console.error('[Error on post order] ', error)
      }
      finally {
        ui.toggleLoader(false)
      }
    },

    async fetchStoreSellOrder() {
      const ui = useUIStore()

      try {
        ui.toggleLoader(true)
        let paymentOption: any

        if (this.sell.payment_method === 'transfer') {
          const bankCode = String(this.sell.bank_account?.bank).replace(/\D/gi, '')
          const bankId = this.banks.find(bank => bank.code === bankCode)?.id ?? 0

          paymentOption = {
            bank_account: {
              ...this.sell.bank_account,
              bank: bankId,
            },
          }
        }
        else {
          paymentOption = {
            client_pix: this.sell.client_pix || undefined,

          }
        }
        const { data } = await postSellOrderPix({
          type: 'sell',
          crypto: this.sell.crypto,
          extras: this.sell.extras || undefined,
          payment_method: this.sell.payment_method,
          ...paymentOption,
          // @ts-ignore
          value: convertCurrencyToRAWNumber(this.sell?.value || 0),
        })

        showSnackbar({ title: 'Ordem feita com sucesso!', type: 'success' })

        this.summary = data
        this.setCurrentStep('CHECK_PAY')
      }
      catch (error) {
        console.error('[Error on post order] ', error)
      }
      finally {
        ui.toggleLoader(false)
      }
    },
    async fetchStorePaymentOrder() {
      const ui = useUIStore()

      try {
        ui.toggleLoader(true)

        const { data } = await postPayABillOrder({
          type: 'payment',
          crypto: this.pay.crypto,
          extras: this.pay.extras || undefined,
          client_email: this.pay?.email || undefined,
          payment_method: this.pay.payment_method,
          billet: this.pay.billet,
          // @ts-ignore
          value: convertCurrencyToRAWNumber(this.pay?.value || 0),
        })

        showSnackbar({ title: 'Ordem feita com sucesso!', type: 'success' })

        this.summary = data
        this.setCurrentStep('CHECK_PAY')
      }
      catch (error) {
        console.error('[Error on post order] ', error)
      }
      finally {
        ui.toggleLoader(false)
      }
    },

    goBackStep(router: Router, methodNameRoute = 'BuyMethod') {
      const stepNumber = STEP_TO_BUY[this.step]

      if (stepNumber - 1 <= 0)
        router.push({ name: methodNameRoute })

      else
        this.step = STEP_TO_BUY[stepNumber - 1] as StepToBuyKeys
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
